<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
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

const router = useRouter()
const notificationsStore = useNotificationsStore()

const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const isSettingsOpen = ref(false)
const isProfileOpen = ref(false)
const isNotificationOpen = ref(false)

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
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
})

function goBack() {
  router.back()
}

function goForward() {
  router.forward()
}

function handleSearch() {
  if (searchQuery.value.trim()) {
    // TODO: Implement search logic with Pinia store later
    console.log('Searching for:', searchQuery.value)
  }
}

function onSearchButton() {
  handleSearch()
  nextTick(() => searchInput.value?.focus())
}
</script>

<template>
  <div class="topbar">
    <div class="topbar-left">
      <button @click="goBack" class="nav-btn" aria-label="Go back">
        <ChevronIconLeft />
      </button>
      <button @click="goForward" class="nav-btn" aria-label="Go forward">
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
        type="text"
        placeholder="What do you want to listen to?"
        class="search-input"
      />
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

      <!-- Profile button (toggles profile popover) -->
      <button
        class="icon-btn profile-button"
        @click.stop="toggleProfile"
        :aria-expanded="isProfileOpen"
        aria-label="Profile"
      >
        <UserIcon />
      </button>

      <!-- Settings button -->
      <button
        class="icon-btn settings-button"
        @click.stop="toggleSettings"
        :aria-expanded="isSettingsOpen"
        aria-label="Settings"
      >
        <SettingsIcon />
      </button>
    </div>

    <!-- Notification Popover -->
    <transition name="fade">
      <div v-if="isNotificationOpen" class="notification-popover" @click.stop>
        <Notification />
      </div>
    </transition>

    <!-- Profile Popover -->
    <transition name="fade">
      <div v-if="isProfileOpen" class="profile-popover" @click.stop>
        <Profile />
      </div>
    </transition>

    <!-- Settings Popover -->
    <transition name="fade">
      <div v-if="isSettingsOpen" class="settings-popover" @click.stop>
        <Settings />
      </div>
    </transition>
  </div>
</template>

<style scoped>
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
  transition: background-color 0.2s;
  padding: 10px;
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

.nav-btn:hover,
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

/* Badge for notification count */
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

/* Popovers: notification, profile, settings */
.notification-popover {
  position: absolute;
  top: calc(100% + 8px);
  right: 168px;
  z-index: 1000;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
}

.profile-popover {
  position: absolute;
  top: calc(100% + 8px);
  right: 96px;
  z-index: 1000;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
}

.settings-popover {
  position: absolute;
  top: calc(100% + 8px);
  right: 24px;
  z-index: 1000;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>