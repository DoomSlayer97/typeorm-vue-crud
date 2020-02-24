<template>
    <div>
        <div class="row">
            <div class="col-md-10">
                <h3>Project Catalog</h3>
            </div>
            <div class="col-md-2 text-right">
                <button-component 
                    @click="openNew()"
                    clase="btn btn-primary" >New +</button-component>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-12">
                <crud-table 
                    :projects="projects"
                >
                    <template v-slot:actions="{ item }" >
                        <button-component @click="deleteProject(item.id)" clase="btn btn-sm btn-outline-danger mr-1" >Delete</button-component>
                        <button-component @click="findOneProject(item.id)" clase="btn btn-sm btn-outline-info mr-1" >Edit</button-component>
                        <button-component clase="btn btn-sm mr-1" >Tasks</button-component>
                    </template>
                </crud-table>
            </div>
        </div>

        <b-modal v-model="modalshow" 
            :title="modalTittle" >
            
            <template v-slot:modal-footer >
                <button-component @click="modalshow = false" clase="btn" >Close</button-component>
                <button-component clase="btn btn-primary"
                    @click="createProject()"
                    :loading="loadingSave"
                 >{{ buttonModalSave }}</button-component>
            </template>
            
            <div class="row">
                <div v-if="!loadingModal" class="col-md-12">
                    <task-form 
                        :project="project"
                        :errors="errors"
                    ></task-form>
                </div>
                <div v-else class="col-md-12 text-center mb-5 mt-5" >
                    <spinner-component/>
                </div>
                
            </div>


        </b-modal>

    </div>
</template>

<script>

import CrudTable from './components/Table.vue'
import TaskForm from './components/Form.vue'

export default {

    components: {
        CrudTable,
        TaskForm
    },

    data() {
        return {

            modalshow: false,
            loadingSave: false,
            loadingModal: false,
            isNew: true,
            idUser: 1,
            

            projects: [],

            currentProject: "",

            errors: {},
            project: {
                name: "",
                description: "",
            }

        }
    },

    methods: {

        openNew() {

            if(!this.isNew) {

                this.cleanProject();
                this.isNew = true;

            }

            this.modalshow = true;

        },

        cleanProject() {

            this.project.name = "";
            this.project.description = "";

        },

        getProjects: function() {

            this.$http.get(
                '/projects/all/' + this.idUser
            ).then( res => {

                this.projects = res.data.projects;

            });

        },

        findOneProject: function(id) {

            this.isNew = false;
            this.loadingModal = true;
            this.modalshow = true;

            this.$http.get(
                'projects/findone/' + id
            ).then( res => {

                let findedProject = res.data.project;

                this.project.name = findedProject.name;
                this.project.description = findedProject.description;

                this.loadingModal = false;

            });

        },

        createProject: function() {

            this.loadingSave = true;
            
            let newProject = {
                name: this.project.name,
                description: this.project.description,
                idUser: this.idUser
            };

            this.$http.post(
                'projects',
                newProject
            ).then( res => {

                this.getProjects();
                this.cleanProject();
                
                this.errors = [];
                this.loadingSave = false;
                this.modalshow = false;

            }).catch( err => {

                this.errors = err.response.data.errors;
                this.loadingSave = false;

            });

        },

        deleteProject: function(id) {

            this.$http.delete(
                'projects/' + id,
            ).then( res => {

                this.getProjects();

            });

        },

        updateProject: function() {

            this.loadingSave = true;
            
            let newProject = {
                name: this.project.name,
                description: this.project.description,
                idUser: this.idUser
            };

            this.$http.put(
                ''
            ).then( res => {

            });

        }

    },

    computed: {

        modalTittle: function() {

            if(this.isNew)
                return 'Create new project';
            
            return 'Edit the project';

        },

        buttonModalSave: function() {

            if(this.isNew)
                return 'Create';
            
            return 'Save';

        }

    },

    created() {

        this.getProjects();

    }

}
</script>

<style>

</style>