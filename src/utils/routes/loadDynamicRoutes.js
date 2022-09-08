import router from "@/router";
import store from "@/store";

export async function loadDynamicRoutes() {
    const { roles } = await store.dispatch("user/getInfo");

    // load skills with intents and generate accessible routes map based on roles for them
    const accessRoutes = await store.dispatch(
        "permission/generateRoutes",
        roles
    );
    // dynamically add accessible routes
    accessRoutes.forEach((route) => {
        router.addRoute(route);
    });
}