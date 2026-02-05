<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { getDirectory as getDirectoryApi } from '@/api/directory'
import type { DirectoryItem } from '@/api/directory'
import { Icon } from '@iconify/vue'
import { isImage, isJpg, isPng, isVideo } from '@/utils/checkFileType'
import VideoList from './components/VideoList.vue'

interface ImageItem extends DirectoryItem {
  src: string;
}

const router = useRouter()
const authStore = useAuthStore()

let directoryList = ref<DirectoryItem[]>([])
const baseUrl = import.meta.env.VITE_BASE_URL

const route = useRoute()

const directoryPath = computed(() => {
  return route.fullPath.split('/').slice(2).join('/')
})

watch(directoryPath, () => {
  getDirectory()
})

const getDirectory = async () => {
  const res = await getDirectoryApi(directoryPath.value)
  directoryList.value = res.data || []
}

getDirectory()

const fileMap = computed(() => {
  const videoList:ImageItem[] = []
  const imageList:ImageItem[] = []
  const folderList:DirectoryItem[] = []
  const otherList:DirectoryItem[] = []

  directoryList.value.forEach((item) => {

    // 文件夹
    if (item.type === 'directory' && item.name !== '@eaDir') {
      folderList.push(item)
    } else if (isImage(item.name)) {
      imageList.push({
        ...item, 
        src: `${baseUrl}${directoryPath}/${item.name}`
      })
    } else if (isVideo(item.name)) {
      videoList.push({
        ...item,
        src: `${baseUrl}${directoryPath}/${item.name}`
      })
    } else {
      otherList.push(item)
    }

  })
  return {
    videoList,
    imageList,
    otherList,
    folderList,
  }
})


const previewSrcList = computed(() => {
  return fileMap.value.imageList.map(item => item.src)
}) 


const jumpDirectory = (dirName:string) => {
  router.push(`${route.fullPath}/${dirName}`)
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
      <p>路径: {{ directoryPath }}</p>
      
      <el-empty v-if="directoryList.length === 0" description="暂无文件" />

      <!-- 文件夹列表 -->
      <div class="folder-list">
          <el-card class="folder-card"
            v-for="item in fileMap.folderList"
            @dblclick="jumpDirectory(item.name)" 
            shadow="hover" 
            style="cursor: pointer"
          >
            <Icon class="icon" icon="lucide:folder"></Icon>
            <div class="name">{{ item.name }}</div>
          </el-card>
      </div>

      <!-- 图片列表 -->
      <div class="image-list">
          <!-- 图片类型-->
          <el-card class="image-card"
            v-for="(item, index) in fileMap.imageList" :key="item.name"
            shadow="hover" 
            style="cursor: pointer"
          >
            <el-image class="img" 
                  lazy 
                  :src="item.src" 
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="previewSrcList"
                  show-progress
                  :initial-index="index"
                  fit="contain"
            />
           
            <template #footer>
              <div class="info">
                <Icon v-if="isJpg(item.name)" icon="tabler:file-type-jpg"></Icon>
                <Icon v-else-if="isPng(item.name)" icon="tabler:file-type-jpeg"></Icon>
                <Icon v-else icon="lucide:file-image"></Icon>
                {{ item.name }}
              </div>
            </template>
          </el-card>
      </div>

      <VideoList :list="fileMap.videoList" />
    </el-main>

  </el-container>
</template>

<style lang="scss" scoped>
.folder-list {
  display: flex;
  flex-wrap: wrap;
}
.folder-card {
  width: 200px;
  height: 200px;
  text-align: center;
  margin: 7px 7px;
  .icon {
    font-size: 60px;
  }
  .name {
    font-weight: bold;
  }
}

.image-list {
  display: flex;
  flex-wrap: wrap;
}
.image-card {
  width: 300px;
  height: 300px;
  margin: 7px;
  :deep(.el-card__body) {
    padding: 0;
  }
  .img {
    display: block;
    width: 100%; 
    height: 100%;
    object-fit: contain;
  }
  .info {
    display: flex;
    align-items: center;
    line-height: 1.2;
  }
}
</style>