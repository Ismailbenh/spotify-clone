<script setup lang="ts">
import { ref } from 'vue'
import { usePreferencesStore } from '@/stores/preferences'

const preferences = usePreferencesStore()
const isDarkMode = ref(true)

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  preferences.setTheme(isDarkMode.value ? 'dark' : 'light')
}
</script>

<template>
    <div class="settingsContainer">
        <div class="settingsHeader">
            <h2>Settings</h2>
        </div>
        
        <div class="settingsGroup">
            <h3>Theme</h3>
            <label class="switch">
                <span class="switchLabel">Dark Mode</span>
                <input 
                    type="checkbox" 
                    v-model="isDarkMode"
                    @change="toggleTheme"
                >
                <span class="slider round"></span>
            </label>
            <button class="settingBtn">Language</button>
        </div>

        <div class="settingsGroup">
            <h3>Support</h3>
            <button class="settingBtn">Report a Bug</button>
            <button class="settingBtn">About</button>
        </div>
    </div>
</template>

<style scoped>
.settingsContainer {
    background: var(--color-bg-secondary);
    border-radius: 12px;
    padding: 24px;
    width: 300px;
    color: var(--color-text);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    font-weight: 600;
}

.settingsHeader {
    margin-bottom: 24px;
}

.settingsHeader h2 {
    font-size: 24px;
    font-weight: 700;
}

.settingsGroup {
    margin-bottom: 24px;
}

.settingsGroup h3 {
    font-size: 16px;
    color: var(--color-text-secondary);
    margin-bottom: 12px;
}

.settingBtn {
    width: 100%;
    font-family: "Poppins", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    font-weight: 600;
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
}

.settingBtn:hover {
    background-color: var(--color-primary);
}

.value {
    color: var(--color-text-secondary);
}

/* Switch styles */
.switch {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    cursor: pointer;
}

.switchLabel {
    margin-right: 12px;
    font-weight: 600;            /* ensure same weight as other buttons */
    font-family: "Poppins", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.slider {
    position: relative;
    width: 44px;
    height: 22px;
    background-color: var(--color-bg-secondary);
    border: 2px solid var(--color-text-secondary);
    border-radius: 34px;
    transition: .4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 1px;
    bottom: 0px;
    background-color: var(--color-text-secondary);
    transition: .4s;
    border-radius: 50%;
}

input:checked + .slider {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
}

input:checked + .slider:before {
    transform: translateX(22px);
    background-color: white;
}

/* Hide default checkbox */
.switch input {
    display: none;
}
</style>