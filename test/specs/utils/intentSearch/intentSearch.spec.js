import { describe, test, expect } from 'vitest';
import { intentSearchValues } from '../../../mocks/answerMocks'
import { searchIntentGroup, searchSingleIntent } from '@/utils/intentSearch/intentSearch';

describe('intentSearch', function () {
    test('searchIntentGroup', function () {
        const newValue = 'TESTGROUP2'
        const searchGroup = searchIntentGroup(intentSearchValues.intentGroup, newValue)
        expect(searchGroup).toBe(true)
    })
    test('searchSingleIntentName', function () {
        const newValue = 'SingLeInteNt'
        const searchIntent = searchSingleIntent(intentSearchValues.intentSingle, newValue)
        expect(searchIntent).toBe(true)
    })
    test('searchSingleTechnicalIntentName', function () {
        const newValue = 'si_2'
        const searchIntent = searchSingleIntent(intentSearchValues.intentSingle, newValue)
        expect(searchIntent).toBe(true)
    })
    test('searchSingleIntentExample', function () {
        const newValue = 'zweite'
        const searchIntent = searchSingleIntent(intentSearchValues.intentSingle, newValue)
        expect(searchIntent).toBe(true)
    })
    test('searchSingleIntentExampleTwo', function () {
        const newValue = 'gerne'
        const searchIntent = searchSingleIntent(intentSearchValues.intentSingle, newValue)
        expect(searchIntent).toBe(true)
    })
    test('searchSingleIntentDescription', function () {
        const newValue = 'möchte'
        const searchIntent = searchSingleIntent(intentSearchValues.intentSingle, newValue)
        expect(searchIntent).toBe(true)
    })
    test('searchSingleIntentAnswer', function () {
        const newValue = 'Antwort auf den'
        const searchIntent = searchSingleIntent(intentSearchValues.intentSingle, newValue)
        expect(searchIntent).toBe(true)
    })
});