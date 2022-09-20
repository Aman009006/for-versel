const getters = {
  sidebar: (state) => state.app.sidebar,
  size: (state) => state.app.size,
  device: (state) => state.app.device,
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  introduction: (state) => state.user.introduction,
  roles: (state) => state.user.roles,
  permission_routes: (state) => state.permission.routes,
  skillsWithIntents: (state) => state.permission.skillsWithIntents,
  metainfo: (state) => state.user.metainfo,
  placeholders: (state) => state.placeholders.placeholders,
  intents: (state) => state.dialogs.intents,
  deletedAnswerButtonIndexes: (state) => state.answerButtons.deletedAnswerButtonIndexes,
  newAnswerButtons: (state) => state.answerButtons.newAnswerButtons,
  currentEditedAnswerButtons: (state) => state.answerButtons.currentEditedAnswerButtons,
  titleDuplicate: (state) => state.answerButtons.titleDuplicate,
  inputEmpty: (state) => state.answerButtons.inputEmpty
}
export default getters
