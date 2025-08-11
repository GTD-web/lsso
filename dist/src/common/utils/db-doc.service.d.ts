export declare class DbDocService {
    private readonly metadata;
    private dirPath;
    constructor();
    generateDbDocumentation(): Promise<void>;
    private generateMarkdown;
    private generateErdSection;
    private generateEntityDetailsSection;
    private generateRelationsSection;
}
