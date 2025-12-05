<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router' 
import { useLibraryStore } from '@/stores/library'
import songCard from '@/components/songBox.vue'  
import songGrid from '@/components/songGrid.vue'
import sideBar from '@/components/sideBar.vue'

const route = useRoute() 
const library = useLibraryStore()



const choosenSong = computed(() => {
  const id = route.params.id as string
  return library.getSongById(id)
})

const artist = computed(() => 
  choosenSong.value ? library.getArtistById(choosenSong.value.artistId) : null
)

const artistSongs = computed(() => 
  choosenSong.value ? library.getSongsByArtist(choosenSong.value.artistId).filter(s => s.id !== choosenSong.value?.id) : []
)

</script>

<template>
    <div class="home">
        <sideBar />
        
        <div class="content">
            
            <div v-if="choosenSong && artist">
                <songCard :song="choosenSong" />
                
                <h2 v-if="artistSongs.length > 0">
                  More from {{ artist.name }}</h2>
                <songGrid :songs="artistSongs" />
                
                <h2>You might also like</h2>
                <songGrid :songs="[]" />
            </div>
            
            <div v-else class="error">
                <h2>Song not found</h2>
                <p>The song you're looking for doesn't exist.</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.home {
  padding: 0 24px;
}

.content {
  margin-left: 110px;
  padding-top: 100px;
  padding-bottom: 20px;
}

h2 {
  color: var(--color-text-secondary); 
  font-size: 24px;
  margin: 32px 0 16px 0;
  font-weight: 700;
}

.error {
  text-align: center;
  padding: 40px;
  color: var(--color-text);
}

.error h2 {
  margin-bottom: 8px;
}

.error p {
  color: var(--color-text-secondary);
}
</style>