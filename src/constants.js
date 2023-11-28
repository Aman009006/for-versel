export const links = {
  jiraHelpDesk: 'https://hsagbpo.atlassian.net/servicedesk/customer/portal/8',
  releaseNotes:
    'https://hsagsoftware.atlassian.net/wiki/spaces/CHAT/pages/21004395/Release+Notes+Chatbot+Isa',
  manual:
    'https://hsagsoftware.atlassian.net/wiki/spaces/CHAT/pages/57803205/Bedienungsanleitung+Admin+UI',
  manualChatbot:
    'https://hsagsoftware.atlassian.net/wiki/spaces/CHAT/pages/417890750/API-Dokumentation+Chatbot+Frontend',
}

export const paths = {
  intents: '/intents',
  placeholders: '/placeholders',
  users: '/users',
  permissionSets: '/permission-sets',
  permissionSettings: '/permission-settings',
  reporting: '/reporting',
}

const setSkillsAndIntents = 'setSkillsAndIntents'

export const dispatchNames = {
  setSkillsAndIntents,
  setSkillsAndIntentsFullQualified: 'permission/' + setSkillsAndIntents,
  getAndSetIntentAnswers: 'dialogs/getAndSetIntentAnswers',
  updateStateProperties: "answerButtons/updateStateProperties",
  resetStateProperties: "answerButtons/resetStateProperties",
  deleteAnswerButton: "answerButtons/deleteAnswerButton",
  addNewAnswerButton: "answerButtons/addNewAnswerButton",
  resetStateAndSaveCopyOfButtons: "answerButtons/resetStateAndSaveCopyOfButtons",
  getCurrentEditedButtons: "answerButtons/getCurrentEditedButtons",
  getVirtualIntents: "virtualIntents/getVirtualIntents",
}

export const humanReadableLabels = {
  answerText: 'Antworttext',
  intentName: 'Intentname',
  technicalIntentName: 'Technischer Intentname',
  buttonName: 'Buttonname',
  edit: 'Bearbeiten',
  description: 'Beschreibung',
}

export const buttonTypes = {
  openUrl: 'openUrl',
  messageBack: 'messageBack'
}

export const defaultEntity = {
  entityName: "noneEntity"
}
export const defaultRole = {
  defaultRole: "Auswählen"
}

export const intentConstants = {
  dialogs: "Dialoge",
  intentGroups: "Intent Groups",
  intents: "Virtual Intents",
}

export const headerSearch = {
  intentArrayIndexInTitle: 2
}
export const userAccesses = {
  placeholders: "placeholders",
  users: "users",
  roles: "roles",
  edit: "edit",
  create: "create",
  delete: "delete",
}

export const buttonLimit = 5
