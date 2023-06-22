<script setup>
import { API_URL, criadorId, criadorNome } from "@/Utils/Url"
import { ref,  onMounted } from "vue"

const newEmployee = ref({
  nome: "",
  sobrenome: "",
  cargo: "",
  dataInicio: "",
  ativo: true
})
let id = 0
 const listEmployee = ref([])
 
const fetchEmployeeList = async () => {
  const response = await fetch(`${API_URL}/funcionario?criadorId=${criadorId}`)
  listEmployee.value = (await response.json()).map(employee => ({
    id: employee.id,
    nome: employee.nome,
    sobrenome: employee.sobrenome,
    cargo: employee.cargo,
    dataInicio: employee.dataInicio,
    ativo: employee.ativo,
    criador: employee.criador.nome
  }))
  id = listEmployee.value.length > 0 ? listEmployee.value[listEmployee.value.length - 1].id + 1 : 0;

}

const createEmployee = async () => {
await fetch(`${API_URL}/funcionario`, {
  method: "POST",
  headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({... newEmployee.value,
      dataInicio: (new Date(newEmployee.value.dataInicio)).toISOString(),
        id,
         criador: { id: criadorId, nome: criadorNome } }),
  
})
newEmployee.value = {
    nome: "",
    sobrenome: "",
    cargo: "",
    dataInicio: "",
    ativo: true
  }
 fetchEmployeeList()
}
onMounted(() => {
  fetchEmployeeList()
})

const deleteEmployee = async (id) => {
  await fetch(`${API_URL}/funcionario/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  })

  fetchEmployeeList()
}

</script>

<template>
  <div>
  <header class="bg-blue-500 text-white py-4">
    <div class="container mx-auto flex items-center justify-between px-4">
      <h1 class="text-3xl font-bold">UC Technology</h1>
      <nav>
        <a href="#" class="text-white hover:text-blue-200 ml-4">About me</a>
      </nav>
    </div>
  </header>
  <div class="container mx-auto p-8 mt-8">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-bold">Crie seu funcionário UCTechnology</h2>
    </div>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto p-8">
      <form @submit.prevent="createEmployee" class="flex flex-col space-y-4 items-center">
        <input type="text" placeholder="Nome" v-model="newEmployee.nome" class="input" />
        <input type="text" placeholder="Sobrenome" v-model="newEmployee.sobrenome" class="input" />
        <input type="text" placeholder="Cargo" v-model="newEmployee.cargo" class="input" />
        <input type="datetime-local" placeholder="Data de Início" v-model="newEmployee.dataInicio" class="input" />
        <label class="flex items-center space-x-2">
          <input type="checkbox" v-model="newEmployee.ativo" class="form-checkbox" />
          <span>Ativo</span>
        </label>
        <button type="submit" class="btn">Cadastrar</button>
      </form>
    </div>
    
    <div class="container mx-auto p-8 mt-8">
      <table class="w-full">
        <thead>
          <tr>
            <th v-for="(header, i) in Object.keys(listEmployee[0] || [])" :key="`Header-${i}`" class="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-300 text-left">
              {{ header }}
            </th>
            <th class="py-4 px-6 bg-gray-200 font-bold uppercase text-sm text-gray-600 border-b border-gray-300 text-left">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in listEmployee" :key="`Row-${i}`">
            <td v-for="(value, j) in Object.values(item)" :key="`Cell-${i}-${j}`" class="py-4 px-6 border-b border-gray-300 text-left">
              {{ value }}
            </td>
            <td class="py-4 px-6 border-b border-gray-300">
              <button @click="() => deleteEmployee(item.id)" class="bg-gray-100 hover:bg-red-200 hover:border-red-300 transition rounded px-2 py-1 border border-gray-200">Deletar</button>
              <button class="bg-gray-100 hover:bg-blue-200 hover:border-blue-300 transition rounded px-2 py-1 border border-gray-200">Atualizar</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</div>
</div>
</div> 
<footer class="bg-gray-200 shadow-lg">
  <div class="container mx-auto py-4 px-8 flex items-center justify-between">
    <p class="text-gray-600">Developed by Raphael Pacheco</p>
    <p class="text-gray-600">© 2023 All rights reserved</p>
  </div>
</footer>


</template>

<style>
.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  outline: none;
}

.btn {
  background-color: #0078D7;
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
