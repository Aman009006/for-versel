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
    replaceAnswers() {
        const replacedAnswers = JSON.parse(JSON.stringify(this.answers));
        for (const answer of replacedAnswers) {
            answer.text = this.#replaceFunction(answer.text);
        }
        return replacedAnswers;
    }
    /**
     * @param {String} text
     * @returns {String}
     */
    #replaceFunction(text) {
        for (const placeholder of this.allPlaceholders) {
            if (text.includes(`##${placeholder.key}##`)) {
                text = text.replace(`##${placeholder.key}##`, `${placeholder.value}`);
            }
        }
        return text
    }
}
