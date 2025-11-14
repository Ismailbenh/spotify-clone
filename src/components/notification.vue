<script setup lang="ts">
import { useNotificationsStore } from '@/stores/notification.ts'

const notificationsStore = useNotificationsStore()
</script>

<template>
    <div class="notificationContainer">
        <div class="notificationHeader">
            <h2>Notifications</h2>
            <button v-if="notificationsStore.notifications.length > 0" class="clearBtn" @click="notificationsStore.clearAll()">
                Clear All
            </button>
        </div>

        <div class="notificationDivider"></div>

        <div v-if="notificationsStore.notifications.length === 0" class="emptyState">
            <p>No notifications yet</p>
        </div>

        <div v-else class="notificationList">
            <button 
                v-for="notification in notificationsStore.notifications" 
                :key="notification.id"
                class="notificationItem"
                :class="{ 'unread': !notification.read }"
                @click="notificationsStore.markAsRead(notification.id)"
            >
                <div class="notificationContent">
                    <h3 class="notificationTitle">{{ notification.title }}</h3>
                    <p class="notificationMessage">{{ notification.message }}</p>
                    <span class="notificationTime">{{ notification.time }}</span>
                </div>
                <div v-if="!notification.read" class="unreadDot"></div>
            </button>
        </div>
    </div>
</template>

<style scoped>
.notificationContainer {
    background: var(--color-bg-secondary);
    border-radius: 12px;
    padding: 24px;
    width: 350px;
    color: var(--color-text);
    max-height: 500px;
    overflow-y: auto;
}

/* Hide scrollbar */
.notificationContainer::-webkit-scrollbar {
    display: none;
}

.notificationHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

.notificationHeader h2 {
    font-size: 20px;
    font-weight: 700;
    margin: 0;
}

.clearBtn {
    background: none;
    border: none;
    color: var(--color-text-secondary);
    font-size: 13px;
    cursor: pointer;
    text-decoration: underline;
    transition: color 0.2s;
}

.clearBtn:hover {
    color: var(--color-text);
}

.notificationDivider {
    height: 1px;
    background: var(--color-primary);
    margin: 16px 0;
}

.emptyState {
    text-align: center;
    padding: 32px 16px;
}

.emptyState p {
    color: var(--color-text-secondary);
    font-size: 14px;
    margin: 0;
}

.notificationList {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.notificationItem {
    position: relative;
    display: flex;
    gap: 12px;
    padding: 12px;
    background: none;
    border: none;
    color: var(--color-text);
    text-align: left;
    cursor: pointer;
    border-radius: 8px;
    transition: background-color 0.2s;
    font-family: "Poppins", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}

.notificationItem:hover {
    background-color: var(--color-primary);
}

.notificationItem.unread {
    background-color: rgba(201, 76, 50, 0.1);
}

.notificationContent {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.notificationTitle {
    font-size: 14px;
    font-weight: 600;
    margin: 0 0 4px 0;
    color: var(--color-text);
}

.notificationMessage {
    font-size: 13px;
    color: var(--color-text-secondary);
    margin: 0 0 4px 0;
    line-height: 1.3;
    display: -webkit-box;
    
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.notificationTime {
    font-size: 12px;
    color: var(--color-text-secondary);
    margin: 0;
}

.unreadDot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--color-primary);
    flex-shrink: 0;
    align-self: center;
}
</style>