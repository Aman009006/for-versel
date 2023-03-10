import { defaultEntity } from "@/constants";

export default class IntentNameGenerator {
    #separator = "/"

    constructor(intent, entity) {
        this.intent = intent;
        this.entity = entity
    }

    getTechnicalIntentName() {
        if (this.entity.entityName == defaultEntity.entityName) {
            return this.intent
        } else {
            return this.intent + this.#separator + this.entity.entityName + this.#separator + this.entity.normalizedEntityValue
        }
    }
}
