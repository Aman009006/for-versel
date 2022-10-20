<template>
    <div class="password-reset-container">
        <div class="title-container">
            <h3 class="title">Neues Passwort vergeben</h3>
        </div>
        <el-form ref="input" :model="input" :rules="inputRules" class="reset-form">
            <el-form-item prop="password">
                <span class="svg-container">
                    <svg-icon :svg-icon-html="icons.edit" />
                </span>
                <el-input v-model="input.password" placeholder="Neues Passwort" @keyup.enter="sendPasswordResetMail" />
            </el-form-item>
            <el-form-item prop="repeatPassword">
                <span class="svg-container">
                    <svg-icon :svg-icon-html="icons.password" />
                </span>
                <el-input v-model="input.repeatPassword" placeholder="Neues Passwort bestätigen"
                    @keyup.enter="sendPasswordResetMail" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="resetPassword">Absenden</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import icons from "@/icons/index";
import { resetPassword } from '@/api/passwordReset';

export default {

    name: "PasswordReset",
    data() {
        const validatePassword = (rule, value, callback) => {
            if (value == '') {
                callback(new Error('Bitte geben Sie ein Passwort ein'));
                debugger;
            } else if (value !== this.input.password) {
                callback(new Error('Die angegebenen Passwörter müssen identisch sein'))
            } else {
                callback()
            }
        }
        return {
            input: {
                password: '',
                repeatPassword: ''
            },
            inputRules: {
                password: {
                    required: true, message: 'Bitte geben Sie ein Passwort ein', trigger: 'blur'
                },
                repeatPassword: [
                    { validator: validatePassword, trigger: 'blur' },
                ]
            }
        }
    },
    computed: {
        icons() {
            return icons;
        },
    },
    methods: {
        async resetPassword() {
            this.$refs.input.validate(async (valid) => {
                if (valid) {
                    let urlParams = new URLSearchParams(window.location.search)
                    await resetPassword(this.input.password, urlParams.get('token'));
                } else {
                    return false;
                }
            });
        }
    }
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;
$dark_gray: #889aa4;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .send-reset-container .el-input input {
        color: $cursor;
    }
}

/* reset element-ui css */
.password-reset-container {
    background-color: #2d3a4b;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 160px 35px 0;
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .title-container {
        .title {
            font-size: 26px;
            color: #eee;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
    }

    button {
        width: 100%;
        margin-left: 0px;
    }

    .reset-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        margin: 0 auto;
        overflow: hidden;
    }

    .el-form-item__content {
        flex-direction: row;
        flex-wrap: nowrap;
    }

    .el-input__wrapper {
        display: inline-block;
        height: 47px;
        width: 85%;
        background: transparent;

        &,
        &:hover,
        &.is-focus {
            box-shadow: none;
        }

        input {
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 46px;
            caret-color: $cursor;

            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
            }
        }
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }

    .svg-container {
        padding: 6px 2px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .email-icon {
        font-weight: bold;
    }
}
</style>
