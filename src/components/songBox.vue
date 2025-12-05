<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'  
import { useLibraryStore } from '@/stores/library'
import { usePlayerStore } from '@/stores/player'
import { usePlayliststore } from '@/stores/playlist'
import type { Song } from '@/stores/library'
import playIcon from '@/assets/icons/playIcon.vue'
import pauseIcon from '@/assets/icons/pauseIcon.vue'

const props = defineProps<{
    song: Song
}>()

const router = useRouter() 
const library = useLibraryStore()
const playerStore = usePlayerStore()
const playlistStore = usePlayliststore()
const artist = computed(() => library.getArtistById(props.song.artistId))
const isPlaying = computed(() =>
  playerStore.currentTrack?.id === props.song.id && playerStore.isPlaying
)

//Add stopPropagation to prevent card click when clicking play
function togglePlay(event: Event) {
  event.stopPropagation()  
  if (playerStore.currentTrack?.id === props.song.id) {
    playerStore.togglePlayPause()
  } else {
    playerStore.play(props.song)
  }
}
function addsongToPlaylist(event: Event) {
    event.stopPropagation()
  playlistStore.addSongToPlaylist(props.song)
}
function navigateToSong() {
  router.push({ name: 'song', params: { id: props.song.id } })
}

function handleImageError(event: Event) {
  const img = event.target as HTMLImageElement
  img.src = `https://placehold.co/200x200/1a1a1a/ffffff?text=${encodeURIComponent(props.song.name)}`
}

function formatDuration(seconds?: number) {
  if (!seconds) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
</script>

<template>
    <div class="songCard" @click="navigateToSong">
        <div class="imageContainer">
            <img 
                :src="song.image" 
                :alt="song.name" 
                class="songImage"
                @error="handleImageError"
            >
            <button class="playButton" @click="togglePlay">
              <component :is="isPlaying ? pauseIcon : playIcon" />
            </button>
            <button class="addButton" @click="addsongToPlaylist">
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
</button>
        </div>
        <div class="songInfo">
            <h3 class="songTitle">{{ song.name }}</h3>
            <p class="artistName">{{ artist?.name }}</p>
            <p class="duration">{{ formatDuration(song.duration) }}</p>
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
.songTitle {
    
    
    color: var(--color-text);
    
}
.playButton:hover {
    background-color: var(--color-bg-secondary);
    transform: translate(-50%, -50%) scale(1.15);
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.4);
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

.artistName {
    font-size: 12px;
    color: var(--color-text-secondary);
    margin: 4px 0;
}

.duration {
    font-size: 13px;
    color: var(--color-text);
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
.button {
    margin-top: 8px;
    padding: 6px 12px;
    background-color: var(--color-accent);
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
}
.addButton {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.6);
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.2s ease;
    z-index: 10;
}

.addButton:hover {
    background-color: var(--color-primary);
    transform: scale(1.1);
}

.songCard:hover .addButton {
    opacity: 1;
}
</style>