import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Song {
  id: string
  name: string
  image: string
}
export const useLibraryStore = defineStore('library',()=>{
    const songs = ref<Song[]>([
        {
      id: '1',
      name: 'Drake',
      image: 'https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9'
    },
    {
      id: '2',
      name: 'Taylor Swift',
      image: 'https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676'
    },
    {
      id: '3',
      name: 'The Weeknd',
      image: 'https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb'
    },
    {
      id: '4',
      name: 'The Weeknd',
      image: 'https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb'
    },
    {
      id: '5',
      name: 'The Weeknd',
      image: 'https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb'
    },
    {
      id: '6',
      name: 'The Weeknd',
      image: 'https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb'
    },
    {
      id: '7',
      name: 'The Weeknd',
      image: 'https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb'
    },
    {
      id: '8',
      name: 'The Weeknd',
      image: 'https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb'
    },
    {
      id: '9',
      name: 'The Weeknd',
      image: 'https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb'
    },
    {
      id: '10',
      name: 'The Weeknd',
      image: 'https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb'
    },
    {
      id: '11',
      name: 'The Weeknd',
      image: 'https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676'
    },
    {
      id: '12',
      name: 'The Weeknd',
      image: 'https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676'
    },
    {
      id: '13',
      name: 'The Weeknd',
      image: 'https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb'
    },
    {
      id: '14',
      name: 'The Weeknd',
      image: 'https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb'
    },
    {
      id: '15',
      name: 'The Weeknd',
      image: 'https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676'
    },
    {
      id: '16',
      name: 'The Weeknd',
      image: 'https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb'
    },
    {
      id: '17',
      name: 'The Weeknd',
      image: 'https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676'
    }
    ])
    return {songs}
})