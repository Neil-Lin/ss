<template>
  <div>
    <h2 v-if="stories.length > 0">產出列表</h2>
    <p v-if="stories.length === 0">期待您產出第一次的專案報告～！</p>
    <div v-for="(story, index) in stories" :key="index">
      <p>{{ story }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['stories'],
};
</script>
