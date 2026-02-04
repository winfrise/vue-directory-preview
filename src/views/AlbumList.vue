<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { getDirectory as getDirectoryApi } from '@/api/directory'
import type { DirectoryItem } from '@/api/directory'

const router = useRouter()
const authStore = useAuthStore()

let directoryList = ref<DirectoryItem[]>([])

const route = useRoute()

watch(() => route.fullPath, () => {
  getDirectory()
})

const getDirectory = async () => {
  const res = await getDirectoryApi(route.fullPath)
  directoryList.value = res.data || []
}

getDirectory()


function viewSlideshow(id: string) {
  router.push(`/slideshow/${id}`)
}

const jumpDirectory = (dirName:string) => {
  router.push(`${route.fullPath}/${dirName}`)
  console.log(dirName)
}

function logout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <el-container style="min-height: 100vh">
    <el-header style="display: flex; justify-content: space-between; align-items: center">
      <h2>我的相册 📸</h2>
      <el-button @click="logout" type="danger" size="small">退出</el-button>
    </el-header>
    <el-main>
      <p>路径: /我的相册</p>
      {{ decodeURIComponent(route.fullPath) }}
      <el-empty v-if="directoryList.length === 0" description="暂无文件" />
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in directoryList" :key="item.name">
          <el-card @dblclick="jumpDirectory(item.name)" v-if="item.type === 'directory'" shadow="hover" style="cursor: pointer">
            <div>{{ item.name }}</div>
          </el-card>
          <el-card v-else @click="viewSlideshow(item.name)" shadow="hover" style="cursor: pointer">
            <div>{{ item.name }}</div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>