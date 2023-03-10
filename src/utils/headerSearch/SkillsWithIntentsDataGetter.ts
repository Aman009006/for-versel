import { Router } from "vue-router";
import SkillsWithIntents, { AnswerData } from "./SkillsWithIntents";

export default interface SkillsWithIntentsDataGetter {
    getTexts(router: Router, skillsWithIntents: SkillsWithIntents): AnswerData;
    getIntent(router: Router, skillsWithIntents: SkillsWithIntents): string;
}