import Fuse from "fuse.js";

/**
 * @param {import("./SkillsWithIntents").SkillsWithIntents} searchPool
 * @param {string[]} searchKeys
 */
export default function getFuseInstance(searchPool, searchKeys) {
    /**
     * Fuse gets two arguments: list (collection where the search happens)
     * and options
     */
    return new Fuse(
        searchPool,
        {
            shouldSort: true,
            /**
             * Defines when the match algorithm gives up:
             * 0.0 requires a perfect match of both letters and location
             * 1.0 would match anything
             */
            threshold: 0.4,
            // Determines approximately where the pattern is expected to be found in the text.
            location: 0, // default 0
            /**
             * Determines how close the match must be to the fuzzy location specified by location:
             * A distance of 1000 would require a perfect match to be within 800 characters
             * of the location to be found using a threshold of 0.8.
             */
            distance: 5000, // default 100
            maxPatternLength: 32,
            /**
             * Only the matches whose length exceeds this value will be returned.
             * If you want to ignore single character matches in the result, set it to 2.
             */
            minMatchCharLength: 1,
            // List of keys that will be searched.
            keys: searchKeys,
            includeMatches: true,
        }
    );
}