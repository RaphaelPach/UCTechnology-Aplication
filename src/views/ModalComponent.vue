<template>
  <div class="fixed inset-0 flex items-center justify-center">
    <div class="fixed inset-0 bg-gray-900 bg-opacity-30"></div>
    <div class="bg-white rounded-lg z-50 shadow-lg p-6">
      <slot>
        <h1 class="font-bold">
          Você realmente deseja apagar?
        </h1>
        <div class="flex justify-between my-10">
          <button class="rounded-full px-4 py-2 bg-gray-500
           text-white font-semibold rounded-lg shadow-md"
            @click="() => handleShowModal() ">Cancelar</button>
          <button class="rounded-full px-4 py-2 bg-red-600
           text-white font-semibold rounded-lg shadow-md" @click="() => {
            deleteEmployee(id)
            handleShowModal()
          }">Apagar</button>
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
