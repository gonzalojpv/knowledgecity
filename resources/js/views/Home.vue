<template>
    <section class="home">
        <div class="container">
            <div class="row">
                <div class="col">
                    <h2 class="text-center">User List</h2>
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <hr>
                </div>
            </div>
        </div>

        <Footer/>
    </section>
</template>

<script>
    import Footer from '../components/Footer'

    export default {
        components: {
            Footer,
        }
    }
</script>

<style lang="scss" scoped>
    section.home {
        padding-top: 3rem;
    }
</style>
