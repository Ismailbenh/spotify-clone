<script setup lang="ts">
import plusIcon from '@/assets/icons/plusIcon.vue'
</script>

<template>
    <aside>
        <button class="add-btn">
            <plusIcon />
        </button>
    </aside>
</template>
<style scoped>
aside {
    position: fixed;
    top: 110px;
    left: 60px;
    bottom: 20px;
    width: 60px;   
    background: var(--color-primary);
    border-radius: 10px;
    color: #fff;
    padding: 18px 4px 8px 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 2px 0 8px rgba(0,0,0,0.07);
    z-index: 1000;
}
.add-btn {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background-color: var(--color-icons);
    border: none;
    font-size: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    transition: background-color 0.3s;
}
</style>
