import { defaultEntity } from '@/constants';

export default class TestData {
    static intent = "testIntent";

    static defaultEntity = {
        entityName: defaultEntity.entityName,
        normalizedEntityValue: ""
    }

    static customEntity = {
        entityName: "entity",
        normalizedEntityValue: "normalizedValue"
    }
}
