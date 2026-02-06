<script setup lang="ts">
import { RecycleScroller } from 'vue3-virtual-scroller'
import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css'
import type { VideoItem } from '../types';
import { computed } from 'vue';
const props = defineProps<{
    list: VideoItem[]
}>()

interface VideoRow {
  id: number;        // 唯一行 ID（用于 RecycleScroller 的 key-field）
  items: VideoItem[]; // 该行包含的视频项
}

const chunkList = computed(() => {
  const result: VideoRow[] = []
  for (let i = 0; i < props.list.length; i += 3) {
    result.push({
      id: i,
      items: props.list.slice(i, i + 3)
    })
  }
  return result
})

let currentVideo:HTMLVideoElement | null = null

const handlePlay = (e) => {
    const target = e.target
    if (currentVideo && currentVideo !== target) {
        currentVideo.pause()
    }
    currentVideo = target
}

</script>

<template>
    <!-- 视频列表 -->


      <RecycleScroller
        class="scroller"
        :items="chunkList"
        :item-size="500"
        key-field="id"
      >
        <template #default="{ item: rowData }">
          <div class="video-row">
            <el-card class="video-card"
              shadow="hover" 
              v-for="item in rowData.items"
              :key="item.src"
              style="cursor: pointer"
            >

              <video ref="videoRefs" controls preload="metadata"
                  @play="handlePlay"
              >
                <source :src="item.src" type="video/mp4">
                <source :src="item.src" type="video/webm">
              </video>
              
              <template #footer>
                  <div class="info">
                  {{ item.name }}
                  </div>
              </template>
            </el-card>
          </div>
        </template>
      </RecycleScroller>
</template>

<style lang="scss" scoped>
.video-row {
  display: flex;
  flex-wrap: nowrap;
}
.video-card {
  width: 500px;
  height: 500px;
  margin: 7px;
  :deep(.el-card__body) {
    padding: 0;
  }
  video {
    display: block;
    width: 100%;
    height: 100%;
    background: black;
  }
}
</style>