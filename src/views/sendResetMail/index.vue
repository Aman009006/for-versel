<template>
    <div class="send-reset-container">
        <el-image :src="hsagLogo" />
        <div class="title-container">
            <h3 class="title">Passwort vergessen</h3>
        </div>
        <el-form ref="input" :model="input" :rules="inputRules" class="send-reset-form" @submit.prevent>
            <el-form-item prop="mail">
                <span class="svg-container email-icon"> @ </span>
                <el-input v-model="input.mail" @keyup.enter="sendPasswordResetMail()" placeholder="E-Mail" />
            </el-form-item>
            <el-button type="primary" @click="sendPasswordResetMail()">Absenden</el-button>
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
import hsagLogo from "@/assets/images/hsag_logo.png";

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
            successMessage: false,
            hsagLogo,
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
@import "@/styles/variables.module.scss";

@supports (-webkit-mask: none) and (not (cater-color: white)) {
    .send-reset-container .el-input input {
        color: $hsag-bluegrey;
    }
}

.send-reset-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    width: 100%;
    background-color: $hsag-white;
    overflow: hidden;

    .title-container {
        .title {
            font-size: 26px;
            color: $hsag-blue;
            margin: 0px auto 20px auto;
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

    .send-reset-form {
        display: flex;
        flex-direction: column;
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
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: $hsag-lightgrey;
        border-radius: 5px;
        color: #454545;
    }

    .el-result {
        color: $hsag-black;
    }

    .el-image {
        width: 300px;
        margin-bottom: 30px;
    }

    .svg-container {
        padding: 6px 2px 6px 15px;
        color: grey;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .email-icon {
        font-weight: bold;
    }

    @media only screen and (max-width: 470px) {
        .send-reset-form {
            .el-form-item {
                width: 80%;
            }
        }
    }
}
</style>
