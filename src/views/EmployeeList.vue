<script setup>
import { ref, onMounted } from 'vue';
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/solid';
import { API_URL, criadorId, criadorNome } from '../Utils/Url';
import ModalComponent from './ModalComponent.vue';

const showModal = ref(false);

const newEmployee = ref({
  nome: '',
  sobrenome: '',
  cargo: 'DESENVOLVEDOR',
  dataInicio: '',
  ativo: true,
});
let index = 0;
const editEmployee = ref(null);
const listEmployee = ref([]);

const fetchEmployeeList = async () => {
  const response = await fetch(`${API_URL}/funcionario?criadorId=${criadorId}`);
  listEmployee.value = (await response.json()).map((employee) => ({
    id: employee.id,
    nome: employee.nome,
    sobrenome: employee.sobrenome,
    cargo: employee.cargo,
    dataInicio: employee.dataInicio.split('T').at(0).replaceAll('-', '/'),
    status: employee.ativo && 'Ativo',
    criador: employee.criador.nome,
  }));
  index = listEmployee.value.length > 0
    ? listEmployee.value[listEmployee.value.length - 1].id + 1 : 0;
};

const createEmployee = async () => {
  await fetch(`${API_URL}/funcionario`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...newEmployee.value,
      dataInicio: (new Date(newEmployee.value.dataInicio)).toISOString(),
      index,
      criador: { id: criadorId, nome: criadorNome },
    }),

  });
  newEmployee.value = {
    nome: '',
    sobrenome: '',
    cargo: '',
    dataInicio: '',
    ativo: true,
  };
  fetchEmployeeList();
};
onMounted(() => {
  fetchEmployeeList();
});

const deleteEmployee = async (id) => {
  await fetch(`${API_URL}/funcionario/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  fetchEmployeeList();
};

const selectEmployee = (employee) => {
  editEmployee.value = { ...employee };
};

const putEmployee = async () => {
  await fetch(`${API_URL}/funcionario`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...editEmployee.value,
      dataInicio: (new Date(editEmployee.value.dataInicio)).toISOString(),
      criador: { id: criadorId, nome: criadorNome },
    }),
  });
  editEmployee.value = null;
  fetchEmployeeList();
};

const handleShowModal = () => {
  showModal.value = !showModal.value;
};

</script>

<template>
  <div class=" flex flex-col justify-between h-screen">
    <header class="bg-[#89beea] text-white w-full h-[50px] shadow-md">
      <div class="container mx-auto flex items-center justify-between px-4">
        <h1 class="text-3xl font-bold">UC Technology</h1>
      </div>
    </header>
    <div class="container mx-auto p-8 mt-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold w-3/4 m-[auto]">Cadastro</h2>
      </div>
      <div class="w-3/4 bg-[#d5e8f8] m-[auto] rounded-lg">
        <div class="container mx-auto p-8">
          <form @submit.prevent="createEmployee" class=" flex flex-col items-center">
            <div class="flex w-full">
              <div class="px-2 firstname">
              <input
                type="text"
                placeholder="Nome"
                v-model="newEmployee.nome"
                class="w-full rounded-md h-[30px] pl-3"
              />
              </div>
              <div class="px-2 secondname">
              <input
              type="text"
              placeholder="Sobrenome"
              v-model="newEmployee.sobrenome"
              class="w-full rounded-md h-[30px] pl-3"
              />
            </div>
          </div>
          <div class="flex w-full my-2">
            <div class="cargo px-2">
              <select
                v-model="newEmployee.cargo"
                class="w-full bg-white h-[30px] pl-3"
              >
                <option value="DESENVOLVEDOR" selected>DESENVOLVEDOR</option>
                <option value="ADMINISTRADOR">ADMINISTRADOR</option>
              </select>
            </div>
              <div class="date px-2">
                <input
                  type="datetime-local"
                  placeholder="Data de Início"
                  v-model="newEmployee.dataInicio"
                  class="w-full rounded-md h-[30px] pl-3"
                />
              </div>
          </div>
            <label class="flex items-center space-x-2">
              <input type="checkbox" v-model="newEmployee.ativo" class="form-checkbox" />
              <span>Ativo</span>
            </label>
            <button type="submit" class="btn">Cadastrar</button>
          </form>
          <form v-if="editEmployee"
           @submit.prevent="putEmployee"  class=" flex flex-col items-center">
            <div class="container p-8 mt-8">
              <div class="text-lg font-semibold">
                Atualizar Cadastro
              </div>
              <form v-if="editEmployee" @submit.prevent="putEmployee"
              class="flex flex-col space-y-4 items-center">
              <div class="flex w-full">
                <div class="px-2 firstname">
                  <input
                    class="w-full rounded-md h-[30px] pl-3"
                    type="text"
                    placeholder="Nome"
                    v-model="editEmployee.nome"
                  />
              </div>
                <div class="px-2 secondname">
                  <input
                  class="w-full rounded-md h-[30px] pl-3"
                  type="text"
                  placeholder="Sobrenome"
                  v-model="editEmployee.sobrenome"
                  />
                </div>
              </div>
              <div class="flex w-full my-2">
                  <div class="cargo px-2">
                    <select
                    v-model="newEmployee.cargo"
                    class="w-full bg-white h-[30px] pl-3"
                  >
                    <option value="DESENVOLVEDOR" selected>DESENVOLVEDOR</option>
                    <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                    </select>
                </div>
              <div class="date px-2">
                <input
                  class="w-full rounded-md h-[30px] pl-3"
                  type="datetime-local"
                  placeholder="Data de Início"
                  v-model="editEmployee.dataInicio"
                />
              </div>
              </div>
                <button
                  class="btn h-[45px]"
                  type="submit"
                >
                  Salvar
                </button>
              </form>
            </div>
          </form>
        </div>
        <div class="container mx-auto p-8 mt-8 overflow-auto overflow-y-hidden rounded-lg">
          <table class=" mx-auto sm:w-16 lg:w-48 bg-white rounded-lg">
            <thead>
              <tr>
                <th
                  v-for="(header, i) in Object.keys(listEmployee[0] || [])"
                  :key="`Header-${i}`"
                  class="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600
                   border-b border-gray-300 text-left"
                >
                  {{ header }}
                </th>
                <th
                  class="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600
                   border-b border-gray-300 text-left"
                >
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in listEmployee" :key="`Row-${i}`">
                <td
                  v-for="(value, j) in Object.values(item)"
                  :key="`Cell-${i}-${j}`"
                  class="py-4 px-6 border-b border-gray-300 text-left"
                >
                  {{ value }}
                </td>
                <td class="py-4 px-6 border-b border-gray-300">
                  <button
                    @click="() => showModal = true"
                    class="bg-gray-100 hover:bg-red-200 hover:border-red-300
                     transition rounded px-2 py-1 border border-gray-200"
                  >
                    <TrashIcon class="h-[20px] w-[40px] text-[red]"/>
                  </button>
                  <ModalComponent v-if="showModal"
                   :deleteEmployee="deleteEmployee" :id="item.id"
                  :handleShowModal="handleShowModal"/>
                  <button
                    @click="() => selectEmployee(item)"
                    class="bg-gray-100 hover:bg-blue-200 hover:border-blue-300
                     transition rounded px-2 py-1 border border-gray-200"
                  >
                  <PencilSquareIcon class="h-[20px] w-[40px] text-[#89beea]" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <footer class="bg-gray-200 bottom-0 w-full">
      <div class="container mx-auto py-4 px-8 flex items-center justify-between">
        <p class="text-gray-600">Developed by Raphael Pacheco</p>
        <p class="text-gray-600">© 2023 All rights reserved</p>
      </div>
    </footer>
  </div>
</template>

<style>
.firstname {
  width: 50%;
  outline: none;
}

.secondname {
  width: 50%;
  outline: none;
}
.cargo {
  width: 75%;
  outline: none;
}
.date {
  width: 25%;
  outline: none;
}

.btn {
  background-color: #89beea;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.btn:hover {
  background-color: #005A9E;
}
</style>
