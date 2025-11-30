<script setup lang="ts">
import { computed } from 'vue'
import { useLibraryStore } from '@/stores/library'
import { usePlayerStore } from '@/stores/player'
import type { Song } from '@/stores/library'
import playIcon from '@/assets/icons/playIcon.vue'
import pauseIcon from '@/assets/icons/pauseIcon.vue'

const props = defineProps<{
    song: Song
}>()

const library = useLibraryStore()
const playerStore = usePlayerStore()

const artist = computed(() => library.getArtistById(props.song.artistId))

const isPlaying = computed(() =>
  playerStore.currentTrack?.id === props.song.id && playerStore.isPlaying
)

function togglePlay() {
  if (playerStore.currentTrack?.id === props.song.id) {
    playerStore.togglePlayPause()
  } else {
    playerStore.play(props.song)
  }
}

function formatDuration(seconds?: number) {
  if (!seconds) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
</script>

<template>
    <div class="songContainer">
        <div class="songPicture">
            <img :src="song.image" :alt="song.name" class="songImage">
            <button class="playButton" @click="togglePlay">
              <component :is="isPlaying ? pauseIcon : playIcon" />
            </button>
        </div>

        <div class="songInfo">
            <h1 class="songTitle">{{ song.name }}</h1>
            
            <div class="artistInfo">
                <img v-if="artist" :src="artist.image" :alt="artist.name" class="artistImage">
                <div class="artistDetails">
                    <p class="artistLabel">Artist</p>
                    <h2 v-if="artist" class="artistName">{{ artist.name }}</h2>
                </div>
            </div>

            <div class="songDetails">
                <p v-if="song.album"><strong>Album:</strong> {{ song.album }}</p>
                <p v-if="song.duration"><strong>Duration:</strong> {{ formatDuration(song.duration) }}</p>
            </div>

            <p v-if="artist" class="artistBio">{{ artist.bio }}</p>
        </div>
    </div>
</template>

<style scoped>
.songContainer {
    display: flex;
    gap: 40px;
    padding: 40px;
    background: var(--color-bg-secondary);
    border-radius: 12px;
}

.songPicture {
    position: relative;
    flex-shrink: 0;
}

.songImage {
    width: 300px;
    height: 300px;
    border-radius: 12px;
    object-fit: cover;
}

.playButton {
    position: absolute;
    bottom: 16px;
    right: 16px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: var(--color-primary);
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    z-index: 10;
}

.playButton:hover {
    background-color: var(--color-accent);
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(201, 76, 50, 0.4);
}

.playButton svg {
    width: 28px;
    height: 28px;
}

.songInfo {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.songTitle {
    font-size: 48px;
    font-weight: 700;
    margin: 0 0 24px 0;
    color: var(--color-text);
}

.artistInfo {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
    background: var(--color-primary);
    border-radius: 12px;
    margin-bottom: 24px;
}

.artistImage {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
}

.artistDetails {
    flex: 1;
}

.artistLabel {
    font-size: 12px;
    color: var(--color-text-secondary);
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.artistName {
    font-size: 28px;
    font-weight: 700;
    margin: 4px 0 0 0;
    color: var(--color-text);
}

.songDetails {
    margin-bottom: 24px;
}

.songDetails p {
    font-size: 16px;
    color: var(--color-text);
    margin: 8px 0;
}

.artistBio {
    font-size: 16px;
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin: 0;
}
</style>