<template>
    <div class="main">
        <img src="../../images/fendou.gif"/>
        <h1>{{title}}</h1>
        <div class="loginArea">
            <el-form :model="loginValidateForm" ref="loginValidateForm" :rules="loginValidateRule" :loading="loading" element-loading-text="Loading..." label-width="130px" label-position="top">
                <el-form-item label="PhoneNumber" prop="phoneNumber">
                    <el-input v-model="loginValidateForm.phoneNumber" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="LoginPassword" prop="loginPassword">
                    <el-input v-model="loginValidateForm.loginPassword" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item class="btn">
                    <el-button type="primary" size="large" @click="submitLoginForm('loginValidateForm')">
                        Login
                    </el-button>
                    <el-button size="large" @click="resetLoginForm ('loginValidateForm')">
                        Reset
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                title: 'Welcome to!',
                loginValidateForm: {
                    phoneNumber: '',
                    loginPassword: ''
                },
                loginValidateRule: {
                    phoneNumber: [
                        {required: true, message: '请输入账号', trigger: 'blur'}
                    ],
                    loginPassword: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                },
                loading: false,
                hasDisabled: false
            }
        },
        computed: {
            IMG_HOST(){
                return this.$store.state.IMG_HOST;
            }
        },
        methods: {
            submitLoginForm: function( formName ){
                const _v = this;
                _v.$refs[ formName ].validate( ( valid ) => {
                    if ( valid ) {
                        //login successful
                        _v.loading = true;
                        setTimeout( () =>{
                            _v.loading = false;
                            window.location = 'https://image.baidu.com/';
                        }, 3000 );
                    } else {
                        _v.$message( {
                            type: 'error',
                            message: 'Verification is not through!',
                            duration: 3000
                        } );
                    }
                } )
            },
            resetLoginForm: function( formName ){
                this.$refs[ formName ].resetFields();
            }
        },
        created() {

        }
    }
</script>
<style lang="sass" scoped>
    @import "../../sass/login.scss";
</style>