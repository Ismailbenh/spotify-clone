import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Song } from './library'

export const usePlayerStore = defineStore('player', () => {
  const currentTrack = ref<Song | null>(null)
  const isPlaying = ref(false)
  const playlist = ref<Song[]>([])
  const currentIndex = ref(0)

  function play(song: Song) {
    currentTrack.value = song
    isPlaying.value = true
    console.log('Now playing:', song.name)
  }

  function pause() {
    isPlaying.value = false
  }

  function togglePlayPause() {
    if (currentTrack.value) {
      isPlaying.value = !isPlaying.value
    }
  }

  function stop() {
    currentTrack.value = null
    isPlaying.value = false
  }

  function setPlaylist(songs: Song[]) {
    playlist.value = songs
  }

  return {
    currentTrack,
    isPlaying,
    playlist,
    currentIndex,
    play,
    pause,
    togglePlayPause,
    stop,
    setPlaylist
  }
})