<template>
    <div class="password-reset-container">
        <el-image :src="hsagLogo" />
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
            <el-button type="primary" @click="resetPassword">Absenden</el-button>
        </el-form>
        <template v-if="successMessage">
            <div class="success-message-container">
                <el-result icon="success" title="Passwort erfolgreich geändert"
                    sub-title="Sie können sich jetzt mit Ihrem neuen Passwort anmelden." />
                <el-button type="primary" @click="redirectToLogin">
                    Home
                </el-button>
            </div>
        </template>
    </div>
</template>

<script>
import icons from "@/icons/index";
import { resetPassword } from '@/api/passwordReset';
import { isValidPassword } from "@/utils/validate";
import hsagLogo from "@/assets/images/hsag_logo.png";

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
            successMessage: false,
            hsagLogo,
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
                    await resetPassword(this.input.password, window.location.href);
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
        },
        redirectToLogin() {
            this.$router.push("/");
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
@import "@/styles/variables.module.scss";

@supports (-webkit-mask: none) and (not (cater-color: white)) {
    .send-reset-container .el-input input {
        color: white;
    }
}

.password-reset-container {
    background-color: $hsag-white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    width: 100%;
    overflow: hidden;

    .el-image {
        width: 300px;
        margin-bottom: 30px;
    }

    .title-container {
        .title {
            font-size: 26px;
            color: $hsag-blue;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
    }

    button {
        width: 60%;
        height: 40px;
        margin-bottom: 20px;
        margin-left: 0;
        font-weight: 400;
    }

    .reset-form,
    .success-message-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
            color: $hsag-bluegrey;
            height: 46px;
            caret-color: $hsag-bluegrey;

            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px $hsag-white inset !important;
                -webkit-text-fill-color: white !important;
            }
        }
    }

    .el-form-item {
        width: 100%;
        background-color: $hsag-lightgrey;
        border-radius: 5px;
        margin-bottom: 30px;
    }

    .svg-container {
        padding: 6px 2px 6px 15px;
        color: gray;
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
        color: gray;
        cursor: pointer;
        user-select: none;
        width: 17px;
    }

    @media only screen and (max-width: 470px) {
        .el-image {
            width: 80%;
        }

        .reset-form {
            .el-form-item {
                width: 80%;
            }
        }

    }
}
</style>
