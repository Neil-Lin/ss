<template>
  <div>
    <button @click="generateStory" :disabled="isLoading">Generate Story</button>
    <div aria-live="assertive"><span v-if="isEmpty">還沒選擇檔案喔！</span></div>
    <div aria-live="polite"><span v-if="isLoading">產出中，請稍待片刻...</span></div> <!-- 生成期间显示等待信息 -->
  </div>
</template>

<script>
export default {
  props: [
    'isLoading', 
    'isEmpty'
  ], // 接收来自父组件的 isLoading 状态
  methods: {
    generateStory() {
      this.$emit('generate');
    },
  },
};
</script>
