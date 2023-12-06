import {getRoleAccesses} from "@/api/user";
import {createRole, editRole, getRolesApi} from "@/api/role";

const state = {
    roleAccesses: [],
    roles: [],
    roleDescription: '',
    roleName: '',
    selectedAccesses: [],
    loading: false,
}

const mutations = {
    setRoleAccesses: (state, roleAccesses) => {
        state.roleAccesses = roleAccesses
    },
    setRoleDescription: (state, description) => {
        state.roleDescription = description
    },
    setRoleName: (state, name) => {
        state.roleName = name
    },
    setGroupPermission: (state, selectedGroup) => {
        state.roleAccesses = selectedAllGroup(state, selectedGroup)
    },
    setOnePermission: (state, selectedItem) => {
        state.roleAccesses = selectedOneInGroup(state, selectedItem)
    },
    setLoading: (state, status) => {
        state.loading = status
    },
    deleteRoleAccesses: (state) => {
        state.roleAccesses = []
    },
    setRoles: (state, roles) => {
        state.roles = roles
    },
}

const actions = {
    async setAccessesRoleAction({ commit }, roleName) {
        const allRoleAccesses = await getRoleAccesses(roleName)
        commit(mutations.setRoleAccesses.name, allRoleAccesses.accesses)
        commit(mutations.setRoleName.name, allRoleAccesses.roleName)
        commit(mutations.setRoleDescription.name, allRoleAccesses.roleDescription)
        commit(mutations.setLoading.name, false)
    },
    selectedAllGroupPermissionAction({ commit }, selectedGroup) {
        commit(mutations.setGroupPermission.name, selectedGroup)
    },
    selectedOnePermissionAction({ commit }, selectedItem) {
        commit(mutations.setOnePermission.name, selectedItem)
    },
    setRoleDescriptionAction({ commit }, description) {
        commit(mutations.setRoleDescription.name, description)
    },
    deleteRoleAccessesAction({ commit }) {
        commit(mutations.deleteRoleAccesses.name)
    },
    setLoadingStatusAction({ commit }, status) {
        commit(mutations.setLoading.name, status)
    },
    async startCreatingRole({ commit }, data) {
        await createRole(data)
    },
    async startEditingRole({ commit }, data) {
        await editRole(data)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}

function selectedAllGroup(state, selectedGroup) {
    const groupName = selectedGroup.groupName;
    const keyToChange = selectedGroup.keyToChange;
    const array = state.roleAccesses;

    const newArray = [...array];

    for (let i = 0; i < newArray.length; i++) {
        if (newArray[i].permissionName === groupName) {
            const updatedIntents = newArray[i].permissions.map(intent => {
                const newIntent = { ...intent };
                if (keyToChange === 'read') {
                    newIntent.read = 1;
                    newIntent.write = 0;
                } else {
                    newIntent.read = 0;
                    newIntent.write = 1;
                }
                return newIntent;
            });
            newArray[i] = {
                ...newArray[i],
                permissions: updatedIntents,
            };
        }
    }
    return newArray;
}
function selectedOneInGroup(state, selectedItem) {
    const groupName = selectedItem.groupName;
    const intentName = selectedItem.intentName;
    const keyToChange = selectedItem.keyToChange;
    const array = state.roleAccesses;
    const newArray = [...array];

    for (let i = 0; i < newArray.length; i++) {
        if (newArray[i].permissionName === groupName) {
             newArray[i].permissions.map((item) => {
                if (item.name === intentName) {
                    if (keyToChange === 'read') {
                        item.read = 1;
                        item.write = 0;
                    } else {
                        item.read = 0;
                        item.write = 1;
                    }
                    return item
                }

            } )
        }
    }
    return newArray
}
