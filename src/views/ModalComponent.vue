<template>
  <div class="fixed inset-0 flex items-center justify-center">
    <div class="fixed inset-0 bg-gray-900 bg-opacity-50"></div>
    <div class="bg-white rounded-lg z-50 shadow-lg p-6">
      <slot>
        <h1>
          Voce realmente deseja apagar?
        </h1>
        <div class="flex justify-between my-10">
          <button @click="() => {
            deleteEmployee(id)
            handleShowModal()
          }">Apagar</button>
          <button @click="() => handleShowModal() ">Cancelar</button>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    close() {
      this.$emit('close');
    },
  },
  props: {
    deleteEmployee: Function,
    id: Number,
    handleShowModal: Function,
  },
};
</script>

<style>
</style>
