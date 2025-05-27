<script setup lang="ts">
  import type { PaginationResult } from '~/types/pagination';
  import type { User } from '~/types/users';

  const modalUserId = ref<number | null>(null);
  const users = ref<User[]>([]);
  const totalPages = ref(1);
  const page = ref(1);
  const limit = ref(3);
  const totalUsers = ref(0);

  function fetchUsers() {
    $fetch<PaginationResult<User>>(`/api/users/list?page=${page.value}&limit=${limit.value}`)
      .then((res) => {
        users.value = res.data;
        totalPages.value = res.totalPages;
        totalUsers.value = res.total;
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }

  onMounted(fetchUsers);
  watch([page, limit], fetchUsers);

  function toggleUpdate(id: number) {
    modalUserId.value = modalUserId.value === id ? null : id;
  }

  function deleteUser(id: number) {
    $fetch(`/api/users/delete?id=${id}`, {
      method: 'DELETE',
    })
      .then(() => {
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
    <h2 class="text-center text-2xl font-bold mb-1">Listagem de Usuários</h2>
    <div v-if="users.length === 0" class="text-center text-gray-500 mb-3">
      Nenhum usuário encontrado.
    </div>
    <div v-else class="text-center text-gray-500 mb-3">Total de usuários: {{ totalUsers }}</div>

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

    <div v-if="totalPages > 1" class="flex justify-center mt-8 gap-2">
      <button class="btn btn-sm" :disabled="page === 1" @click="page--">Anterior</button>
      <span class="px-2 py-1">Página {{ page }} de {{ totalPages }}</span>
      <button class="btn btn-sm" :disabled="page === totalPages" @click="page++">Próxima</button>
    </div>

    <div v-if="totalPages > 1" class="flex justify-center mt-4 gap-1">
      <button
        v-for="p in totalPages"
        :key="p"
        class="btn btn-xs"
        :class="{ 'btn-active btn-primary': page === p }"
        @click="page = p"
      >
        {{ p }}
      </button>
    </div>

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
