import {createContext, useContext, useState} from 'react';
import {jwtDecode} from "jwt-decode";

// 添加默认值
const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, code) => {
    email = email || "";
    code = code || "";
    // ... 其他登录逻辑
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const register = async (email, code, password) => {
    email = email || "";
    code = code || "";
    password = password || "";
    // ... 其他注册逻辑
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 