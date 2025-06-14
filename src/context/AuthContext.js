import { createContext, useContext, useState, useEffect } from "react";
import { logout as apiLogout, getUserInfo } from "@/api/user";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({
  user: null,
  setUser: () => {},
  logout: () => {},
  refreshUser: () => {},
  initializeUserFromToken: () => {},
  isInitialized: false,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // ✅ 初始化：从 token 解码并尝试拉取完整用户数据
  const initializeUserFromToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded); // 先从 token 解码设置基本信息
        await refreshUser(); // 然后从后端获取完整信息
      } catch (e) {
        console.error("无效 token", e);
        setUser(null);
      }
    }
    setIsInitialized(true);
  };

  // ✅ 手动刷新（例如用户更新后调用）
  const refreshUser = async () => {
    try {
      const data = await getUserInfo();
      setUser(data);
    } catch (err) {
      console.error("获取用户信息失败", err);
      setUser(null);
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    try {
      await apiLogout();
    } catch (e) {
      console.error("登出失败:", e);
    }
    setUser(null);
  };

  useEffect(() => {
    initializeUserFromToken();
  }, []);

  return (
      <AuthContext.Provider
          value={{
            user,
            setUser,
            logout,
            refreshUser,
            initializeUserFromToken,
            isInitialized,
          }}
      >
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
