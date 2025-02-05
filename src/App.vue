<template>
    <div>
        <PointList />
        <PointForm />
    </div>
</template>

<script lang="ts">
import PointList from './components/PointList.vue';
import PointForm from './components/PointForm.vue';

export default {
    components: {
        PointList,
        PointForm,
    },
};
</script>