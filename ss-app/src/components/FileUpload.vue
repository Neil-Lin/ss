<template>
  <div>
    <label for="files">在這裡上傳文件檔案</label>
    <input id="files" type="file" @change="onFileChange" multiple />
  </div>
</template>

<script>
export default {
  methods: {
    onFileChange(e) {
      const files = Array.from(e.target.files);  // 获取所有选中的文件并转换为数组
      this.$emit('upload', files);  // 传递文件数组
    },
  },
};
</script>
