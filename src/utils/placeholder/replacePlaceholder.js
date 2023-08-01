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
    replaceMultipleAnswers() {
        const replacedAnswers = JSON.parse(JSON.stringify(this.answers));
        for (const answer of replacedAnswers) {
            for (const placeholder of this.allPlaceholders) {
                if (answer.text.includes(`##${placeholder.key}##`)) {
                    answer.text = answer.text.replace(`##${placeholder.key}##`, `${placeholder.value}`);
                }
            }
        }
        return replacedAnswers;
    }
    /** @returns {String}*/
    replaceSingleAnswer() {
        let replacedAnswer = this.answers;
        for (const placeholder of this.allPlaceholders) {
            if (replacedAnswer.includes(`##${placeholder.key}##`)) {
                replacedAnswer = replacedAnswer.replace(`##${placeholder.key}##`, `${placeholder.value}`);
            }
        }
        return replacedAnswer;
    }
}
