<template>
  <div>
    <!-- Navbar Desktop -->
    <nav class="hidden lg:block bg-white text-black fixed top-0 w-full z-50 transition-all duration-300" :class="{ 'shadow-lg': isStaticNav, 'shadow-sm': !isStaticNav }">      
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <NuxtLink to="/">
              <img src="/img/pictures/logo.svg" alt="logo-katekima" class="h-10 w-auto pt-1">
            </NuxtLink>
          </div>
          <ul class="flex items-center space-x-6">
            <li class="relative group">
              <a href="#" class="hover:text-purple-200">
                <svg width="20" height="24" viewBox="0 0 16 20" fill="none">
                  <path d="M12 5C12 7.20914 10.2091 9 8 9C5.79086 9 4 7.20914 4 5C4 2.79086 5.79086 1 8 1C10.2091 1 12 2.79086 12 5Z" fill="#6f42c1" stroke-width="2"/>
                  <path d="M8 12C4.13401 12 1 15.134 1 19H15C15 15.134 11.866 12 8 12Z" fill="#6f42c1" stroke-width="2"/>
                </svg>
              </a>
              <div class="absolute right-0 hidden group-hover:block bg-white shadow-lg rounded-md mt-2 py-2 w-48">
                <NuxtLink to="/dashboard" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Dashboard</NuxtLink>
                <NuxtLink to="/bookmark" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Bookmark</NuxtLink>
                <NuxtLink v-if="isStaticNav" to="/transaction" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Transaction</NuxtLink>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Navbar Mobile -->
    <div class="lg:hidden">
      <section class="fixed top-0 w-full z-50 bg-white shadow-md">
        <div class="flex items-center justify-between px-4 py-3">
          <NuxtLink to="/" class="flex items-center">
            <img src="/img/pictures/logo.svg" alt="logo-katekima" class="h-8 w-auto pt-1">
          </NuxtLink>
          <div>
            <button @click="onShowSidebar" v-if="!isSidebar" class="p-1">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="0.5" y="0.5" width="31" height="31" rx="3.5" fill="white" stroke="#D1D5DB"/>
                <path fill-rule="evenodd" d="M9 11C9 10.4477 9.44772 10 10 10H22C22.5523 10 23 10.4477 23 11C23 11.5523 22.5523 12 22 12H10C9.44772 12 9 11.5523 9 11Z" fill="#6B7280"/>
                <path fill-rule="evenodd" d="M9 16C9 15.4477 9.44772 15 10 15H22C22.5523 15 23 15.4477 23 16C23 16.5523 22.5523 17 22 17H10C9.44772 17 9 16.5523 9 16Z" fill="#6B7280"/>
                <path fill-rule="evenodd" d="M9 21C9 20.4477 9.44772 20 10 20H22C22.5523 20 23 20.4477 23 21C23 21.5523 22.5523 22 22 22H10C9.44772 22 9 21.5523 9 21Z" fill="#6B7280"/>
              </svg>
            </button>
            <button @click="onHideSidebar" v-else class="p-1">
              <svg width="20" height="20" viewBox="0 0 16 16">
                <path fill="#374151" fill-rule="evenodd" d="M16 1.622L9.622 8 16 14.378 14.378 16 8 9.622 1.622 16 0 14.378 6.378 8 0 1.622 1.622 0 8 6.378 14.378 0z"/>
              </svg>
            </button>
          </div>
        </div>
      </section>
      <div :class="['fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50', isSidebar ? 'translate-x-0' : '-translate-x-full']">
        <div class="pt-16 px-4">
          <ul class="space-y-4">
            <li>
              <a href="/" class="block py-2 text-gray-800 hover:text-purple-600">Produk</a>
            </li>
            <li>
              <a href="/about-us" class="block py-2 text-gray-800 hover:text-purple-600">Berry</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const isStaticNav = ref(false);
const isSidebar = ref(false);

function onShowSidebar() {
  isSidebar.value = true;
}

function onHideSidebar() {
  isSidebar.value = false;
}

const handleScroll = () => {
  if (window.scrollY > 0) {
    isStaticNav.value = true;
  } else {
    isStaticNav.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* Anda bisa menambahkan custom styling di sini jika diperlukan */
</style>