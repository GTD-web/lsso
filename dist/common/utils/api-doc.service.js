"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ApiDocService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiDocService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const axios_1 = require("axios");
const path_1 = require("path");
let ApiDocService = ApiDocService_1 = class ApiDocService {
    constructor() {
        this.logger = new common_1.Logger(ApiDocService_1.name);
        this.MAX_RETRIES = 3;
        this.RETRY_DELAY = 5000;
        this.dirPath = 'C:/Users/USER/Desktop/projects/sso-documents/docs/개발/03_api';
        if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development') {
            this.generateApiDocs();
        }
    }
    async getApiJson(retries = this.MAX_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, this.RETRY_DELAY));
        try {
            const response = await axios_1.default.get('http://localhost:3030/api-docs-json');
            this.data = response.data;
        }
        catch (error) {
            console.log(retries);
            if (retries > 0) {
                console.log('retries');
                this.getApiJson(retries - 1);
            }
        }
    }
    getControllers() {
        return Object.entries(this.data.paths)
            .map(([path, routes]) => {
            const controller = path.split('/')[2];
            const apis = Object.entries(routes).map(([method, metadata]) => {
                return {
                    method,
                    path,
                    metadata,
                };
            });
            return {
                controller,
                apis,
            };
        })
            .reduce((acc, curr) => {
            if (acc[curr.controller]) {
                acc[curr.controller].push(...curr.apis);
            }
            else {
                acc[curr.controller] = [...curr.apis];
            }
            return acc;
        }, {});
    }
    getSchemaType(schema) {
        if (schema.type === 'array') {
            const itemType = schema.items ? this.getSchemaType(schema.items) : 'any';
            return `${itemType}[]`;
        }
        return schema.type || 'object';
    }
    renderSchemaJson(schema, indentLevel = 1) {
        const indent = '  '.repeat(indentLevel);
        const commentIndent = '  '.repeat(Math.max(0, indentLevel - 1));
        let content = '';
        if (schema.type === 'object' && schema.properties) {
            content += '{\n';
            const properties = Object.entries(schema.properties);
            properties.forEach(([key, prop], index) => {
                const isLast = index === properties.length - 1;
                const required = (schema.required || []).includes(key);
                const comment = [];
                if (prop.description)
                    comment.push(prop.description);
                if (required && prop.type !== 'except')
                    comment.push('✅ Required');
                if (!required && prop.type !== 'except')
                    comment.push('❌ Optional');
                if (prop.type === 'object' && prop.properties) {
                    content += `${indent}"${key}": ${this.renderSchemaJson(prop, indentLevel + 1)}${isLast ? '' : ','}`;
                }
                else if (prop.type === 'array' && prop.items) {
                    content += `${indent}"${key}": [`;
                    if (prop.items.type === 'object' && prop.items.properties) {
                        content += '\n';
                        content += `${indent}  ${this.renderSchemaJson(prop.items, indentLevel + 2).trim()}`;
                        content += `\n${indent}]${isLast ? '' : ','}`;
                    }
                    else {
                        const example = this.getExampleValue(prop.items);
                        content += `${example}]${isLast ? '' : ','}`;
                    }
                }
                else {
                    const example = this.getExampleValue(prop);
                    content += `${indent}"${key}": ${example}${isLast ? '' : ','}`;
                }
                if (comment.length > 0) {
                    content += ` // ${comment.join(', ')}`;
                }
                content += '\n';
            });
            content += `${commentIndent}}`;
        }
        return content;
    }
    getExampleValue(prop) {
        if (prop.example !== undefined) {
            return typeof prop.example === 'string' ? `"${prop.example}"` : prop.example;
        }
        switch (prop.type) {
            case 'string':
                return prop.enum ? `"${prop.enum[0]}"` : '""';
            case 'number':
                return '0';
            case 'integer':
                return '0';
            case 'boolean':
                return 'false';
            case 'array':
                return '[]';
            default:
                return 'null';
        }
    }
    resolveSchema(schema, schemas, visited = new Set()) {
        if (!schema)
            return schema;
        if (schema.$ref) {
            const refPath = schema.$ref.split('/');
            const schemaName = refPath[refPath.length - 1];
            if (visited.has(schemaName)) {
                return { type: 'object', description: `Reference to ${schemaName}` };
            }
            visited.add(schemaName);
            return this.resolveSchema(schemas[schemaName], schemas, visited);
        }
        if (schema.allOf) {
            const resolvedSchemas = schema.allOf.map((s) => this.resolveSchema(s, schemas, visited));
            return resolvedSchemas.reduce((acc, curr) => {
                return {
                    ...acc,
                    ...curr,
                    properties: {
                        ...(acc.properties || {}),
                        ...(curr.properties || {}),
                    },
                    required: [...(acc.required || []), ...(curr.required || [])],
                };
            }, {});
        }
        if (schema.properties) {
            const resolvedProperties = {};
            Object.entries(schema.properties).forEach(([key, value]) => {
                resolvedProperties[key] = this.resolveSchema(value, schemas, new Set(visited));
            });
            return { ...schema, properties: resolvedProperties };
        }
        if (schema.items) {
            return {
                ...schema,
                items: this.resolveSchema(schema.items, schemas, visited),
            };
        }
        return schema;
    }
    async generateApiDocs() {
        await this.getApiJson();
        const controllers = this.getControllers();
        const schemas = this.data.components.schemas;
        Object.keys(controllers).forEach((controller, index) => {
            let markdownContent = `# ${controller[0].toUpperCase() + controller.slice(1)}\n\n`;
            const domain = controllers[controller];
            for (const api of domain) {
                const method = api.method.toUpperCase();
                const path = api.path;
                const metadata = api.metadata;
                markdownContent += `### ${metadata.summary || path}\n\n`;
                if (metadata.description) {
                    markdownContent += `${metadata.description}\n\n`;
                }
                markdownContent += `- **Method:** \`${method}\`\n`;
                markdownContent += `- **Endpoint:** \`${path}\`\n\n`;
                if (metadata.parameters && metadata.parameters.length > 0) {
                    const pathParams = metadata.parameters.filter((p) => p.in === 'path');
                    const queryParams = metadata.parameters.filter((p) => p.in === 'query');
                    if (pathParams.length > 0) {
                        markdownContent += `#### 🔵 Path Parameters\n\n`;
                        markdownContent += '```json\n';
                        markdownContent += '{\n';
                        pathParams.forEach((param, index) => {
                            const resolvedSchema = this.resolveSchema(param.schema, schemas);
                            const isLast = index === pathParams.length - 1;
                            const example = this.getExampleValue(resolvedSchema);
                            const required = param.required ? '✅ Required' : '❌ Optional';
                            markdownContent += `  "${param.name}": ${example} // ${required} ${param.description || ''}\n`;
                            markdownContent += `${isLast ? '' : ','}\n`;
                        });
                        markdownContent += '}\n';
                        markdownContent += '```\n\n';
                    }
                    if (queryParams.length > 0) {
                        markdownContent += `#### 🟣 Query Parameters\n\n`;
                        markdownContent += '```json\n';
                        markdownContent += '{\n';
                        queryParams.forEach((param, index) => {
                            const resolvedSchema = this.resolveSchema(param.schema, schemas);
                            const isLast = index === queryParams.length - 1;
                            const example = this.getExampleValue(resolvedSchema);
                            const required = param.required ? '✅ Required' : '❌ Optional';
                            markdownContent += `  "${param.name}": ${example} // ${required} ${param.description || ''}\n`;
                            markdownContent += `${isLast ? '' : ','}\n`;
                        });
                        markdownContent += '}\n';
                        markdownContent += '```\n\n';
                    }
                }
                if (metadata.requestBody) {
                    markdownContent += `#### 🟠 Request Body\n\n`;
                    const content = metadata.requestBody.content;
                    Object.keys(content).forEach((contentType) => {
                        markdownContent += `**Content Type:** \`${contentType}\`\n\n`;
                        const resolvedSchema = this.resolveSchema(content[contentType].schema, schemas);
                        markdownContent += '```json\n';
                        markdownContent += this.renderSchemaJson(resolvedSchema);
                        markdownContent += '\n```\n\n';
                    });
                }
                markdownContent += `#### Responses\n\n`;
                Object.entries(metadata.responses).forEach(([code, response]) => {
                    const titleEmoji = code.startsWith('2') ? '🟢' : '🔴';
                    markdownContent += `##### ${titleEmoji} ${code} - ${response.description}\n\n`;
                    if (response.content) {
                        Object.keys(response.content).forEach((contentType) => {
                            markdownContent += `**Content Type:** \`${contentType}\`\n\n`;
                            const resolvedSchema = this.resolveSchema(response.content[contentType].schema, schemas);
                            markdownContent += '```json\n';
                            markdownContent += this.renderSchemaJson(resolvedSchema);
                            markdownContent += '\n```\n\n';
                        });
                    }
                });
                markdownContent += `---\n\n`;
            }
            const docsPath = (0, path_1.join)(this.dirPath, `${index + 1 < 10 ? '0' : ''}${index + 1}_${controller}.md`);
            this.saveMarkdown(docsPath, markdownContent);
        });
    }
    async saveMarkdown(filePath, content) {
        await fs.promises.mkdir(this.dirPath, { recursive: true });
        fs.writeFileSync(filePath, content);
        this.logger.log(`API 문서가 생성되었습니다: ${filePath}`);
    }
};
exports.ApiDocService = ApiDocService;
exports.ApiDocService = ApiDocService = ApiDocService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ApiDocService);
//# sourceMappingURL=api-doc.service.js.map