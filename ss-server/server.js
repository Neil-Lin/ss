const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const mammoth = require('mammoth');
require('dotenv').config();

const app = express();
const PORT = 3000;

// 设置CORS
app.use(cors());

// 增加请求体大小限制
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(fileUpload());  // 启用文件上传中间件

app.post('/api/generate-story', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files uploaded.');
  }

  let combinedContent = '';  // 用于存储所有文件的合并内容

  try {
    // 遍历所有上传的文件并提取内容
    for (const fileKey in req.files) {
      const document = req.files[fileKey];
      const result = await mammoth.extractRawText({ buffer: document.data });
      combinedContent += result.value + '\n\n';  // 将每个文件的内容添加到 combinedContent 中
    }
    // 通过 OpenAI 生成摘要
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: '你是一位資深的專案管理顧問，擅長撰寫專案總結報告。' },
        { role: 'user', content: `請根據以下提供的文件撰寫專案總結報告。請判斷提供的文件內容是否足以撰寫完整的專案報告。如果內容不足，請說明哪些資訊缺失並避免產出不完整的報告。報告應展示專案的背景、目標、關鍵決策、解決方案，以及執行過程中的挑戰與應對措施。此外，若有明確的里程碑和重要時間點，請在報告中適當位置加入。報告應簡潔明瞭、重點突出，並在適當時包含數據支持和未來展望。以下是專案的相關文件：\n\n${combinedContent}` }
      ],    
      max_tokens: 1500,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });
   
    const story = response.data.choices[0]?.message?.content;
    res.json({ story });
  } catch (error) {
    console.error('Error generating story:', error.response ? error.response.data : error.message);
    res.status(500).send('Error generating story');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
