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
  deletedAnswerButtons: (state) => state.answerButtons.deletedAnswerButtons,
  currentAnswerButtons: (state) => state.answerButtons.currentAnswerButtons
}
export default getters
