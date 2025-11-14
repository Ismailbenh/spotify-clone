<script setup lang="ts">
import { ref, computed } from 'vue'
import playIcon from '@/assets/icons/playIcon.vue'
import pauseIcon from '@/assets/icons/pauseIcon.vue'
import type { Song } from '@/stores/library'
import { usePlayerStore } from '@/stores/player'

const props = defineProps<{
    song: Song
}>()

const playerStore = usePlayerStore()

const isCurrentSongPlaying = computed(() => 
  playerStore.currentTrack?.id === props.song.id && playerStore.isPlaying
)

function togglePlay(event: Event) {
  event.stopPropagation()
  
  if (playerStore.currentTrack?.id === props.song.id) {
    // Same song - toggle play/pause
    playerStore.togglePlayPause()
  } else {
    // Different song - play new song
    playerStore.play(props.song)
  }
}
</script>

<template>
    <div class="songCard">
        <div class="imageContainer">
            <img :src="song.image" :alt="song.name" class="songImage">
            <transition name="playButtonFade">
              <button 
                v-if="playerStore.currentTrack?.id === song.id || true"
                class="playButton"
                @click="togglePlay"
                :class="{ 'playing': isCurrentSongPlaying }"
                :aria-label="isCurrentSongPlaying ? 'Pause' : 'Play'"
              >
                <component :is="isCurrentSongPlaying ? pauseIcon : playIcon" />
              </button>
            </transition>
        </div>
        <div class="songInfo">
            <h3 class="songName">{{ song.name }}</h3>
        </div>
    </div>
</template>

<style scoped>
.songCard {
    display: flex;
    flex-direction: column;
    padding: 12px;
    background-color: var(--color-bg-secondary);
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 100%;
    max-width: 180px;
}



.imageContainer {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    margin-bottom: 8px;
    border-radius: 8px;
    overflow: hidden;
}

.songImage {
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    border-radius: 8px;
    object-fit: cover;
}

.playButton {
    position: absolute;
    top: 80%;
    left: 80%;
    transform: translate(-50%, -50%);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: var(--color-primary);
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.2s ease;
    z-index: 10;
    font-weight: 600;
}

.playButton:hover {
    background-color: var(--color-bg-secondary);
    transform: translate(-50%, -50%) scale(1.15);
    box-shadow: 0 4px 12px rgba(201, 76, 50, 0.4);
}

.playButton:active {
    transform: translate(-50%, -50%) scale(1.05);
}

.playButton.playing {
    opacity: 1;
    background-color: var(--color-primary);
}

.playButton.playing:hover {
    background-color: var(--color-bg-secondary);
}

.songCard:hover .playButton {
    opacity: 1;
}

.playButton svg {
    width: 24px;
    height: 24px;
}

.songInfo {
    width: 100%;
}

.songName {
    font-size: 14px;
    font-weight: 600;
    margin: 0;
    color: var(--color-text);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

/* Fade animations for button appearance/disappearance */
.playButtonFade-enter-active,
.playButtonFade-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.playButtonFade-enter-from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
}

.playButtonFade-leave-to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
}
</style>