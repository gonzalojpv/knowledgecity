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
                    <vuetable ref="vuetable"
                        :fields="fields"
                        :api-mode="false"
                        :data="getAllStudents"
                    >
                        <div slot="first_name" slot-scope="props">
                            <h6>{{ props.rowData.username }}</h6>
                            <small>{{ props.rowData.first_name + ' ' + props.rowData.last_name }}</small>
                        </div>
                        <div slot="email" slot-scope="props">
                            <h6>...</h6>
                            <small>Default group</small>
                        </div>
                    </vuetable>
                </div>
            </div>
        </div>

        <Footer/>
    </section>
</template>

<script>
    import Footer from '../components/Footer'
    import Vuetable from 'vuetable-2'
    import { studentComputed, studentMethods } from '../store/helpers'

    export default {
        components: {
            Footer,
            Vuetable
        },
        data() {
            return {
                items: [],
                fields: [
                    {
                        name: 'id',
                        title: '#'
                    },
                    {
                        name: 'first_name',
                        title: 'Name'
                    },
                    {
                        name: 'email',
                        title: ' '
                    }
                ],
            }
        },
        created() {
            this.fetchStudents().then( (response) => {
                console.log(response);
            });
        },
        computed: {
            ...studentComputed,
        },
        methods: {
            ...studentMethods,
        }
    }
</script>

<style lang="scss" scoped>
    section.home {
        padding-top: 3rem;
    }
</style>
