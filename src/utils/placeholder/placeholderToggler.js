import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import ReplacePlaceholder from './replacePlaceholder';
import { getPlaceholders } from '@/api/placeholders';

export default class PlaceholderToggler extends Plugin {
    static get pluginName() {
        return 'PlaceholderToggler';
    }
    props = [];
    constructor(editor) {
        super(editor);
        this.bothTexts = {
            placeholderText: '',
            noPlaceholderText: '',
        };
    }
    /**
     * @inheritDoc
     */
    init() {
        const editor = this.editor;
        const t = editor.t;
        editor.ui.componentFactory.add('placeholderToggler', locale => {
            const buttonView = new ButtonView(locale);
            buttonView.set({
                label: t('Platzhalter'),
                withText: true,
                class: 'ck-placeholder-toggle-button',
            });
            this.listenTo(buttonView, 'execute', () => {
                if (this.bothTexts.placeholderText == '' && this.bothTexts.noPlaceholderText == '') {
                    this.#createObject();
                } else {
                    this.#replacePlaceholders();
                }
            });
            return buttonView;
        });
    }
    #replacePlaceholders() {
        if (this.editor.getData() == this.bothTexts.placeholderText) {
            this.editor.setData(this.bothTexts.noPlaceholderText);
        } else {
            this.editor.setData(this.bothTexts.placeholderText);
        }
    }
    async #createObject() {
        const placeholders = await getPlaceholders();
        this.bothTexts.placeholderText = this.editor.getData();
        this.bothTexts.noPlaceholderText = new ReplacePlaceholder(
            this.bothTexts.placeholderText, placeholders).replaceSingleAnswer();
        this.#replacePlaceholders();
    }
}