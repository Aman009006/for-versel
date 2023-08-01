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
        this.label = 'Platzhaltervorschau aktivieren';
        this.bothTexts = {
            placeholderText: '',
            noPlaceholderText: '',
        };
    }
    /**
     * @inheritDoc
     */
    async init() {
        const editor = this.editor;
        const t = editor.t;
        const placeholders = await getPlaceholders();
        editor.ui.componentFactory.add('placeholderToggler', locale => {
            const buttonView = new ButtonView(locale);
            buttonView.set({
                label: t(this.label),
                withText: true,
                isEnabled: false,
                class: 'ck-placeholder-toggle-button',
            });
            this.listenTo(buttonView, 'execute', () => {
                this.#toggleLabel(buttonView, t);
                this.#togglePlaceholder(placeholders);
            });
            this.listenTo(editor, 'change:state', () => {
                if (editor.state === 'ready' && this.#checkForPlaceholders()) {
                    buttonView.set({
                        isEnabled: true,
                    });
                }
            });
            return buttonView;
        });
    }
    #toggleLabel(buttonView, editor) {
        const deactivate = 'Platzhaltervorschau deaktivieren';
        const activate = 'Platzhaltervorschau aktivieren';

        if (this.label === activate) {
            this.label = deactivate;
            buttonView.set({
                label: editor(this.label),
            });
        } else {
            this.label = activate;
            buttonView.set({
                label: editor(this.label),
            });
        }
    }
    #togglePlaceholder(placeholders) {
        if (this.bothTexts.placeholderText == '' && this.bothTexts.noPlaceholderText == '') {
            this.#setBothTexts(placeholders);
            this.#replacePlaceholders();
        } else {
            this.#replacePlaceholders();
        }
    }
    #checkForPlaceholders() {
        const regex = /.*##.*/;
        return regex.test(this.editor.getData());
    }
    #replacePlaceholders() {
        const editor = this.editor;
        if (editor.getData() == this.bothTexts.placeholderText) {
            editor.setData(this.bothTexts.noPlaceholderText);
            editor.enableReadOnlyMode('placeholderToggler');
        } else {
            editor.setData(this.bothTexts.placeholderText);
            editor.disableReadOnlyMode('placeholderToggler');
        }
    }
    #setBothTexts(placeholders) {
        this.bothTexts.placeholderText = this.editor.getData();
        this.bothTexts.noPlaceholderText = new ReplacePlaceholder(
            this.bothTexts.placeholderText, placeholders).replaceSingleAnswer();
    }
}