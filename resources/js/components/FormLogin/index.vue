<template>
    <div class="form-login">
        <form @submit.prevent="tryToLogIn">
            <div class="text-center">
                <div class="logo">
                </div>
                <div class="error-message" v-text="authError"></div>
            </div>

            <div class="form-group">
                <i class="icon-user"></i>
                <input
                    type="text"
                    class="form-control"
                    v-model="username"
                    required
                    placeholder="Username">
            </div>

            <div class="form-group">
                <i class="icon-password"></i>
                <input
                    type="password"
                    class="form-control"
                    v-model="password"
                    equired
                    placeholder="Password">
            </div>

            <div class="form-group login-options">
                <div class="row">
                    <div class="col-sm-6">
                        <label class="checkbox-inline">
                            <input type="checkbox" class="styled" checked="checked">
                            Remember me
                        </label>
                    </div>

                    <div class="col-sm-6 text-right">
                    </div>
                </div>
            </div>

            <div class="form-group">
                <button
                    type="submit"
                    :disabled="tryingToLogIn"
                    class="btn btn-block">
                    {{ submit }}
                    <i class="icon-next"></i>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
    import {
        authMethods,
        authComputed
    } from '../../store/helpers';

    export default {
        data() {
          return {
            submit        : 'Log In',
            username         : null,
            password      : null,
            authError     : null,
            tryingToLogIn : false,
          };
        },
        computed: {
            ...authComputed,
        },
        methods: {
            ...authMethods,
            tryToLogIn() {
                this.tryingToLogIn = true;
                this.authError = null;
                this.submit = 'Authenticating...';

                this.logIn({
                    email: this.email,
                    password: this.password,
                }).then((response) => {
                    if (response.success) {
                        this.$router.push({ name: 'home'});
                    }
                }).catch(error => {
                    this.tryingToLogIn = false;
                    this.submit = 'Login';

                    if (error.response) {
                        this.authError = error.response.data.message;
                    }
                    else {
                        this.authError = 'Lo sentimos ocurrio un error.';
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../../sass/_variables';


    div.logo {
        background-image: url("../../../images/Logo.svg");
        height: 5rem;
        position: relative;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        margin-bottom: 1rem;
    }

    div.form-login {
        input[type="password"],
        input[type="text"] {
            font-weight: 600;
            -webkit-appearance: none;
            border-radius: 20px;
            border-width: 1px;
            border-color: #808080;
            padding-left: 2rem;
        }

        .icon-password,
        .icon-user,
        .icon-next {
            background-image: url("../../../images/password.svg");
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
            height: 2rem;
            width: 2rem;
            position: absolute;
            left: 1.2rem;
        }

        .icon-user {
            background-image: url("../../../images/user.svg");
        }

        .icon-next {
            background-image: url("../../../images/next.svg");
            height: 1.5rem;
            width: 2rem;
            right: 1rem;
            left: unset;
            filter: invert(95%) sepia(0%) saturate(7500%) hue-rotate(112deg) brightness(107%) contrast(107%);
        }

        input[type="text"]:focus,
        input[type="submit"]:focus,
        input[type="checkbox"]:focus {
          outline: 0;
        }

        .form-control {
            -webkit-box-shadow: none;
            box-shadow: none;

            &:focus {
                outline: 0;
                -webkit-box-shadow: none;
                box-shadow: none;
            }
        }

        .btn {
            color: white;
            border-radius: 20px;
            background-color: map-get($theme-colors, primary);
            position: relative;
            text-align: left;
            font-weight: 300;

            &:hover {
                bottom: -1px;
            }
        }
    }
</style>
