import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Song } from './library'

export const usePlayerStore = defineStore('player', () => {
  const currentTrack = ref<Song | null>(null)
  const isPlaying = ref(false)
  const currentTime = ref(0)
  const duration = ref(0)
  const audio = new Audio()

  // Handle audio events
  audio.addEventListener('timeupdate', () => {
    currentTime.value = audio.currentTime
  })

  audio.addEventListener('loadedmetadata', () => {
    duration.value = audio.duration
  })

  audio.addEventListener('ended', () => {
    isPlaying.value = false
  })

  function play(song: Song) {
    if (currentTrack.value?.id !== song.id) {
      audio.src = song.audioUrl || ''
      currentTrack.value = song
    }
    audio.play()
    isPlaying.value = true
  }

  function pause() {
    audio.pause()
    isPlaying.value = false
  }

  function togglePlayPause() {
    if (isPlaying.value) {
      pause()
    } else {
      audio.play()
      isPlaying.value = true
    }
  }

  function stop() {
    audio.pause()
    audio.currentTime = 0
    currentTrack.value = null
    isPlaying.value = false
  }

  return {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    play,
    pause,
    togglePlayPause,
    stop
  }
})