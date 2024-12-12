API 規格說明
以下是專案中使用的 API 規格，支援各種 CRUD 操作。


1. 查詢所有學生
請求方式: GET
請求 URL: /api/students

回應範例:
{
  "code": 200,
  "message": "成功",
  "body": [
    {
      "_id": "student1",
      "userName": "john_doe",
      "sid": "001",
      "name": "John Doe",
      "department": "Computer Science",
      "Email": "john.doe@example.com",
      "grade": "3",
      "class": "A",
      "absences": 2
    }
    // More students...
  ]
}

2. 新增學生
請求方式: POST
請求 URL: /api/students
請求體:
{
  "userName": "john_doe",
  "sid": "001",
  "name": "John Doe",
  "department": "Computer Science",
  "Email": "john.doe@example.com",
  "grade": "3",
  "class": "A"
}

回應範例:
{
  "code": 200,
  "message": "學生資料已成功新增"
}

3. 刪除學生
請求方式: DELETE
請求 URL: /api/students/{id}
請求參數:
id (學生 ID)

回應範例:
{
  "code": 200,
  "message": "學生資料已成功刪除"
}

4. 更新學生姓名
請求方式: PUT
請求 URL: /api/students/{id}

請求體:
{
  "name": "New Name"
}

回應範例:
{
  "code": 200,
  "message": "學生資料已成功更新"
}


架構圖
下圖展示了前端、後端與資料庫之間的互動關係。


    +----------------+        +----------------+        +----------------+
    |  Frontend      | <----> |   Backend      | <----> |   Database     |
    |  (React App)   |        |  (Node.js API) |        |   (MongoDB)    |
    +----------------+        +----------------+        +----------------+

Frontend: 使用 React 和 TypeScript 編寫的前端界面，與後端 API 進行資料交互。
Backend: 使用 Node.js 和 Express 實現的 API 伺服器，負責處理前端請求並與資料庫進行互動。
Database: 使用 MongoDB 作為資料庫來存儲學生資料。

流程圖
以下是 CRUD 操作的流程圖，展示了如何處理學生資料。


1. 新增學生 (Create)
[使用者輸入學生資料] --> [按下 "新增資料" 按鈕]
                                |
                                v
                     [發送 POST 請求新增學生]
                                |
                                v
                  [後端成功儲存資料並回傳回應]
                                |
                                v
                   [前端更新學生列表並顯示提示]

2. 查詢學生 (Read)
[使用者選擇查詢方式] --> [按下 "查詢" 按鈕]
                                |
                                v
                     [發送 GET 請求查詢學生]
                                |
                                v
                     [後端返回學生資料]
                                |
                                v
                [前端更新學生列表並顯示查詢結果]

3. 更新學生資料 (Update)
[使用者選擇要修改的學生] --> [按下 "修改資料" 按鈕]
                                    |
                                    v
                         [發送 PUT 請求更新學生資料]
                                    |
                                    v
                       [後端成功更新資料並回傳回應]
                                    |
                                    v
                       [前端更新學生列表並顯示提示]
                       
4. 刪除學生 (Delete)
[使用者選擇要刪除的學生] --> [按下 "刪除資料" 按鈕]
                                    |
                                    v
                         [發送 DELETE 請求刪除學生]
                                    |
                                    v
                       [後端成功刪除資料並回傳回應]
                                    |
                                    v
                       [前端更新學生列表並顯示提示]