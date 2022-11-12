export default {
    data() {
        return {
            gColor: 'red',
            errorUrl: require('@/assets/error.png')
        }
    },
    methods: {
        // 图片显示不出来事件
        imgError(e) {
            console.log(e);
            e.target.src = this.errorUrl
        },

        // 全局的取反事件
        clickToggle() {
            if (!this.$store.state.userModules.showLogin) {
                this.$toast('请先登录')
                setTimeout(() => {
                    this.$router.push('/register')
                }, 350)
                return false
            }

            return true
        }
    },
}