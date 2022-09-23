import { createStore } from 'vuex'
import getters from './getters'
import app from './modules/app';
import dialogs from './modules/dialogs';
import permission from './modules/permission';
import placeholders from './modules/placeholders';
import tagsView from './modules/tagsView';
import user from './modules/user';

const modules = createModules();
const store = createStore({
  modules,
  getters,
})

function createModules() {
  const modules = {
    app,
    dialogs,
    permission,
    placeholders,
    tagsView,
    user
  };
  return modules;
}

export default store
