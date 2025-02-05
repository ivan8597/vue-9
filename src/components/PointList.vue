<template>
    <div class="p-4">
        <q-input v-model="search" placeholder="Search points" class="mb-4" />
        <q-virtual-scroll
            ref="virtualScroll" 
            :items="filteredPoints"
            item-size="40"
            style="max-height: 400px; overflow-y: auto;"
        >
            <template v-slot="{ item }">
                <q-item
                    :id="`point-${item.id}`"
                    :class="{ 'bg-purple-200': item.id === currentPoint?.id }" 
                    @click="selectPoint(item)"
                >
                    <q-item-section>
                        <q-checkbox
                            :model-value="isSelected(item.id)"  
                            @update:model-value="toggleSelection(item.id)"  
                            :label="item.name"
                            class="ml-2" 
                        />
                    </q-item-section>
                </q-item>
            </template>
        </q-virtual-scroll>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { usePointStore } from '../store'; 
import { QInput, QCheckbox, QItem, QItemSection, QVirtualScroll } from "quasar";

export default defineComponent({
    components: {
        QInput,
        QCheckbox,
        QItem,
        QItemSection,
        QVirtualScroll,
    },
    setup() {
        const store = usePointStore();
        const search = ref("");

        const filteredPoints = computed(() => {
            const result = store.points.filter(point =>
                point.name.toLowerCase().includes(search.value.toLowerCase())
            );
            console.log("Filtered points:", result); 
            return result;
        });

        const currentPoint = computed(() => store.currentPoint);

        const selectPoint = (point) => {
            store.setCurrentPoint(point);
        };

        const toggleSelection = (id) => {
            store.toggleSelected(id);
        };

        const isSelected = (id) => {
            return store.selectedPoints.includes(id);
        };

        if (store.points.length > 0) {
            store.setCurrentPoint(store.points[0]);
        }

        return {
            search,
            filteredPoints,
            currentPoint,
            selectPoint,
            toggleSelection,
            isSelected,
        };
    },
});
</script>

<style scoped>
.active {
  background-color: purple;
}
</style>
