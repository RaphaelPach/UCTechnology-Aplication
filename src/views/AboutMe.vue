<template>
  <div class="container mx-auto p-4">
    <div class="flex flex-col items-center">
      <div class="w-32 h-32 rounded-full overflow-hidden mb-4">
        <img src="src/img/Profile.jpg" alt="Foto" class="object-cover w-full h-full">
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="bg-white p-6 shadow-md">
          <h2 class="text-2xl font-bold mb-4">Sobre Mim</h2>
          <p>Coloque aqui informações sobre você.</p>
        </div>

        <div class="bg-white p-6 shadow-md">
          <h2 class="text-2xl font-bold mb-4">Hobbies</h2>
          <ul>
            <li>Hobby 1</li>
            <li>Hobby 2</li>
            <li>Hobby 3</li>
          </ul>
        </div>

        <div class="bg-white p-6 shadow-md">
          <h2 class="text-2xl font-bold mb-4">Stacks</h2>
          <ul>
            <li>Tecnologia 1</li>
            <li>Tecnologia 2</li>
            <li>Tecnologia 3</li>
          </ul>
        </div>

        <div class="bg-white p-6 shadow-md">
          <h2 class="text-2xl font-bold mb-4">Filmes Favoritos</h2>
          <ul>
            <li>Filme 1</li>
            <li>Filme 2</li>
            <li>Filme 3</li>
          </ul>
        </div>

        <div class="bg-white p-6 shadow-md">
          <h2 class="text-2xl font-bold mb-4">Livros Favoritos</h2>
          <ul>
            <li>Livro 1</li>
            <li>Livro 2</li>
            <li>Livro 3</li>
          </ul>
        </div>

        <div class="bg-white p-6 shadow-md">
          <h2 class="text-2xl font-bold mb-4">Quadrinhos Favoritos</h2>
          <ul>
            <li>Quadrinho 1</li>
            <li>Quadrinho 2</li>
            <li>Quadrinho 3</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.container {
  max-width: 1200px;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.w-32 {
  width: 8rem;
}

.h-32 {
  height: 8rem;
}

.rounded-full {
  border-radius: 9999px;
}

.overflow-hidden {
  overflow: hidden;
}

.object-cover {
  object-fit: cover;
}
</style>
