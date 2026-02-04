<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { getDirectory as getDirectoryApi } from '@/api/directory'
import type { DirectoryItem } from '@/api/directory'
import { Icon } from '@iconify/vue'
import { isImage, isJpg, isPng } from '@/utils/checkFileType'

const router = useRouter()
const authStore = useAuthStore()

let directoryList = ref<DirectoryItem[]>([])
const baseUrl = import.meta.env.VITE_BASE_URL

const route = useRoute()

watch(() => route.fullPath, () => {
  getDirectory()
})

const getDirectory = async () => {
  const res = await getDirectoryApi(route.fullPath)
  directoryList.value = res.data || []
}

getDirectory()


function viewSlideshow(filename: string) {
  router.push({
    path: '/slideshow',
    query: {
      dir: route.fullPath,
      filename
    }
  })
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

          <!-- 图片类型-->
          <el-card v-else-if="isImage(item.name)" 
            @click="viewSlideshow(item.name)" 
            shadow="hover" 
            style="cursor: pointer"
          >
          <div style="width: 200px; height: 150px; ">
            <img style="width: 100%; height: 100%;object-fit: contain;" :src="`${baseUrl}${route.fullPath}/${item.name}`" />
          </div>
           

            <template #footer>
              <div>
                <Icon v-if="isJpg(item.name)" icon="tabler:file-type-jpg"></Icon>
                <Icon v-else-if="isPng(item.name)" icon="tabler:file-type-jpeg"></Icon>
                <Icon v-else icon="lucide:file-image"></Icon>
                {{ item.name }}
              </div>
            </template>
          </el-card>
        </el-col>
      </el-row>
    </el-main>

  </el-container>
</template>