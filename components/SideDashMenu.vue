<template>
  <aside class="sidebar lg:block lg:w-1/5 hidden">
    <NuxtLink to="/" class="menu-item" :class="{ active: isActive('/') }">
      <img src="/img/icons/ic-menu-dashboard.svg" class="img-fluid pr-2" />
      <span>Produk</span>
    </NuxtLink>
    <NuxtLink to="/berry" class="menu-item" :class="{ active: isActive('/berry') }">
      <img src="/img/icons/ic-menu-bookmark.svg" class="img-fluid pr-2" />
      <span>Berry</span>
    </NuxtLink>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

const isActive = (path) => {
  return route.path === path;
};
</script>

