import {defineStore} from 'pinia'
import {ref,computed} from 'vue'
import type {Song} from './library'
export interface Playlist {
    id: string
    name: string
    songs: Song[]
}
export const usePlayliststore = defineStore('playlist', () => {
    const playlist = ref<Song[]>([])
    const currentIndex = ref<number>(-1)
    const addSongToPlaylist = (song: Song) => {
        playlist.value.push(song)
        if(currentIndex.value === -1){
            currentIndex.value = 0
        }
        console.log(`Song ${song.name} added to playlist.`)
    }
    function getPlaylistBySongId(songId: string): Song | undefined {
        return playlist.value.find(s => s.id === songId)
}

    function playNext(){    
    if (currentIndex.value + 1 < playlist.value.length){
         currentIndex.value ++
    }
}


function playPrevious(){
    if (currentIndex.value - 1 >= 0){
        currentIndex.value --
    }
}



function getCurrentSong(): Song | null {
  if (currentIndex.value >= 0 && currentIndex.value < playlist.value.length) {
    return playlist.value[currentIndex.value] || null
  }
  return null
}
function clearPlaylist() {
  playlist.value = []
  currentIndex.value = -1
}
const playlistCount = computed(() => playlist.value.length)
return {
        playlist,
        currentIndex,
        addSongToPlaylist,
        getPlaylistBySongId,
        playNext,
        playPrevious,
        getCurrentSong,
        clearPlaylist,
        playlistCount
    }


})