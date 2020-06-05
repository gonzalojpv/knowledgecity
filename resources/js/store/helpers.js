import { mapState, mapGetters, mapActions } from 'vuex'

export const authComputed = {
    ...mapState('auth', {
        currentUser: state => state.currentUser,
    }),
    ...mapGetters('auth', ['loggedIn', 'getCurrentUser']),
};

export const authMethods = mapActions('auth', ['logIn', 'logOut', 'signUp',]);

/* student */
export const studentComputed = {
    ...mapGetters('student', ['getAllStudents']),
    ...mapState('student', ['students']),
};

export const studentMethods = mapActions('student', ['fetchStudents',]);
