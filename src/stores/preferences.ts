import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePreferencesStore = defineStore('preferences', () => {
    const theme = ref('dark')
    const audioQuality = ref('high')
    const crossfade = ref(false)
    const language = ref('en')

    function setTheme(newTheme: 'dark' | 'light') {
        theme.value = newTheme
        document.documentElement.setAttribute('data-theme', newTheme)
    }

    function setAudioQuality(quality: 'low' | 'medium' | 'high') {
        audioQuality.value = quality
    }

    function setCrossfade(enabled: boolean) {
        crossfade.value = enabled
    }

    function setLanguage(lang: string) {
        language.value = lang
    }

    return {
        theme,
        audioQuality,
        crossfade,
        language,
        setTheme,
        setAudioQuality,
        setCrossfade,
        setLanguage
    }
})