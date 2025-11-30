<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useNotificationsStore } from '@/stores/notification.ts'
import ChevronIconLeft from '@/assets/icons/chevronIconleft.vue'
import ChevronIconRight from '@/assets/icons/chevronIconRight.vue'
import SettingsIcon from '@/assets/icons/settingsIcon.vue'
import NotificationIcon from '@/assets/icons/notificationIcon.vue'
import UserIcon from '@/assets/icons/userIcon.vue'
import GlassIcon from '@/assets/icons/glassIcon.vue'
import Settings from '@/components/settings.vue'
import Profile from '@/components/profile.vue'
import Notification from '@/components/notification.vue'
import { useLibraryStore } from '@/stores/library'
const library = useLibraryStore()
const router = useRouter()
const notificationsStore = useNotificationsStore()

const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const isSettingsOpen = ref(false)
const isProfileOpen = ref(false)
const isNotificationOpen = ref(false)
const isSearchOpen = ref(false)
const navigationHistory = ref<string[]>([])
const currentIndex = ref(0)
const isNavigating = ref(false)
const canGoBack = computed(() => {
  return currentIndex.value > 0
})

const canGoForward = computed(() => {
  return currentIndex.value < navigationHistory.value.length - 1
})



function toggleSettings() {
  isSettingsOpen.value = !isSettingsOpen.value
  isProfileOpen.value = false
  isNotificationOpen.value = false
}

function toggleProfile() {
  isProfileOpen.value = !isProfileOpen.value
  isSettingsOpen.value = false
  isNotificationOpen.value = false
}

function toggleNotification() {
  isNotificationOpen.value = !isNotificationOpen.value
  isSettingsOpen.value = false
  isProfileOpen.value = false
}

function onClickOutside(event: MouseEvent) {
  const target = event.target as Node
  const settingsEl = document.querySelector('.settings-popover')
  const settingsButton = document.querySelector('.settings-button')
  const profileEl = document.querySelector('.profile-popover')
  const profileButton = document.querySelector('.profile-button')
  const notificationEl = document.querySelector('.notification-popover')
  const notificationButton = document.querySelector('.notification-button')
  const searchEl = document.querySelector('.search-popover')
  const searchContainer = document.querySelector('.topbar-center')
  if (isSettingsOpen.value) {
    if (!settingsEl?.contains(target) && !settingsButton?.contains(target)) {
      isSettingsOpen.value = false
    }
  }

  if (isProfileOpen.value) {
    if (!profileEl?.contains(target) && !profileButton?.contains(target)) {
      isProfileOpen.value = false
    }
  }

  if (isNotificationOpen.value) {
    if (!notificationEl?.contains(target) && !notificationButton?.contains(target)) {
      isNotificationOpen.value = false
    }
  }
  if (isSearchOpen.value) {
    if (!searchEl?.contains(target) && !searchContainer?.contains(target)) {
      isSearchOpen.value = false
    }
  }
}



onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
})

function goBack() {
  if (canGoBack.value) {
    isNavigating.value = true
    currentIndex.value--
    const path = navigationHistory.value[currentIndex.value]
    if (path) {
      router.push(path)
  }}}
function goForward() {
  if (canGoForward.value) {
    isNavigating.value = true
    currentIndex.value++
    const path = navigationHistory.value[currentIndex.value]
    if (path) {
      router.push(path)
  }
}}
  
function selectSong(songId: string) {
  router.push({ name: 'song', params: { id: songId } })
  searchQuery.value = ''
  isSearchOpen.value = false
}
function handleSearch() {
  library.setSearchQuery(searchQuery.value)
  isSearchOpen.value = true
}

function onSearchButton() {
  handleSearch()
  nextTick(() => searchInput.value?.focus())
}
onMounted(() => {
  document.addEventListener('click', onClickOutside)
  
  const currentPath = router.currentRoute.value.fullPath
  navigationHistory.value = [currentPath]
  currentIndex.value = 0
  
  router.afterEach((to, from) => {
    if (!isNavigating.value) {
      const newPath = to.fullPath
      
      if (newPath !== navigationHistory.value[currentIndex.value]) {
        navigationHistory.value = navigationHistory.value.slice(0, currentIndex.value + 1)
        navigationHistory.value.push(newPath)
        currentIndex.value++
      }
    }
    isNavigating.value = false
  })
})
</script>

<template>
  <div class="topbar">
    <div class="topbar-left">
      <button 
        @click="goBack" 
        class="nav-btn" 
        :disabled="!canGoBack"
        :class="{ disabled: !canGoBack }"
        aria-label="Go back"
      >
        <ChevronIconLeft />
      </button>
      <button 
        @click="goForward" 
        class="nav-btn" 
        :disabled="!canGoForward"
        :class="{ disabled: !canGoForward }"
        aria-label="Go forward"
      >
        <ChevronIconRight />
      </button>
    </div>

    <div class="topbar-center">
      <button class="icon-search-btn" @click="onSearchButton" aria-label="Search">
        <GlassIcon />
      </button>
      <input
        ref="searchInput"
        v-model="searchQuery"
        @keyup.enter="handleSearch"
        @input="handleSearch"
        @focus="isSearchOpen = true"
        type="text"
        placeholder="What do you want to listen to?"
        class="search-input"
      />
      <transition name="fade">
  <div v-if="isSearchOpen && library.searchResults.length > 0" class="search-popover">
    <button 
      v-for="song in library.searchResults" 
      :key="song.id"
      class="searchResultItem"
      @click="selectSong(song.id)"
    >
      <img :src="song.image" :alt="song.name" class="resultImage">
      <div class="resultInfo">
        <p class="resultName">{{ song.name }}</p>
        <p class="resultArtist">{{ library.getArtistById(song.artistId)?.name }}</p>
      </div>
    </button>
  </div>
</transition>
    </div>

    <div class="topbar-right">
      <!-- Notifications -->
      <div class="icon-btn-wrapper">
        <button 
          class="icon-btn notification-button"
          @click.stop="toggleNotification"
          :aria-expanded="isNotificationOpen"
          aria-label="Notifications"
        >
          <NotificationIcon />
          <span v-if="notificationsStore.unreadCount > 0" class="badge">
            {{ notificationsStore.unreadCount }}
          </span>
        </button>
      </div>

      <button
        class="icon-btn profile-button"
        @click.stop="toggleProfile"
        :aria-expanded="isProfileOpen"
        aria-label="Profile"
      >
        <UserIcon />
      </button>

      <button
        class="icon-btn settings-button"
        @click.stop="toggleSettings"
        :aria-expanded="isSettingsOpen"
        aria-label="Settings"
      >
        <SettingsIcon />
      </button>
    </div>

    <transition name="fade">
      <div v-if="isNotificationOpen" class="notification-popover" @click.stop>
        <Notification />
      </div>
    </transition>

    <transition name="fade">
      <div v-if="isProfileOpen" class="profile-popover" @click.stop>
        <Profile />
      </div>
    </transition>

    <transition name="fade">
      <div v-if="isSettingsOpen" class="settings-popover" @click.stop>
        <Settings />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.search-popover {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: var(--color-bg-secondary);
  border-radius: 12px;
  max-height: 400px;
  overflow-y: auto;
  z-index: 1001;
}
.searchResultItem {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  width: 100%;
  background: none;
  border: none;
  color: var(--color-text);
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s;
  font-family: Poppins, sans-serif;
}

.searchResultItem:hover {
  background-color: var(--color-primary);
}

.searchResultItem:first-child {
  border-radius: 12px 12px 0 0;
}

.searchResultItem:last-child {
  border-radius: 0 0 12px 12px;
}

.resultImage {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.resultInfo {
  flex: 1;
  min-width: 0;
}

.resultName {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.resultArtist {
  font-size: 12px;
  color: var(--color-text-secondary);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-popover::-webkit-scrollbar {
  width: 6px;
}

.search-popover::-webkit-scrollbar-track {
  background: transparent;
}

.search-popover::-webkit-scrollbar-thumb {
  background: var(--color-text-secondary);
  border-radius: 3px;
}

.search-popover::-webkit-scrollbar-thumb:hover {
  background: var(--color-text);
}
.topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: var(--color-bg-secondary);
  gap: 10px;
  border-bottom: 1px solid var(--color-primary);
}

.topbar-left,
.topbar-right {
  display: flex;
  gap: 15px;
  align-items: center;
}

.topbar-center {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  max-width: 500px;
  background-color: var(--color-primary);
  padding: 8px 16px;
  border-radius: 20px;
  position: relative;
  z-index: 101;
}

.nav-btn,
.icon-btn {
  width: 50px;
  height: 50px;
  border-radius: 20px;
  background: var(--color-bg-secondary);
  border: none;
  color: var(--color-text);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s, opacity 0.2s;
  padding: 10px;
}

.nav-btn.disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

.icon-btn-wrapper {
  position: relative;
}

.icon-search-btn {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: var(--color-primary);
  border: none;
  color: var(--color-text);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  padding: 10px;
}

.nav-btn:hover:not(.disabled),
.icon-btn:hover {
  background-color: var(--color-primary);
}

.icon-search-btn:hover {
  background-color: var(--color-bg-secondary);
}

.nav-btn svg,
.icon-btn svg {
  width: 24px;
  height: 24px;
}

.search-input {
  font-family: Poppins, sans-serif;
  font-weight: 600;
  width: 100%;
  padding: 8px 12px;
  background-color: var(--color-bg-secondary);
  border: none;
  border-radius: 10px;
  color: var(--color-text);
  font-size: 16px;
}

.search-input:focus {
  outline: 2px solid var(--color-text-secondary);
  background: var(--color-surface-hover);
}

.search-input::placeholder {
  color: var(--color-text-secondary);
}

.badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: var(--color-primary);
  color: white;
  font-size: 11px;
  font-weight: 700;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-popover {
  position: absolute;
  top: calc(100% + 8px);
  right: 168px;
  z-index: 1001;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
}

.profile-popover {
  position: absolute;
  top: calc(100% + 8px);
  right: 96px;
  z-index: 1001;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
}

.settings-popover {
  position: absolute;
  top: calc(100% + 8px);
  right: 24px;
  z-index: 1001;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>