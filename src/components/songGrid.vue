<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLibraryStore } from '@/stores/library'
import type { Song } from '@/stores/library'
import songBox from '@/components/songBox.vue'
import chevronIconRight from '@/assets/icons/chevronIconRight.vue'
import chevronIconLeft from '@/assets/icons/chevronIconleft.vue'

const props = defineProps<{
    songs?: Song[]
}>()

const library = useLibraryStore()
const gridRef = ref<HTMLElement|null>(null)

const displaySongs = computed(() => props.songs || library.songs)

const scrollLeft = () => {
    if (gridRef.value) {
        const start = gridRef.value.scrollLeft
        const target = start - 408
        const duration = 400
        const startTime = performance.now()
        
        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2
            
            gridRef.value!.scrollLeft = start + (target - start) * easeProgress
            
            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }
        
        requestAnimationFrame(animate)
    }
}

const scrollRight = () => {
    if (gridRef.value) {
        const start = gridRef.value.scrollLeft
        const target = start + 408
        const duration = 400
        const startTime = performance.now()
        
        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2
            
            gridRef.value!.scrollLeft = start + (target - start) * easeProgress
            
            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }
        
        requestAnimationFrame(animate)
    }
}
</script>

<template>
    <div class="gridContainer">
        <button @click="scrollLeft" class="scrollBtn scrollBtnLeft">
            <chevronIconLeft />
        </button>
    
        <div class="songsGrid" ref="gridRef">
            <songBox 
                v-for="song in displaySongs"
                :key="song.id"
                :song="song"
                class="songCard"
            />
        </div>
    
        <button @click="scrollRight" class="scrollBtn scrollBtnRight">
            <chevronIconRight />
        </button>
    </div>
</template>

<style scoped>
.gridContainer {
    position: relative;
    width: 96%;
    margin: 10px;
}

.songsGrid {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 180px;
    background-color: var(--color-primary);
    justify-content: left;
    width: 100%;
    padding: 24px;
    gap: 24px;
    border-radius: 8px;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.songsGrid::-webkit-scrollbar {
    display: none;
}

.scrollBtn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: var(--color-bg-secondary);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    z-index: 10;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.scrollBtn:hover {
    background-color: var(--color-primary);
}

.scrollBtnLeft {
    left: 12px;
}

.scrollBtnRight {
    right: 12px;
}
</style>