<template>
    <div>
        <PublicNav></PublicNav>
        <transition>
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
    import PublicNav from '@/views/components/PublicNav';

    export default {
        components: {
            PublicNav
        },
        data() {
            return {

            };
        },
        mounted() {

        }
    }
</script>
<style lang="sass">
    @import "../sass/resetH5.scss";
    @import '../theme-default/index.css';
</style>