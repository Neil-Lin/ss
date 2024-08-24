<template>
  <div id="app">
    <header>
      <a href="#ak-container" title="跳至主要內容" id="ak-jump">跳至主要內容</a>
      <h1>Project Completion Report</h1>
      <noscript> Your browser does not support JavaScript! 您的瀏覽器不支援 JavaScript 功能，若網頁功能無法正常使用時，請開啟瀏覽器 JavaScript 狀態。 </noscript>
    </header>
    <main>
      <a href="#ak-container" title="中央內容區塊" id="ak-container" accesskey="C">:::</a>
      <file-upload @upload="handleFileUpload" />
      <story-generator @generate="handleStoryGeneration" :isLoading="isLoading" :isEmpty="isEmpty"/>
      <story-output :stories="stories" aria-live="polite" :aria-busy="isLoading"/>
    </main>
    <footer>
      <a href="#ak-footer" title="底部資訊區塊" id="ak-footer" accesskey="Z">:::</a>
      ©
    </footer>
  </div>
</template>

<script>
import axios from 'axios';
import FileUpload from './components/FileUpload.vue';
import StoryGenerator from './components/StoryGenerator.vue';
import StoryOutput from './components/StoryOutput.vue';

export default {
  data() {
    return {
      files: [],
      stories: [], // 用于存储所有生成的故事
      isLoading: false, // 控制“等待中...”的显示
      isEmpty: '',
    };
  },
  components: {
    FileUpload,
    StoryGenerator,
    StoryOutput,
  },
  methods: {
    handleFileUpload(files) {
      this.files = files;  // 存储上传的多个文件对象
    },
    async handleStoryGeneration() {
      if (this.files.length === 0) {
        this.isEmpty = true
        return;
      }

      this.isEmpty = false
      this.isLoading = true; // 开始生成时显示“等待中...”

      const formData = new FormData();
      this.files.forEach((file, index) => {
        formData.append(`document_${index}`, file);
      });

      try {
        const response = await axios.post('http://localhost:3000/api/generate-story', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const newStory = response.data.story || 'No story generated';

        // 将新生成的故事添加到 stories 数组的顶部
        this.stories.unshift(newStory);
      } catch (error) {
        console.error('Error generating story:', error);
      } finally {
        this.isEmpty = ''
        this.isLoading = false; // 生成完成后隐藏“等待中...”
      }
    },
  },
};
</script>
