import { AnswerData } from "./SkillsWithIntents";

export default interface Intent {
    creationTimeStamp: Date;
    description: string;
    intent: string;
    entity: Entity;
    name: string;
    newIntent: boolean;
    texts: AnswerData[];
    utterances: string[];
}

interface Entity {
    entityName: string;
    normalizedEntityValue: string;
}