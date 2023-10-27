import { createStore } from 'vuex'
import getters from './getters'
import answerButtons from './modules/answerButtons';
import app from './modules/app';
import dialogs from './modules/dialogs';
import permission from './modules/permission';
import placeholders from './modules/placeholders';
import tagsView from './modules/tagsView';
import user from './modules/user';
import search from './modules/search';
import virtualIntents from './modules/virtualIntents';

const modules = createModules();
const store = createStore({
  modules,
  getters,
})

function createModules() {
  const modules = {
    answerButtons,
    app,
    dialogs,
    permission,
    placeholders,
    tagsView,
    user,
    search,
    virtualIntents
  };
  return modules;
}

export default store
