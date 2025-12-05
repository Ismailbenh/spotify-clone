import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // Get initial theme from system preference
  const getInitialTheme = (): 'light' | 'dark' => {
    // Check if system prefers dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  }

  const theme = ref<'light' | 'dark'>(getInitialTheme())
  const isDark = ref(theme.value === 'dark')

  // Apply theme to document
  const applyTheme = (newTheme: 'light' | 'dark') => {
    document.documentElement.setAttribute('data-theme', newTheme)
    isDark.value = newTheme === 'dark'
  }

  // Toggle between light and dark
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  // Set specific theme
  const setTheme = (newTheme: 'light' | 'dark') => {
    theme.value = newTheme
  }

  // Watch for changes and apply
  watch(theme, (newTheme) => {
    applyTheme(newTheme)
  }, { immediate: true })

  // Listen for system theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      theme.value = e.matches ? 'dark' : 'light'
    })
  }

  return {
    theme,
    isDark,
    toggleTheme,
    setTheme
  }
})