<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const albumId = String(route.params.id)
const images = ref<string[]>([])
const currentIndex = ref(0)

onMounted(() => {
  images.value = Array.from({ length: 5 }, (_, i) => `https://picsum.photos/800/600?random=${i + 1}`)
})

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length
}

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length
}
</script>

<template>
  <el-container style="min-height: 100vh">
    <el-header>
      <el-button @click="router.back()">返回相册</el-button>
      <h2>幻灯片：{{ albumId }}</h2>
    </el-header>
    <el-main style="text-align: center">
      <div v-if="images.length > 0" style="position: relative; max-width: 800px; margin: 0 auto">
        <img :src="images[currentIndex]" alt="slide" style="width: 100%; border-radius: 8px" />
        <el-button circle @click="prev" style="position: absolute; left: 10px; top: 50%">‹</el-button>
        <el-button circle @click="next" style="position: absolute; right: 10px; top: 50%">›</el-button>
        <div style="margin-top: 10px">
          {{ currentIndex + 1 }} / {{ images.length }}
        </div>
      </div>
      <el-skeleton v-else />
    </el-main>
  </el-container>
</template>