<template>
<div class="flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
  <div class="bg-white rounded-lg shadow-lg p-8 max-w-3xl flex">
    <div class="w-1/3 flex justify-center">
      <img src="caminho-para-sua-foto.jpg" alt="Foto de Perfil" class="w-32 h-32 rounded-full">
    </div>

    <div class="w-2/3 pl-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-4">Sobre Mim</h2>
      <p class="text-lg text-gray-600 mb-4">Olá, eu sou [seu nome]. Aqui estão algumas informações sobre mim:</p>
      
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div class="p-4 bg-gray-100 rounded shadow-md">
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Hobbies</h3>
          <ul class="list-disc list-inside text-gray-600">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </div>

        <div class="p-4 bg-gray-100 rounded shadow-md">
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Gosto</h3>
          <p class="text-gray-600">Aqui você pode escrever sobre suas preferências, gostos pessoais, etc.</p>
        </div>
      </div>

      <div class="mt-6">
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Livros Favoritos</h3>
        <ul class="list-disc list-inside text-gray-600">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>

      <div class="mt-6">
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Filmes Favoritos</h3>
        <ul class="list-disc list-inside text-gray-600">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>

      <div class="mt-6">
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Quadrinhos Favoritos</h3>
        <ul class="list-disc list-inside text-gray-600">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>

      <div class="mt-6 flex justify-center">
        <a href="https://github.com/seu-usuario-do-github" target="_blank" rel="noopener noreferrer" class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full inline-block mr-2">GitHub</a>

        <a href="https://www.linkedin.com/in/seu-perfil-do-linkedin" target="_blank" rel="noopener noreferrer" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full inline-block">LinkedIn</a>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutMe'
}
</script>