<template>
    <section class="section-login">
        <div class="overlay-bg"></div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-sm-4">
                    <FormLogin/>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import FormLogin from '../components/FormLogin'

    export default {
        components: {
            FormLogin,
        }
    }
</script>

<style lang="scss">
    .section-login {
        padding-top: 4rem;
        position: relative;
    }
</style>
