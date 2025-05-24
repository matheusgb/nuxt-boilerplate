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
  <div class="container py-4">
    <div class="d-flex justify-content-end">
      <NuxtLink to="/create" class="btn btn-primary">Criar usuário</NuxtLink>
    </div>
    <h2 class="text-center mb-4">Listagem de Usuários</h2>
    <ul class="list-group">
      <li
        v-for="user in users"
        :key="user.id"
        class="list-group-item d-flex justify-content-between align-items-center flex-column flex-sm-row text-center text-sm-start"
      >
        <div>
          <h5 class="mb-1">{{ user.name }}</h5>
          <small class="text-muted">{{ user.email }}</small>
        </div>

        <div class="mt-3 mt-sm-0">
          <button @click="toggleUpdate(user.id)" class="btn btn-outline-primary btn-sm me-2">
            Atualizar Usuário
          </button>
          <button @click="deleteUser(user.id)" class="btn btn-outline-danger btn-sm">
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
  .container {
    max-width: 800px;
  }
</style>
