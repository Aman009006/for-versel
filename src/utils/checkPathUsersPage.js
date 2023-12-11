import {paths} from "@/constants";

export function checkPathUsersPage(route) {
    return (
        route.fullPath.includes(paths.users) ||
        route.fullPath.includes(paths.permissionSets) ||
        route.fullPath.includes(paths.permissionSettings)
    );
}
export function checkNeedToHideChatbot(path) {
    return (
        path.includes(paths.users) ||
        path.includes(paths.permissionSets) ||
        path.includes(paths.reporting) ||
        path.includes(paths.permissionSettings)
    );
}
