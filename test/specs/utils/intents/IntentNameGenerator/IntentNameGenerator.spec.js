import IntentNameGenerator from '@/utils/intents/IntentNameGenerator';
import TestData from './TestData';
import { expect, it, describe } from 'vitest';

describe(IntentNameGenerator.name, function () {
    it("returns the intent if a default entity was provided", function () {
        const generator = new IntentNameGenerator(TestData.intent, TestData.defaultEntity);
        const technicalIntentName = generator.getTechnicalIntentName();
        expect(technicalIntentName).to.equals(TestData.intent)
    })

    it("returns a slash merged string with a non default entity", function () {
        const generator = new IntentNameGenerator(TestData.intent, TestData.customEntity);
        const technicalIntentName = generator.getTechnicalIntentName();
        expect(technicalIntentName).to.equals(
            `${TestData.intent}/${TestData.customEntity.entityName}/${TestData.customEntity.normalizedEntityValue}`
        )
    })
})
