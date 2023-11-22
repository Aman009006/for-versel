<template>
    <div class="redirect-wrapper">
        <div v-if="redirectsToggled" @click="toggleRedirects()" class="redirect-pill">Weiterleitungen ausblenden</div>
        <div v-else @click="toggleRedirects()" class="redirect-pill">
            Weiterleitungen einblenden</div>
        <template v-if="this.redirectsToggled" v-for="redirect of incomingRedirectsArray">
            <a :href="getRedirectPath(redirect)">
                <div class="redirect-pill lighter">
                    <span>{{ redirect.name }}</span>
                </div>
            </a>
        </template>
    </div>
</template>

<script>
export default {
    name: 'IncomingRedirects',
    props: {
        incomingRedirectsArray: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            redirectsToggled: false,
        };
    },
    methods: {
        toggleRedirects() {
            this.redirectsToggled ? this.redirectsToggled = false : this.redirectsToggled = true;
        },
        getRedirectPath(intent) {
            const routes = this.$router.getRoutes();
            const redirectRoute = intent.name;
            const findRoute = routes.find(route => route.meta.title === redirectRoute);
            if (findRoute !== undefined) {
                const resolvedRoute = this.$router.resolve(findRoute.path);
                return resolvedRoute.href;
            }
        },
    },
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.module.scss";

.redirect-wrapper {
    display: flex;
    flex-wrap: wrap;
    row-gap: 10px;
    column-gap: 10px;
    margin-bottom: 20px;
}

.redirect-pill {
    background: #FFE399;
    border-radius: 50px;
    padding: 5px 30px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.15s ease-in-out;

    &:hover{
        background-color: #FFDD80;
    }

    &.lighter {
        font-weight: 400;
        background-color: #FFF1CC;
       

        &:hover {
            background-color: #FFE399;
        }
    }

    span {
        opacity: 100%;
    }

    ;
}</style>