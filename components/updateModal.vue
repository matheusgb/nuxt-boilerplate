<script setup lang="ts">
  import { defineEmits, defineProps, ref } from 'vue';
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
    <div v-if="show" class="modal-wrapper">
      <div
        class="modal"
        tabindex="-1"
        :style="{ display: show ? 'block' : 'none' }"
        role="dialog"
        @click.self="close"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Atualizar Usuário</h5>
              <button type="button" class="btn-close" aria-label="Close" @click="close" />
            </div>
            <div class="modal-body">
              <form @submit.prevent="submit">
                <div class="mb-3">
                  <input v-model="name" type="text" class="form-control" placeholder="Nome" />
                </div>
                <div class="mb-3">
                  <input v-model="email" type="email" class="form-control" placeholder="Email" />
                </div>
                <div class="d-flex justify-content-end gap-2">
                  <button type="button" class="btn btn-secondary" @click="close">Cancelar</button>
                  <button type="submit" class="btn btn-primary">Atualizar</button>
                </div>
              </form>

              <div
                v-if="message"
                class="mt-3 alert"
                :class="message.includes('Erro') ? 'alert-danger' : 'alert-success'"
              >
                {{ message }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="show" class="modal-backdrop show"></div>
    </div>
  </Teleport>
</template>

<style scoped>
  .modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1050;
  }
</style>
