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

</script>

<template>
  <div>
      
      <form @submit.prevent="createEmployee">
        <div>
          Crie seu funcionário UCTechnology
        </div>
        <input type="text" placeholder="Nome" v-model="newEmployee.nome" />
        <input type="text" placeholder="Sobrenome" v-model="newEmployee.sobrenome" />
        <input type="text" placeholder="Cargo" v-model="newEmployee.cargo" />
        <input type="datetime-local" placeholder="Data de Início" v-model="newEmployee.dataInicio" />
        <input type="checkbox" placeholder="Nome" v-model="newEmployee.ativo" />
        <button type="submit">Cadastrar</button>
      </form>
        </div>

        <div>
        <table>
         <thead>
          <th>
            <td v-for="(header, i ) in Object.keys(listEmployee[0] || [])" :key="`Header-${i}`">
            {{ header }}
            </td>
          </th>
         </thead>
         <tbody>
          <tr v-for="(item, i) in listEmployee" :key="`Row-${i}`">
            <td v-for="(value, j) in Object.values(item)" :key="`Cell-${i}-${j}`">
              {{ value }}
            </td>
          </tr>
         </tbody>
        </table>
        </div>
</template>
