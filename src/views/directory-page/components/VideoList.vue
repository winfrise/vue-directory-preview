<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch, nextTick } from 'vue';
const props = defineProps<{
    list: object[]
}>()

let currentVideo = null

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
    <div class="video-list">
        <el-card class="video-card"
        v-for="(item, index) in list" :key="item.name"
        shadow="hover" 
        style="cursor: pointer"
        >

        <video ref="videoRefs" :src="item.src" controls
            @play="handlePlay"
        ></video>
        
        <template #footer>
            <div class="info">
            {{ item.name }}
            </div>
        </template>
        </el-card>
    </div>
</template>

<style lang="scss" scoped>
.video-list {
  display: flex;
  flex-wrap: wrap;
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