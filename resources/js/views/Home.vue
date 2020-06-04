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
                    <vuetable ref="vuetable"
                        :fields="fields"
                        :api-mode="false"
                        :data="getAllStudents">
                        <div slot="id" slot-scope="props">
                            <i class="icon-checked"></i>
                        </div>
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

            <div class="row">
                <div class="col text-center">
                    <nav aria-label="Page navigation" class="m-auto">
                        <ul class="pagination">
                            <li
                                class="page-item"
                                v-if="pagination.current_page > 1">
                                <a
                                    href="javascript:void(0)"
                                    aria-label="Previous"
                                    class="page-link"
                                    v-on:click.prevent="changePage(pagination.current_page - 1)">
                                    <span aria-hidden="true">«</span>
                                </a>
                            </li>
                            <li
                                class="page-item"
                                v-for="(page, index) in pagesNumber"
                                :key="index"
                                :class="{'active': page == pagination.current_page}">
                                <a
                                    href="javascript:void(0)"
                                    class="page-link"
                                    v-on:click.prevent="changePage(page)">{{ page }}</a>
                            </li>
                            <li
                                class="page-item"
                                v-if="pagination.current_page < pagination.last_page">
                                <a
                                    href="javascript:void(0)"
                                    aria-label="Next"
                                    class="page-link"
                                    v-on:click.prevent="changePage(pagination.current_page + 1)">
                                    <span aria-hidden="true">»</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
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
                pagesNumber: 10,
                pagination: {
                    current_page: 1,
                    last_page: 5,
                },
                items: [],
                fields: [
                    {
                        name: 'id',
                        title: ''
                    },
                    {
                        name: 'first_name',
                        title: ''
                    },
                    {
                        name: 'email',
                        title: ''
                    }
                ],
            }
        },
        created() {
            this.fetchStudents({}).then( (response) => {
                console.log(response);
            });
        },
        computed: {
            ...studentComputed,
        },
        methods: {
            ...studentMethods,
            changePage(page) {
                this.pagination.current_page = page;
                this.fetchStudents({ page: this.pagination.current_page }).then( (response) => {
                    console.log(response);
                });
            },
            onPaginationData(paginationData) {
                this.$refs.pagination.setPaginationData(paginationData)
            }
        }
    }
</script>

<style lang="scss" scoped>
    section.home {
        padding-top: 3rem;

        .icon-checked {
            background-image: url(../../images/correct.svg);
            height: 1rem;
            width: 1rem;
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
            display: inline-block;
            float: right;
        }
    }
</style>
