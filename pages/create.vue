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
  <div class="container py-4">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1 class="h4 fw-bold mb-4">Criar Usuário</h1>
        <form @submit.prevent="submit">
          <div class="mb-3">
            <input v-model="name" type="text" class="form-control" placeholder="Nome" />
          </div>
          <div class="mb-3">
            <input v-model="email" type="email" class="form-control" placeholder="Email" />
          </div>
          <button type="submit" class="btn btn-primary">Criar</button>
          <NuxtLink to="/" class="btn btn-secondary ms-2">Voltar</NuxtLink>
        </form>

        <div v-if="message" class="alert alert-success mt-4">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>
