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

export const intentSearchValues = {
    intentGroup: {
        SkillName: 'testGroup2',
        Intents: []
    },
    intentSingle: {
        name: 'SingLeInteNt',
        intent: 'SI_2',
        entity: {},
        utterances: ['Was ist der zweite Intent?', 'Den zweiten hätte ich gerne'],
        description: 'Der Kunde möchte den zweiten Intent ansteuern',
        texts: [
            {
                text: 'Antwort auf den zweiten Intent',
            }
        ]
    }
};

export const lastClickedIntentData = {
    virtualIntentName: 'technicalTestIntent',
    intentGroup: 'testIntentGroup',
    intentGroupFalse: 'testIntentGroupFalse'
}