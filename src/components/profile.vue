<script setup lang="ts">
import { ref } from 'vue'
import { usePreferencesStore } from '@/stores/preferences'

const preferences = usePreferencesStore()

const userProfile = ref({
  name: 'Your Name',
  email: 'user@example.com',
  avatar: 'YN',
})

function logout() {
  console.log('Logging out...')
  // TODO: Implement logout logic with auth store
}
</script>

<template>
    <div class="profileContainer">
        <div class="profileHeader">
            <div class="profileAvatar">
                {{ userProfile.avatar }}
            </div>
            <div class="profileInfo">
                <h2>{{ userProfile.name }}</h2>
                <p class="profileEmail">{{ userProfile.email }}</p>
            </div>
        </div>

        <div class="profileDivider"></div>

        <div class="profileGroup">
            <h3>Account</h3>
            <button class="profileBtn">
                <span>View Profile</span>
            </button>
            <button class="profileBtn">
                <span>Edit Profile</span>
            </button>
            <button class="profileBtn">
                <span>Preferences</span>
            </button>
        </div>

        <div class="profileGroup">
            <h3>Subscription</h3>
            <button class="profileBtn">
                <span>Plan</span>
                <span class="value">Premium</span>
            </button>
            <button class="profileBtn">
                <span>Upgrade</span>
            </button>
        </div>
        
        <div class="profileDivider"></div>

        <button class="logoutBtn" @click="logout">
            Logout
        </button>
    </div>
</template>

<style scoped>
.profileContainer {
    background: var(--color-bg-secondary);
    border-radius: 12px;
    padding: 24px;
    width: 300px;
    color: var(--color-text);
}

.profileHeader {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
}

.profileAvatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    font-weight: 700;
}

.profileInfo {
    flex: 1;
}

.profileHeader h2 {
    font-size: 18px;
    font-weight: 700;
    margin: 0;
    margin-bottom: 4px;
}

.profileEmail {
    font-size: 13px;
    color: var(--color-text-secondary);
    margin: 0;
}

.profileDivider {
    height: 1px;
    background: var(--color-primary);
    margin: 16px 0;
}

.profileGroup {
    margin-bottom: 20px;
}

.profileGroup h3 {
    font-size: 14px;
    color: var(--color-text-secondary);
    margin-bottom: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.profileBtn {
    width: 100%;
    padding: 12px;
    background: none;
    border: none;
    color: var(--color-text);
    text-align: left;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    margin-bottom: 4px;
    transition: background-color 0.2s;
    font-family: "Poppins", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    font-weight: 500;
}

.profileBtn:hover {
    background-color: var(--color-primary);
}

.value {
    color: var(--color-text-secondary);
    font-size: 14px;
}

.logoutBtn {
    width: 100%;
    padding: 12px;
    background: var(--color-primary);
    color: var(--color-text);
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    font-family: "Poppins", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}

.logoutBtn:hover {
    background-color: #C94C32;
}
</style>