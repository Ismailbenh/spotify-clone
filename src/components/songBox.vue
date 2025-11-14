<script setup lang="ts">
import type { Song } from '@/stores/library'
defineProps<{
    song:Song
}>()
</script>

<template>
    <div class="songCard">
        <img :src="song.image" :alt="song.name" class="songImage">
        <div>
            <h3 class="songName">{{ song.name }}</h3>
        </div>
    </div>
</template>
<style scoped>
.songCard {
    display: flex;
    flex-direction: column;
    align-items: center;  /* Changed from center to flex-start */
    padding: 12px;  /* Reduced padding */
    background-color: var(--color-bg-secondary);
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s;
    width: 100%;  /* Changed from fixed width to responsive */
    max-width: 180px;  /* Added max-width instead of fixed width */
    
}

.songCard:hover {
    background: var();
}

.songImage {
    width: 100%;  /* Make image responsive */
    aspect-ratio: 1;  /* Maintain square ratio */
    border-radius: 8px;
    object-fit: cover;
    
    margin-bottom: 8px;  /* Reduced margin */
}

.songInfo {
    width: 100%;
}

.songName {
    font-size: 16px;  /* Slightly reduced font size */
    font-weight: 700;
    margin: 0;  /* Removed all margins */
    color: var(--color-text);
}
</style>
