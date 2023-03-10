import { encodePathComponent } from '@/store/modules/permission'

/**
 * @typedef { import('./SkillsWithIntentsDataGetter').default } SkillsWithIntentsDataGetter
 * @implements {SkillsWithIntentsDataGetter}
 */
export default class SkillsWithIntentsDataGetterImpl {
    /**
     * @param {import('vue-router').Router} router
     * @param {import('./SkillsWithIntents').SkillsWithIntents} skillsWithIntents
     * @returns {import('./SkillsWithIntents').AnswerData}
     */
    getTexts(router, skillsWithIntents) {
        const intentData = this.getIntentData(router, skillsWithIntents);
        return intentData?.texts;
    }

    /**
     * @param {import('vue-router').Router} router
     * @param {import('./SkillsWithIntents').SkillsWithIntents} skillsWithIntents
     * @returns {string}
     */
    getIntent(router, skillsWithIntents) {
        const intentData = this.getIntentData(router, skillsWithIntents);
        return intentData?.intent;
    }

    /**
     * @private
     * @param {import('vue-router').Router} router
     * @returns {import('./Intent').Intent}
     */
    getIntentData(router, skillsWithIntents) {
        const intentsFromSkills = skillsWithIntents.map((data) => data.Intents);
        const allIntents = intentsFromSkills.flat();
        const intent = allIntents.find(
            intentElement =>
                encodeURIComponent(encodePathComponent(intentElement.name)) === router.path &&
                router.children == null
        )
        return intent;
    }
}