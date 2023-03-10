export default interface SkillsWithIntents {
    intent: string;
    intentName: string;
    path: string;
    texts: AnswerData[];
    title: string[]
}

interface AnswerData {
    buttons: Button[];
    text: string;
}

interface Button {
    answer_config: string;
    identificator: string;
    title: string;
    type: string;
    value: string;
}