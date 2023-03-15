import HtmlEncode from "@/utils/HtmlEncode";
import getFuseInstance from "@/utils/headerSearch/getFuseInstance"

export default class SearchElementFormatter {
    constructor(element, filterElementObject, userQuery) {
        this.element = element;
        this.filterElementObject = filterElementObject;
        this.userQuery = userQuery;
    }

    getHtml() {
        const match = this.getElementForUserQuery();

        // get the index with the longest distance from eachother
        const distances = match.indices.map((index) => index[1] - index[0]);
        const arrayIndexOfHighestDistanceIndex = distances.indexOf(
            Math.max(...distances)
        );

        // eslint-disable-next-line prefer-const
        let [textIndex1, textIndex2] =
            match.indices[arrayIndexOfHighestDistanceIndex];
        textIndex2++;
        const { title } = this.element.item;
        /**
         * the index in the array of the element that was found.
         */
        const foundTextArrayIndex = title.findIndex(
            (_title, i) =>
                _title === match.value && i === this.intentArrayIndexInTitle
        );
        let pathText = "";
        title.forEach((_title, i) => {
            if (
                foundTextArrayIndex === i &&
                match.key === this.filterElementObject.intentName.searchKey
            ) {
                pathText += this.markText(_title, textIndex1, textIndex2);
            } else {
                pathText += HtmlEncode(_title);
            }
            if (i < title.length - 1) {
                pathText += HtmlEncode(" > ");
            }
        });
        if (
            match.key !== this.filterElementObject.intentName
        ) {
            let label = this.filterElementObject.answerText.label;
            if (match.key === this.filterElementObject.buttonTitle.searchKey) {
                label = this.filterElementObject.buttonTitle.label;
            } else if (match.key === this.filterElementObject.intent.searchKey) {
                label = this.filterElementObject.intent.label
            }
            // add the text to the result - text
            pathText += `
          <p class="answer-text">
            <strong>
              ${HtmlEncode(label)}
            </strong>: ${this.markText(match.value, textIndex1, textIndex2)}
          </p>`;
        }
        return pathText;
    }

    /**
     * @private
     */
    getElementForUserQuery() {
        // search the matches to get the scores
        const fuseRes = getFuseInstance(this.element.matches, ["value"]).search(
            this.userQuery
        );
        // the items are sorted by scores. Get the element with the highest score
        const match = fuseRes[0].item;
        return match;
    }

    /**
     * @private
     */
    markText(text, textIndex1, textIndex2) {
        let pathText = "";
        if (textIndex1 > textIndex2) {
            /**
             * dont understand why this happens, but sometimes
             * the first index is greater than the second.
             */
            [textIndex1, textIndex2] = [textIndex2, textIndex1];
        }
        // first part of the text
        pathText += HtmlEncode(text.substring(0, textIndex1));
        // text that was found
        pathText += `<span class="text-marker">${HtmlEncode(
            text.substring(textIndex1, textIndex2)
        )}</span>`;
        // last part of the text
        pathText += HtmlEncode(text.substring(textIndex2, text.length));
        return pathText;
    }
}