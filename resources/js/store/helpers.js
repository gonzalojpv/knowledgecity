import { mapState, mapGetters, mapActions } from 'vuex'

export const authComputed = {
    ...mapState('auth', {
        currentUser: state => state.currentUser,
    }),
    ...mapGetters('auth', ['loggedIn', 'getCurrentUser']),
};

export const authMethods = mapActions('auth', ['logIn', 'logOut', 'signUp',]);
