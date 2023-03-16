import HtmlEncode from "@/utils/HtmlEncode";
import getFuseInstance from "@/utils/headerSearch/getFuseInstance"
import { headerSearch } from "@/constants";

export default class SearchElementFormatter {
    #intentArrayIndexInTitle = headerSearch.intentArrayIndexInTitle;

    /**
     * @param {import('fuse.js').default.FuseResult<FuseResultMatch>} element
     * @param {Record<string, import("./FilterElement").FilterElement>} filterElementObject
     * @param {string} userQuery
     */
    constructor(element, filterElementObject, userQuery) {
        this.element = element;
        this.filterElementObject = filterElementObject;
        this.userQuery = userQuery;
    }

    /**
     * @returns {string}
     */
    getElementWithHtmlFormatting() {
        const match = this.getMatchForUserQuery();
        let returnText = this.getHtmlFormattedTitle(this.element.item.title, match);
        if (match.key !== this.filterElementObject.intentName) {
            returnText += this.getHtmlFormattedElement(match);
        }
        return returnText;
    }

    /**
    * @private
    * @returns {import('fuse.js').default.FuseResultMatch}
    */
    getMatchForUserQuery() {
        const fuse = getFuseInstance(this.element.matches, ["value"])
        const fuseResult = fuse.search(
            this.userQuery
        );
        // the items are sorted by scores. Get the element with the highest score
        const match = fuseResult[0].item;
        return match;
    }

    /**
     * @private
     * @param {string[]} title
     * @param {import('fuse.js').default.FuseResultMatch} match
     * @returns {string}
     */
    getHtmlFormattedTitle(title, match) {
        /**
        * the index in the array of the element that was found.
        */
        const [startIndex, endIndex] = this.getTextIndices(match);
        const foundTextArrayIndex = title.findIndex(
            (_title, i) =>
                _title === match.value && i === this.#intentArrayIndexInTitle
        );
        let returnText = "";
        title.forEach((_title, i) => {
            if (
                foundTextArrayIndex === i &&
                match.key === this.filterElementObject.intentName.searchKey
            ) {
                returnText += this.markText(_title, startIndex, endIndex);
            } else {
                returnText += HtmlEncode(_title);
            }
            if (i < title.length - 1) {
                returnText += HtmlEncode(" > ");
            }
        });
        return returnText
    }

    /**
     * @private
     * @param {import('fuse.js').default.FuseResultMatch} match
     * @returns {string}
     */
    getHtmlFormattedElement(match) {
        const [startIndex, endIndex] = this.getTextIndices(match);
        let label = this.filterElementObject.answerText.label;
        if (match.key === this.filterElementObject.buttonTitle.searchKey) {
            label = this.filterElementObject.buttonTitle.label;
        } else if (match.key === this.filterElementObject.intent.searchKey) {
            label = this.filterElementObject.intent.label
        }
        // add the text to the result - text
        const returnText = `
        <p class="answer-text">
            <strong>${HtmlEncode(label)}</strong>: ${this.markText(match.value, startIndex, endIndex)}
        </p>`;
        return returnText;
    }

    /**
     * @private
     * @param {import('fuse.js').default.FuseResultMatch} match
     * @returns {number[]}
     */
    getTextIndices(match) {
        // get the index with the longest distance from eachother
        const distances = match.indices.map((index) => index[1] - index[0]);
        const arrayIndexOfHighestDistanceIndex = distances.indexOf(
            Math.max(...distances)
        );

        // eslint-disable-next-line prefer-const
        const startIndex = match.indices[arrayIndexOfHighestDistanceIndex][0]
        const endIndex = match.indices[arrayIndexOfHighestDistanceIndex][1] + 1;
        return [startIndex, endIndex];
    }

    /**
     * @param {string} text
     * @param {number} startIndex
     * @param {number} endIndex
     * @returns {string}
     */
    markText(text, startIndex, endIndex) {
        let returnText = "";
        if (startIndex > endIndex) {
            /**
             * dont understand why this happens, but sometimes
             * the first index is greater than the second.
             */
            [startIndex, endIndex] = [endIndex, startIndex];
        }
        // first part of the text
        returnText += HtmlEncode(text.substring(0, startIndex));
        // text that was found
        returnText += `<span class="text-marker">${HtmlEncode(
            text.substring(startIndex, endIndex)
        )}</span>`;
        // last part of the text
        returnText += HtmlEncode(text.substring(endIndex, text.length));
        return returnText;
    }
}