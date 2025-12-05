import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'

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
  audioUrl?: string
}

export const useLibraryStore = defineStore('library', () => {
  const Artists = ref<Artist[]>([])
  const songs = ref<Song[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const searchQuery = ref('')
  const searchResults = ref<Song[]>([])

  
  async function fetchSongsFromDeezer(query: string) {
    console.log('========================================')
    console.log('Fetching from Deezer for query:', query)
    
    isLoading.value = true
    error.value = null
    
    try {
      // Map queries to search terms
      const searchMap: Record<string, string> = {
        'eminem': 'eminem',
        'kanye': 'kanye west',
        'jay-z': 'jay-z',
        'drake': 'drake',
        'travisscoot': 'travis scott',
        'nicki': 'nicki minaj',
        'sza': 'sza',
        'juice': 'juice wrld',
        'lil': 'lil baby',
      }
      
      const searchTerm = searchMap[query.toLowerCase()] || query
      const url = `https://api.deezer.com/search?q=${encodeURIComponent(searchTerm)}&limit=10`
      
      console.log(' Deezer URL:', url)
      
      const response = await fetch(url)
      console.log('Response status:', response.status)
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}`)
      }

      const apiresponse = await response.json()
      console.log('Deezer Response:', apiresponse)
      console.log('Songs found:', apiresponse.data?.length || 0)

      if (apiresponse.data && Array.isArray(apiresponse.data)) {
        const deezerSongs: Song[] = apiresponse.data.map((track: any) => ({
          id: track.id.toString(),
          name: track.title,
          image: track.album?.cover_medium || track.album?.cover || 'https://via.placeholder.com/200',
          artistId: track.artist?.id.toString() || '0',
          duration: track.duration,
          album: track.album?.title || 'Unknown Album',
          audioUrl: track.preview // 30-second preview
        }))

        songs.value = deezerSongs

        // Extract unique artists
        const uniqueArtists = new Map<string, Artist>()
        deezerSongs.forEach((song: Song) => {
          if (!uniqueArtists.has(song.artistId)) {
            const trackData = apiresponse.data.find(
              (t: any) => t.artist?.id.toString() === song.artistId
            )
            uniqueArtists.set(song.artistId, {
              id: song.artistId,
              name: trackData?.artist?.name || 'Unknown Artist',
              image: trackData?.artist?.picture_medium || 'https://via.placeholder.com/300',
              bio: 'Artist from Deezer'
            })
          }
        })
        Artists.value = Array.from(uniqueArtists.values())
        
        console.log('Successfully loaded', deezerSongs.length, 'songs')
      }
    } catch (err) {
      console.error('ERROR:', err)
      error.value = err instanceof Error ? err.message : 'Failed to fetch songs from Deezer'
    } finally {
      isLoading.value = false
      console.log('========================================')
    }
  }

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

  return {
    songs,
    getSongById,
    getArtistById,
    getSongsByArtist,
    Artists,
    searchQuery,
    searchResults,
    setSearchQuery,
    clearSearch,
    fetchSongsFromDeezer,
    isLoading,
    error
  }
})