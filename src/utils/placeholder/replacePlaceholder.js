export default class ReplacePlaceholder {
    /*
    * @param {Array} answers
    * @param {Array} allPlaceholders
    */
    constructor(answers, allPlaceholders) {
        this.answers = answers;
        this.allPlaceholders = allPlaceholders;
    }

    /** @returns {Array}*/
    replaceInAnswers() {
        const replacedAnswers = this.answers;
        for (const answer of replacedAnswers) {
            for (const placeholder of this.allPlaceholders) {
                if (answer.text.includes(`##${placeholder.key}##`)) {
                    answer.text = answer.text.replace(`##${placeholder.key}##`, `${placeholder.value}`);
                }
            }
        }
        return replacedAnswers;
    }
}
