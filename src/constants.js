
export const links = {
    jiraHelpDesk: 'https://hsagbpo.atlassian.net/servicedesk/customer/portal/8',
    releaseNotes: 'https://hsagsoftware.atlassian.net/wiki/spaces/CHAT/pages/21004395/Release+Notes+Chatbot+Isa',
    manual: 'https://hsagsoftware.atlassian.net/wiki/spaces/CHAT/pages/57803205/Bedienungsanleitung+Admin+UI',
    manualChatbot: 'https://hsagsoftware.atlassian.net/wiki/spaces/CHAT/pages/417890750/API-Dokumentation+Chatbot+Frontend'
}

export const paths = {
    skills: '/skills',
    placeholders: '/placeholders'
}

const setSkillsAndIntents = 'setSkillsAndIntents';

export const dispatchNames = {
    setSkillsAndIntents,
    setSkillsAndIntentsFullQualified: 'permission/' + setSkillsAndIntents
}
