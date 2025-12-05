<script setup lang="ts">
import { ref, onMounted ,computed } from 'vue'
import { useLibraryStore } from '@/stores/library'
import type { Song } from '@/stores/library'
import songGrid from '@/components/songGrid.vue'
import sideBar from '@/components/sideBar.vue'
import { usePlayliststore } from '@/stores/playlist'

const eminemSongs = ref<Song[]>([])
const travisscootSongs = ref<Song[]>([])
const szaSongs = ref<Song[]>([])
const drakeSongs = ref<Song[]>([])
const library = useLibraryStore() 
const playlistStore = usePlayliststore()

const playlistCount = computed(() => playlistStore.playlist.length)
onMounted(async()=>{
    await library.fetchSongsFromDeezer('eminem')  
    eminemSongs.value = library.songs
    
    await library.fetchSongsFromDeezer('travisscoot')  
    travisscootSongs.value = library.songs
    
    await library.fetchSongsFromDeezer('sza')  
    szaSongs.value = library.songs
    
    await library.fetchSongsFromDeezer('drake')  
    drakeSongs.value = library.songs
})
</script>




<template>
   
    <div class="home">
        <sideBar />
        
            <div class="content">
      
      
      
      <!-- Show error state -->
      <div v-if="library.error" class="error">{{ library.error }}</div>
      
      <!-- Show songs -->
      <div v-if="!library.isLoading && library.songs.length > 0">
        <h2>drake</h2>
        <songGrid :songs="drakeSongs" />
        <h2>eminem</h2>
        <songGrid :songs="eminemSongs" />
        
        <h2>travis</h2>
        <songGrid :songs="travisscootSongs" />
        
        <h2>kendrick</h2>
        <songGrid :songs="szaSongs" />
        
        
      </div>
    </div>
           
    </div>
    
</template>







<style scoped>

.home {
  padding: 0 24px;
  position:relative;
  
}

/* make room for the fixed sidebar so grids appear to its right */
.content {
  /* sidebar is positioned at left:60px with width:60px → right edge ~120px
     add a small gap so content doesn't touch the sidebar */
  margin-left: 110px;
  padding-top: 100px;
  padding-bottom: 20px;
}

h2 {
  color:var(--color-text-secondary); 
  font-size: 24px;
  margin: 9px 0;
  font-weight: 700;
}</style>