<template>
    <div class="password-reset-container">
        <div class="title-container">
            <h3 class="title">Neues Passwort vergeben</h3>
        </div>
        <el-form ref="input" :model="input" class="reset-form">
            <el-form-item>
                <el-input ref="password" v-model="input.password" />
            </el-form-item>
            <el-form-item>
                <el-input ref="repeatPassword" v-model="input.repeatPassword" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="resetPassword()">Absenden</el-button>
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
                password: '',
                repeatPassword: ''
            }
        }
    },
    methods: {
        resetPassword() {
            console.log('resetPassword');
        }
    }
};
</script>

<style lang="scss">
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.send-reset {
    border: transparent !important
}

.password-reset-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    button {
        width: 100%;
        margin-bottom: 30px;
        margin-left: 0px;
    }

    .reset-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;

        .email-icon {
            font-weight: bold;
        }
    }
    
    .title-container {
        position: relative;

        .title {
            font-size: 26px;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
    }
}
</style>
