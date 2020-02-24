<template>
    <div class="table-responsive">
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) of projects" :key="index" >
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                    <td>
                        <slot name="actions" :item="item" :index="index" ></slot>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {

    props: ['projects']

}
</script>

<style>

</style>