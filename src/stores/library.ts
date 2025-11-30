import { defineStore } from 'pinia'
import { ref,watchEffect } from 'vue'


export interface Artist {
  id: string
  name: string
  image: string
  bio?: string
}  

export interface Song {
  id: string
  name: string
  image: string
  artistId: string
  duration?: number
  album?: string
}
export const useLibraryStore = defineStore('library',()=>{
  const Artists = ref<Artist[]>([
    {
      id: '1',
      name: 'The Weeknd',
      image: 'https://placeholder.com/300?text=The+Weeknd',
      bio: 'Canadian singer, songwriter, and record producer'
    },
    {
      id: '2',
      name: 'Drake',
      image: 'https://placeholder.com/300?text=Drake',
      bio: 'Canadian rapper and singer'
    },
    {
      id: '3',
      name: 'Travis Scott',
      image: 'https://placeholder.com/300?text=Travis+Scott',
      bio: 'American rapper and record producer'
    }
    
  
    ]
  )

  const songs = ref<Song[]>([
        {
      id: 'song1',
      name: 'Blinding Lights',
      image: 'https://variety.com/wp-content/uploads/2025/05/GettyImages-2214361797.jpg?w=1000&h=667&crop=1',
      artistId: '1',
      duration: 200,
      album: 'After Hours'
    },
    {
      id: 'song2',
      name: 'Starboy',
      image: 'https://variety.com/wp-content/uploads/2025/05/GettyImages-2214361797.jpg?w=1000&h=667&crop=1',
      artistId: '1',
      duration: 230,
      album: 'Starboy'
    },
    {
      id: 'song3',
      name: 'One Dance',
      image: 'https://cdn.britannica.com/34/258834-050-9E9EF435/rapper-drake-performs-on-stage-during-lil-baby-and-friends-birthday-celebration-2022.jpg',
      artistId: '2',
      duration: 213,
      album: 'Views'
    },
    {
      id: 'song4',
      name: 'Hotline Bling',
      image: 'https://www.billboard.com/wp-content/uploads/2025/08/drake-wireless-festival-london-night-1-2025-billboard-1800.jpg?w=1024',
      artistId: '2',
      duration: 246,
      album: 'Views'
    },
    {
      id: 'song5',
      name: 'SICKO MODE',
      image: 'https://s.hdnux.com/photos/01/36/24/51/24726083/3/ratio3x2_1920.jpg',
      artistId: '3',
      duration: 312,
      album: 'Astroworld'
    }
  ])
const searchQuery = ref('')
  const searchResults = ref<Song[]>([])

  watchEffect(() => {
    if (searchQuery.value.trim() === '') {
      searchResults.value = []
    } else {
      const query = searchQuery.value.toLowerCase()
      searchResults.value = songs.value.filter(song => {
        const songNameMatch = song.name.toLowerCase().includes(query)
        const artist = getArtistById(song.artistId)
        const artistNameMatch = artist?.name.toLowerCase().includes(query)
        return songNameMatch || artistNameMatch
      })
    }
  })

function getSongById(id: string) {
    return songs.value.find(song => song.id === id)
  }

  function getArtistById(id: string) {
    return Artists.value.find(artist => artist.id === id)
  }

  function getSongsByArtist(artistId: string) {
    return songs.value.filter(song => song.artistId === artistId)
  }
  function setSearchQuery(query: string) {
    searchQuery.value = query
  }
  function clearSearch() {
    searchQuery.value = ''
    searchResults.value = []
  }

    return {songs, getSongById, getArtistById, getSongsByArtist, Artists,searchQuery,searchResults, setSearchQuery,clearSearch  }
})