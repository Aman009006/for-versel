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
                <el-input v-model="input.password" :type="passwordType" placeholder="Neues Passwort"
                    @keyup.enter="resetPassword" />
                <span class="show-pwd" @click="showPwd">
                    <svg-icon :svg-icon-html="
                      passwordType === 'password' ? icons.eye : icons.eyeOpen
                    " />
                </span>
            </el-form-item>
            <el-form-item prop="repeatPassword">
                <span class="svg-container">
                    <svg-icon :svg-icon-html="icons.password" />
                </span>
                <el-input v-model="input.repeatPassword" :type="passwordType" placeholder="Neues Passwort bestätigen"
                    @keyup.enter="resetPassword" />
                <span class="show-pwd" @click="showPwd">
                    <svg-icon :svg-icon-html="
                      passwordType === 'password' ? icons.eye : icons.eyeOpen
                    " />
                </span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="resetPassword">Absenden</el-button>
            </el-form-item>
        </el-form>
        <template v-if="successMessage">
            <el-result icon="success" title="Passwort geändert"
                sub-title="Ihr Passwort wurde erfolgreich geändert. Sie können sich nun anmelden." />
        </template>
    </div>
</template>

<script>
import icons from "@/icons/index";
import { resetPassword } from '@/api/passwordReset';
import { isValidPassword } from "@/utils/validate";

export default {

    name: "PasswordReset",
    data() {
        const validatePassword = (rule, value, callback) => {
            if (value == '') {
                callback(new Error('Bitte geben Sie ein Passwort ein'));
            } else if (!isValidPassword(value)) {
                callback(new Error('Das Passwort muss mindestens 6 Zeichen lang sein, Groß- und Kleinbuchstaben, Sonderzeichen und Zahlen enthalten'));
            } else {
                callback()
            }
        }
        const validateRepeatPassword = (rule, value, callback) => {
            if (value == '') {
                callback(new Error('Bitte geben Sie ein Passwort ein'));
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
                password: [
                    { validator: validatePassword, trigger: 'blur' }
                ],
                repeatPassword: [
                    { validator: validateRepeatPassword, trigger: 'blur' }
                ]
            },
            passwordType: 'password',
            successMessage: false
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
                    this.successMessage = true;
                } else {
                    return false;
                }
            });
        },
        showPwd() {
            if (this.passwordType == 'password') {
                this.passwordType = 'text'
            } else {
                this.passwordType = 'password'
            }
        }
    },
    beforeCreate() {
        let token = new URLSearchParams(window.location.search).get('token')
        if (!token) {
            this.$router.push({
                path: encodeURI('/login')
            })
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
        margin-bottom: 30px;
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

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
        width: 17px;
    }
}
</style>
