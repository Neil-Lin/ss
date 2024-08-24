# ss sideproject 專案背景

1. 動機：想試試看完全依靠 chatGPT 無腦一步一步寫 Code，建立一個 sideproject   
2. 功能：上傳多個 .docx 檔案，請 LLM 幫我總結一個專案報告文件。
3. 感想：prompt 最棘手，雖然也有問 chatGPT-4o 4o-mini 的 prompt 要怎麼寫會比較好，但還是花了最多時間在試誤。這也應證了我一直覺得花時間在 prompt 上可能會讓大家在專業上分心。

雖然用 chatGPT-4o 就可以了根本不用寫程式，也不用花小錢打 API，   
但選完檔案直接產出還是有一定的爽度。  

## 1. Backend(node)  

預設：  
- 使用 chat-4o-mini 模型  
- 上傳 50mb 大小
- prompt:  
```
    { role: 'system', content: '你是一位資深的專案管理顧問，擅長撰寫專案總結報告。' },
    { role: 'user', content: `請根據以下提供的文件撰寫專案總結報告。請判斷提供的文件內容是否足以撰寫完整的專案報告。如果內容不足，請說明哪些資訊缺失並避免產出不完整的報告。報告應展示專案的背景、目標、關鍵決策、解決方案，以及執行過程中的挑戰與應對措施。此外，若有明確的里程碑和重要時間點，請在報告中適當位置加入。報告應簡潔明瞭、重點突出，並在適當時包含數據支持和未來展望。以下是專案的相關文件：\n\n${combinedContent}` }
```

1. 執行 ```npm ci111   
2. 建立 .env 檔案, 填寫 ```OPENAI_API_KEY=你的 API Key```  
3. 執行 ```node server.js```， 成功的話會看見：  
    Server is running on http://localhost:3000

## 2. 前端(Vue3)  

只有添加無障礙技術，沒做其他什麼事。  

1. 執行 ```npm ci```  
2. 執行 ```npm run serve```， 成功的話會看見：  
    App running at:  
    - Local:   http://localhost:8080/  

## 3. 打開網頁  

http://localhost:8080  


## 4.上傳多個 .docx 檔案  

## 5. 產出範例  

使用 chatGPT-4o 先產出範例文件來測試總結報告長得怎麼樣：  
- 一份需求訪談  
- 一份驗收測試會議紀錄  
- 兩份變更需求紀錄  
- 一份工程師與專案經理的討論紀錄  
- 一份項目移交文件  

# 專案總結報告：技術文檔管理系統  

## 一、專案背景  
隨著技術文件數量的迅速增加，中型科技公司在技術文檔管理上遇到了嚴重挑戰，包括版本控制困難、文檔之間的關聯性管理問題以及合規性要求的滿足。因此，開發技術文檔管理系統以應對這些挑戰，是公司提升效率、增加運營穩定性和合規性的重要步驟。 

## 二、專案目標  
專案的設定目標包括： 
- 自動建立和維護文件的雙向連結。   
- 當文件內容更新時，自動同步相關連結，保證信息的一致性。  
- 生成符合政府規範的技術文檔，簡化手動編輯流程。  
- 支援多部門協作，以增加各部門間文檔互通能力。  
- 提供文檔的歷史版本追蹤及回溯功能。 

## 三、關鍵決策  
1. **驗收測試方案的確立**：  
針對系統功能進行全面測試，確保雙向連結維護、合規文檔生成和系統性能得到充分檢驗。  
2. **變更需求的管理**：  
確定客戶的新增需求（如自動通知和自定義文檔分類功能）並進行有效的影響分析，確定優先級進行開發。 
3. **技術方案的探索**：  
在面對技術挑戰時，採納資深系統架構師提出的折衷方案以平衡前後端負擔，確保系統效能和可用性。  

## 四、解決方案與執行過程 
### 1. 系統開發 
在開發過程中，團隊針對用戶需求設計與實施了解決方案，包括：  
- 確立了文檔自動同步的規則，並在系統內部進行了多次測試以確保穩定性。  
- 開發符合政府標準的文檔生成模組，以降低手動操作需求和更新錯誤。 
### 2. 挑戰與應對 
- **挑戰**：  
在高負載情况下，系統響應速度有所下降。  
- **應對**：  
對系統進行性能優化，使之能在大規模文檔處理時依然保持高效運行。  

## 五、里程碑與重要時間點 
- **啟動日期**：2024年1月 
- **需求訪談**：2024年8月24日 
- **變更需求提出**： 
- CR-001：2024年8月25日（自動通知功能）  
- CR-002：2024年9月1日（自定義文檔標籤）  
- **驗收測試會議**：2024年12月10日  
- **專案正式移交**：2024年12月1日  

## 六、專案結果及使用者回饋  
洞察專案的結果，技術文檔管理系統成功通過所有預定的測試功能，並獲得了參與者的一致好評： 
- 王先生：對於系統的雙向連結功能表示高度滿意，認為顯著提升了文檔管理效率。  
- QA負責人：認為文檔生成符合政府要求，大幅降低了手動編輯錯誤。  
- 專案經理李女士對於系統的整體性能表示肯定，並建議未來引入AI功能進一步提升系統智能化。  

## 七、未來展望 
在成功驗收後，專案將進入正式運營階段，計畫包括： 
- 最後的系統微調與問題修復。 
- 安排用戶培訓，提升操作熟悉度。 
- 在未來版本中考慮引入更多的AI自動化功能，進一步提升使用體驗與系統效率。 

## 八、結論 
技術文檔管理系統專案成功達成各項設定目標，克服了多項挑戰，並為客戶提供了一個高效、智能的文檔管理平台。隨著正式運營的啟動，期望系統能在實際運行中繼續發揮其價值。


https://github.com/user-attachments/assets/39f7181c-f42d-4f1e-8f97-082862497a78






