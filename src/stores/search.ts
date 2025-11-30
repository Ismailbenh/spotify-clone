import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Song } from './library'

export const useSearchStore = defineStore('search', () => {
    const query = ref('')
    const results = ref<Song[]>([])

    function setQuery(newQuery: string) {
        query.value = newQuery
    }
})