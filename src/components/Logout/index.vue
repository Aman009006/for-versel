<template>
    <el-icon class="svg-icon logout-icon right-menu-item" @click="logout" :size="34">
        <svg-icon :svg-icon-html="svgIconHtml" style="width: 18px; height: 18px" />
    </el-icon>
</template>
  
<script>
import { getIconByName } from "@/icons";

export default {
    name: "Logout",
    props: {
        icon: {
            type: String,
            default: "logout",
        },
    },
    computed: {
        svgIconHtml() {
            return getIconByName(this.icon);
        },
    },
    methods: {
        async logout() {
            await this.$store.dispatch("user/logout");
            /**
             * We need to reload the page when logging out.
             * The reason lies in the chatbot - widget, which is shown in the
             * admin - UI.
             * When we would not reload the window, the dynamically loaded components, like
             * css and JavaScript, would stay in the admin - UI.
             * Additionaly the sessionStorage is cleared so that the
             * conversationId of the chatbot will not be persisted
             * @see https://hsagchatbot.atlassian.net/browse/CHAT-1156
             * @see https://stackoverflow.com/a/47005895/6458608
             */
            sessionStorage.clear();
            this.$router.go();
        },
    },
};
</script>
  
<style scoped>
.logout-icon {
    cursor: pointer;
}
</style>
  