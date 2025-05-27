<script setup lang="ts">
  import type { User } from '~/types/users';

  const modalUserId = ref<number | null>(null);
  const users = ref<User[]>([]);

  onMounted(() => {
    $fetch<User[]>('/api/users/list')
      .then((res) => {
        users.value = res;
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  });

  function toggleUpdate(id: number) {
    modalUserId.value = modalUserId.value === id ? null : id;
  }

  function deleteUser(id: number) {
    $fetch(`/api/users/delete?id=${id}`, {
      method: 'DELETE',
    })
      .then((_) => {
        users.value = users.value.filter((user) => user.id !== id);
      })
      .catch((error) => {
        console.error('Error deleting user', error);
      });
  }

  async function handleUserUpdate(user: User) {
    const index = users.value.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      users.value[index] = user;
    }
  }
</script>

<template>
  <div class="max-w-2xl mx-auto py-8">
    <div class="flex justify-end mb-4">
      <NuxtLink to="/create" class="btn btn-primary">Criar usuário</NuxtLink>
    </div>
    <h2 class="text-center text-2xl font-bold mb-6">Listagem de Usuários</h2>
    <ul class="space-y-4">
      <li
        v-for="user in users"
        :key="user.id"
        class="bg-base-200 rounded-lg shadow flex flex-col sm:flex-row sm:items-center sm:justify-between p-4"
      >
        <div class="flex flex-col">
          <NuxtLink :to="`/users/${user.id}`" class="font-semibold text-lg mb-1 hover:underline">
            {{ user.name }}
          </NuxtLink>
          <small class="text-gray-500">{{ user.email }}</small>
        </div>
        <div class="flex gap-2 mt-3 sm:mt-0">
          <button @click="toggleUpdate(user.id)" class="btn btn-outline btn-primary btn-sm">
            Atualizar Usuário
          </button>
          <button @click="deleteUser(user.id)" class="btn btn-outline btn-error btn-sm">
            Deletar Usuário
          </button>
        </div>
      </li>
    </ul>

    <UpdateModal
      v-if="modalUserId"
      :show="true"
      :user-id="modalUserId"
      @close="modalUserId = null"
      @update="handleUserUpdate"
    />
  </div>
</template>

<style scoped>
  .max-w-2xl {
    max-width: 42rem;
  }
</style>
