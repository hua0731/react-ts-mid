import axios from "axios";
import { api } from '../enum/api';  // 從 enum 資料夾中導入 api.ts

export const fetchAPI = {
    // 查詢所有學生
    async findAll() {
        try {
            const response = await axios.get(api.findAll);
            return response.data; // 假设返回的数据结构符合要求
        } catch (error) {
            console.error('Error fetching all students:', error);
            throw error;
        }
    },

    // 新增學生
    async insertOne(student: any) {
        try {
            const response = await axios.post(api.insertOne, student);
            return response.data; // 假设返回的数据结构符合要求
        } catch (error) {
            console.error('Error inserting student:', error);
            throw error;
        }
    },

    // 刪除學生
    async deleteById(id: string) {
        try {
            const response = await axios.delete(`${api.deleteById}/${id}`);
            return response.data; // 假设返回的数据结构符合要求
        } catch (error) {
            console.error('Error deleting student:', error);
            throw error;
        }
    },

    // 更新學生姓名
    async updateNameByID(id: string, name: string) {
        try {
            const response = await axios.put(`${api.updateNameByID}/${id}`, { name });
            return response.data; // 假设返回的数据结构符合要求
        } catch (error) {
            console.error('Error updating student name:', error);
            throw error;
        }
    }
};

// 下面是新增的 `asyncPost`, `asyncPut`, `asyncDelete` 方法：

// 用於發送 POST 請求
export async function asyncPost(url: string, data: any): Promise<any> {
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.error('Error with asyncPost:', error);
        throw error;
    }
}

// 用於發送 PUT 請求
export async function asyncPut(url: string, data: any): Promise<any> {
    try {
        const response = await axios.put(url, data);
        return response.data;
    } catch (error) {
        console.error('Error with asyncPut:', error);
        throw error;
    }
}

// 用於發送 DELETE 請求
export async function asyncDelete(url: string): Promise<any> {
    try {
        const response = await axios.delete(url);
        return response.data;
    } catch (error) {
        console.error('Error with asyncDelete:', error);
        throw error;
    }
}

// 單獨導出 asyncGet
export async function asyncGet(api: string): Promise<any> {
    try {
        const res = await fetch(api);
        return await res.json();
    } catch (error) {
        console.error('Error with asyncGet:', error);
        throw error;
    }
}
