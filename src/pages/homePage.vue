<script setup lang="ts">
import { ref } from 'vue'
import {useLibraryStore} from '@/stores/library'
import songGrid from '@/components/songGrid.vue'
import sideBar from '@/components/sideBar.vue'

const library = useLibraryStore() 

</script>






<template>
  
    <div class="home">
        <sideBar />
        
            <div class="content">
              
                <h2>Your fav song</h2>
                <songGrid />
                <h2>Popular</h2>
                <songGrid />
                <h2>Popular</h2>
                <songGrid />
                <h2>Popular</h2>
                <songGrid />
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