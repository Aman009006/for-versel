export const answerConfigSimple = {
    type: 'simple',
    redirectToVirtualIntentName: null
};

export const answerConfigMulti = {
    type: 'multi',
    redirectToVirtualIntentName: null
};

export const buttons = [
    {
        type: 'messageBack',
        title: 'button1',
        value: 'button1',
        answer_config: 82030,
        identificator: null
    },
    {
        type: 'openUrl',
        title: 'button2',
        value: 'https://www.google.de/',
        answer_config: null,
        identificator: null
    }
];

export const answer = {
    id: 116467,
    text: 'Auf Wiedersehen 🤗',
    readableName: null,
    description: null,
    buttons: buttons
};
