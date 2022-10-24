<template>
    <div class="send-reset-container">
        <div class="title-container">
            <h3 class="title">Passwort vergessen</h3>
        </div>
        <el-form ref="input" :model="input" :rules="inputRules" class="send-reset-form" @submit.prevent>
            <el-form-item prop="mail">
                <span class="svg-container email-icon"> @ </span>
                <el-input v-model="input.mail" @keyup.enter="sendPasswordResetMail()" placeholder="E-Mail" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="sendPasswordResetMail()">Absenden</el-button>
            </el-form-item>
        </el-form>
        <template v-if="successMessage">
            <el-result icon="success" title="Mail versendet"
                sub-title="Wir haben Ihnen einen Link geschickt, über den Sie Ihr Passwort zurücksetzen können. Dieser Link ist 1 Stunde gültig. Danach können Sie sich jederzeit hier einen neuen Link zusenden lassen" />
        </template>
    </div>
</template>

<script>
import { sendPasswordResetMail } from '@/api/passwordReset';
import { validEmail } from "@/utils/validate";

export default {
    name: "SendResetMail",
    data() {
        const validateEmail = (rule, value, callback) => {
            if (!validEmail(value)) {
                callback(new Error("Bitte geben Sie eine gültige E-Mail-Adresse ein"));
            } else {
                callback();
            }
        };
        return {
            input: {
                mail: ''
            },
            inputRules: {
                mail: { validator: validateEmail, trigger: 'blur' }
            },
            successMessage: false
        }
    },
    methods: {
        async sendPasswordResetMail() {
            this.$refs.input.validate(async (valid) => {
                if (valid) {
                    await sendPasswordResetMail(this.input.mail);
                    this.successMessage = true;
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

.send-reset-container {
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

    .send-reset-form {
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
