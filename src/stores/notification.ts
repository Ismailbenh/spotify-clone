import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Notification {
  id: number
  title: string
  message: string
  time: string
  read: boolean
}

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref<Notification[]>([
    {
      id: 1,
      title: 'New Release',
      message: 'Your favorite artist released a new album',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      title: 'Playlist Updated',
      message: 'New songs added to your Daily Mix',
      time: '5 hours ago',
      read: false
    },
    {
      id: 3,
      title: 'Friend Activity',
      message: 'John started following you',
      time: '1 day ago',
      read: true
    }
  ])

  const unreadCount = computed(() => 
    notifications.value.filter(n => !n.read).length
  )

  function markAsRead(id: number) {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
      notification.read = true
    }
  }

  function clearAll() {
    notifications.value = []
  }

  function addNotification(notification: Omit<Notification, 'id'>) {
    const id = Math.max(...notifications.value.map(n => n.id), 0) + 1
    notifications.value.unshift({
      ...notification,
      id
    })
  }

  function removeNotification(id: number) {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  return {
    notifications,
    unreadCount,
    markAsRead,
    clearAll,
    addNotification,
    removeNotification
  }
})