<script setup lang="ts">
const { fetchUser } = useAuth();
await useAsyncData("init-user", () => fetchUser().then(() => true));
</script>

<template>
  <NuxtPage />
</template>
