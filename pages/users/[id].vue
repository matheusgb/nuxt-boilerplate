<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import type { User } from '~/types/users';

  const route = useRoute();
  const user = ref<User | null>(null);

  onMounted(async () => {
    user.value = await $fetch(`/api/users/detail?id=${route.params.id}`);
  });
</script>

<template>
  <div v-if="user" class="max-w-md mx-auto py-8">
    <div class="bg-base-200 rounded-lg shadow p-8">
      <h2 class="text-2xl font-bold mb-2">{{ user.name }}</h2>
      <p class="text-gray-500 mb-2">{{ user.email }}</p>
      <NuxtLink to="/" class="btn btn-secondary mt-4">Voltar</NuxtLink>
    </div>
  </div>
  <div v-else class="text-center py-8">Carregando...</div>
</template>
