import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import ReplacePlaceholder from './replacePlaceholder';
export default class PlaceholderToggler extends Plugin {
    static get pluginName() {
        return 'PlaceholderToggler';
    }
    props = [];
    constructor(editor) {
        super(editor);
        this.label = 'Platzhaltervorschau aktivieren';
        this.isPlaceholderShown = false;
        this.textContainer = {
            originalText: '',
            placeholderText: '',
            noPlaceholderText: '',
        };
    }
    init() {
        const editor = this.editor;
        const t = editor.t;
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
                this.#togglePlaceholder(this.placeholders);
                this.isPlaceholderShown === false ? this.isPlaceholderShown = true : this.isPlaceholderShown = false;
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
    /**
     * @param {ButtonView} buttonView
     * @param {Object} editor
     */
    #toggleLabel(buttonView, editor) {
        const deactivate = 'Platzhaltervorschau deaktivieren';
        const activate = 'Platzhaltervorschau aktivieren';

        if (this.label === activate) {
            this.label = deactivate;
        } else {
            this.label = activate;
        }

        buttonView.set({
            label: editor(this.label),
        });
    }
    /** @param {Array} placeholders */
    #togglePlaceholder(placeholders) {
        this.#setTextContainer(placeholders);
        this.#replacePlaceholders();
    }
    /** @returns {Boolean} */
    #checkForPlaceholders() {
        const regex = /.*##.*/;
        return regex.test(this.editor.getData());
    }
    #replacePlaceholders() {
        const editor = this.editor;
        if (editor.getData() == this.textContainer.placeholderText) {
            editor.setData(this.textContainer.noPlaceholderText[0].text);
            editor.enableReadOnlyMode('placeholderToggler');
            this.#toggleSaveButton();
        } else {
            editor.setData(this.textContainer.placeholderText);
            editor.disableReadOnlyMode('placeholderToggler');
            this.#toggleSaveButton();
        }
    }
    #toggleSaveButton() {
        const button = document.getElementById('saveAnswerButton');
        button.disabled === true ? button.disabled = false : button.disabled = true;
    }
    /** @param {Array} placeholders */
    #setTextContainer(placeholders) {
        if (this.isPlaceholderShown === false) {
            this.textContainer.originalText = this.editor.getData();
            this.textContainer.placeholderText = this.editor.getData();
            this.textContainer.noPlaceholderText = new ReplacePlaceholder(
                [{ text: this.textContainer.placeholderText }], placeholders).replaceAnswers();
        } else {
            this.textContainer.placeholderText = this.textContainer.originalText;
            this.textContainer.noPlaceholderText = this.editor.getData();
        }
    }
}