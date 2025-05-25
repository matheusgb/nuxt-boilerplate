<script setup lang="ts">
  import { type User, type CreateUserPayload } from '~/types/users';

  const name = ref('');
  const email = ref('');
  const message = ref('');

  const submit = () => {
    const payload: CreateUserPayload = { name: name.value, email: email.value };
    $fetch<User>('/api/users/create', {
      method: 'POST',
      body: payload,
    })
      .then((res) => {
        message.value = `Usuário criado: ${res.name}`;
        name.value = '';
        email.value = '';
      })
      .catch((err) => {
        message.value = err?.data?.error || 'Erro ao criar usuário';
      });
  };
</script>

<template>
  <div class="max-w-md mx-auto py-8">
    <div class="bg-base-200 rounded-lg shadow p-8">
      <h1 class="text-xl font-bold mb-6 text-center">Criar Usuário</h1>
      <form @submit.prevent="submit" class="space-y-4">
        <input v-model="name" type="text" class="input input-bordered w-full" placeholder="Nome" />
        <input
          v-model="email"
          type="email"
          class="input input-bordered w-full"
          placeholder="Email"
        />
        <div class="flex gap-2 justify-end">
          <button type="submit" class="btn btn-primary">Criar</button>
          <NuxtLink to="/" class="btn btn-secondary">Voltar</NuxtLink>
        </div>
      </form>
      <div v-if="message" class="alert alert-success mt-4">
        {{ message }}
      </div>
    </div>
  </div>
</template>
