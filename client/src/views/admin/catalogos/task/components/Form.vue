<template>
    <div class="form-group">
        <div class="form-row">
            <label >Name</label>
            <input v-model="project.name" type="text" class="form-control form-control-sm">
            <span v-if="errors.name" >{{ errors.name[0] }}</span>
        </div>
        <div class="form-row">
            <label >Description</label>
            <textarea v-model="project.description" rows="5" class="form-control form-control-sm"></textarea>
            <span v-if="errors.description" >{{ errors.description[0] }}</span>
        </div>
    </div>
</template>

<script>
export default {

    props: [
        'project',
        'errors'
    ]

}
</script>

<style>

</style>