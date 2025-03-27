<template>
  <Head>
    <Title v-if="route.meta.title">
      {{ `${route.meta.title} | ${appName}` }}
    </Title>
    <Title v-else>{{ appName }}</Title>
  </Head>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const appName = import.meta.env.VITE_APP_NAME

onBeforeMount(() => {})
</script>

<style lang="scss"></style>
