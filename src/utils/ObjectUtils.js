
export default class ObjectUtils {
    static createCopyOfSerializableObject(object) {
        return JSON.parse(JSON.stringify(object));
    }
}
