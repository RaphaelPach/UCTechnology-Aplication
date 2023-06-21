<script setup>
import { API_URL, criadorId, criadorNome } from "@/utils/constants"
import { ref } from "vue"

const newEmployee = ref({
  nome: "",
  sobrenome: "",
  cargo: "",
  dataInicio: "",
  ativo: true
})
let id = 0
const list = ref([])

const fetchEmployeeList = async () => {
  const response = await fetch(`${API_URL}/funcionario?criadorId=${criadorId}`)
  list.value = (await response.json()).map(employee => ({
    id: employee.id,
    nome: employee.nome,
    sobrenome: employee.sobrenome,
    cargo: employee.cargo,
    dataInicio: employee.dataInicio,
    ativo: employee.ativo,
    criador: employee.criador.nome
  }))
  id = list[list.value.length - 1].id + 1
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

</script>

<template>
<div class="flex gap-2">
  <form @submit.prevent="createEmployee" class="flex flex-col gap-2 border p-2">
    <div>
      Novos Funcionários
    </div>
    <input class="bg-gray-100 rounded px-2 py-1 border border-gray-200" type="text" placeholder="Nome"/>
    <input class="bg-gray-100 rounded px-2 py-1 border border-gray-200" type="text" placeholder="Sobrenome"/>
    <input class="bg-gray-100 rounded px-2 py-1 border border-gray-200" type="text" placeholder="Cargo"/>
    <input class="bg-gray-100 rounded px-2 py-1 border border-gray-200" type="datetime-local" placeholder="Data de Início"/>
    <input type="checkbox" placeholder="Nome"/>
    <button class="bg-gray-100 hover:bg-gray-200 hover:border-gray-300 transition rounded px-2 py-1 border border-gray-200" type="submit">Salvar</button>
  </form>
</div>
</template>