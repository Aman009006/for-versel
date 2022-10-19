<template>
    <div class="password-reset-container">
        <div class="title-container">
            <h3 class="title">Passwort vergessen</h3>
        </div>
        <el-form ref="input" :model="input" class="reset-form">
            <el-form-item>
                <el-input ref="mail" v-model="input.mail" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="sendPasswordResetMail()">Absenden</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { sendPasswordResetMail } from '@/api/passwordReset';

export default {
    name: "PasswordReset",
    data() {
        return {
            input: {
                mail: ''
            }
        }
    },
    methods: {
        sendPasswordResetMail() {
            const success = sendPasswordResetMail('m.schuelein@hsag.info');
            console.log(success);
        }
    }
};
</script>

<style lang="scss">
.password-reset-container {
    background-color: #2d3a4b;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 160px 35px 0;

    .title-container {
        .title {
            font-size: 26px;
            color: #eee;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
    }

    .reset-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        margin: 0 auto;
        overflow: hidden;
    }
}
</style>
