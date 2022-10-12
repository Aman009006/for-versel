import { readFileSync } from 'fs';
import StringHelper from './StringHelper';

export default class FileHelper {
    static getRawContent(filePath) {
        return readFileSync(filePath, 'utf8');
    }

    static getEscapedRawContent(filePath) {
        const rawContent = this.getRawContent(filePath);
        const escapedContent = StringHelper.escapeString(rawContent);
        return escapedContent;
    }
}
