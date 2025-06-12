import { useState, useEffect } from "react";
import api from "../api/client";

export const useDocument = (docId) => {
  const [document, setDocument] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 模拟文档数据
  const mockDocument = {
    id: docId,
    title: "项目需求文档",
    content: "这里是文档内容...",
    owner: "user123",
    createdAt: "2024-03-01",
    updatedAt: "2024-03-15"
  };

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        // 实际应调用API
        // const response = await api.get(`/documents/${docId}`);
        // setDocument(response.data);
        
        // 使用模拟数据
        setDocument(mockDocument);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    if (docId) {
      fetchDocument();
    }
  }, [docId]);

  return { 
    document,
    isLoading,
    error,
    updateDocument: (newData) => setDocument({ ...document, ...newData })
  };
}; 