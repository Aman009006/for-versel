import { encodePathComponent } from '@/store/modules/permission'
import IntentNameGenerator from '../intents/IntentNameGenerator';

/**
 * @typedef { import('./SkillsWithIntentsDataGetter').default } SkillsWithIntentsDataGetter
 * @implements {SkillsWithIntentsDataGetter}
 */
export default class SkillsWithIntentsDataGetterImpl {
    /**
     * @param {import('vue-router').RouteRecord} route
     * @param {import('./SkillsWithIntents').SkillsWithIntents} skillsWithIntents
     */
    constructor(route, skillsWithIntents) {
        this.route = route;
        this.skillsWithIntents = skillsWithIntents;
    }

    /**
     * @returns {import('./SkillsWithIntents').AnswerData}
     */
    getTexts() {
        const intentData = this.getIntentData();
        return intentData?.texts;
    }

    /**
     * @returns {string}
     */
    getTechnicalIntentName() {
        const intentData = this.getIntentData();
        if (intentData) {
            const intentNameGenerator = new IntentNameGenerator(intentData.intent, intentData.entity)
            return intentNameGenerator.getTechnicalIntentName();
        } else {
            return null;
        }
    }

    /**
     * @private
     * @returns {import('./Intent').Intent}
     */
    getIntentData() {
        const intentsFromSkills = this.skillsWithIntents.map((data) => data.Intents);
        const allIntents = intentsFromSkills.flat();
        const intent = allIntents.find(
            intentElement =>
                encodeURIComponent(encodePathComponent(intentElement.name)) === this.route.path &&
                // intent - routes don't have children
                this.route.children == null
        )
        return intent;
    }
}