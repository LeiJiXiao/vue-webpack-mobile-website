<template>
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1"><router-link to="/index">首页</router-link></el-menu-item>
        <el-menu-item index="2"><router-link to="/timer">时间</router-link></el-menu-item>
        <el-menu-item index="3"><router-link to="/login">登录</router-link></el-menu-item>
    </el-menu>
</template>
<script>
    export default {
        data() {
            return {
                activeIndex: '1',
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>