<template>
    <footer>
        <div class="container">
            <div class="row">
                <div class="col text-center">
                    <router-link
                        :to="{name: 'logout'}">Log Out</router-link>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>
    @import '../../../sass/_variables';

    footer {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        background-color: map-get($theme-colors, gray);

        a {
            color: map-get($theme-colors, dark);
            text-decoration: none;
            position: relative;
            font-weight: 400;

            &::before {
                content: " ";
                background-image: url("../../../images/logout.svg");
                height: 1.5rem;
                width: 2rem;
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
                display: inline-block;
                position: relative;
                top: 5px;
            }

            &:hover {
                color: map-get($theme-colors, dark);
                text-decoration: none;
                bottom: -1px;
            }
        }
    }
</style>
