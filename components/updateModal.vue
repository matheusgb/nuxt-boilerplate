<script setup lang="ts">
  import type { UpdateUserPayload, User } from '~/types/users';

  const emit = defineEmits(['close', 'update']);
  const props = defineProps<{ userId: number; show: boolean }>();

  const name = ref('');
  const email = ref('');
  const message = ref('');

  function close() {
    message.value = '';
    name.value = '';
    email.value = '';
    emit('close');
  }

  const submit = () => {
    if (!name.value && !email.value) {
      message.value = 'Por favor, preencha pelo menos um campo';
      return;
    }

    const payload: UpdateUserPayload = { name: name.value, email: email.value };

    $fetch<User>(`/api/users/update?id=${props.userId}`, {
      method: 'PATCH',
      body: payload,
    })
      .then((res) => {
        message.value = `Usuário atualizado: ${res.name}`;
        emit('update', res);
        setTimeout(close, 1500);
      })
      .catch((err) => {
        message.value = err?.data?.error || 'Erro ao atualizar usuário';
      });
  };
</script>

<template>
  <Teleport to="body">
    <div v-if="show" class="modal modal-open">
      <div class="modal-box">
        <h5 class="font-bold text-lg mb-4">Atualizar Usuário</h5>
        <form @submit.prevent="submit" class="space-y-4">
          <input
            v-model="name"
            type="text"
            class="input input-bordered w-full"
            placeholder="Nome"
          />
          <input
            v-model="email"
            type="email"
            class="input input-bordered w-full"
            placeholder="Email"
          />
          <div class="flex justify-end gap-2">
            <button type="button" class="btn btn-secondary" @click="close">Cancelar</button>
            <button type="submit" class="btn btn-primary">Atualizar</button>
          </div>
        </form>
        <div
          v-if="message"
          class="mt-4 alert"
          :class="message.includes('Erro') ? 'alert-error' : 'alert-success'"
        >
          {{ message }}
        </div>
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="close">
          ✕
        </button>
      </div>
      <div class="modal-backdrop" @click="close"></div>
    </div>
  </Teleport>
</template>
