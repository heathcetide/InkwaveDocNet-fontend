import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useNotification } from "@/components/NotificationCenter";
import { sendVerificationCode, loginByEmail } from "@/api/user";
import loginBackground from "@/assets/login_background.png";
import { Github } from "lucide-react";
import {useAuth} from "@/context/AuthContext";

const LoginPage = () => {
  const { refreshUser } = useAuth()
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  // 发送验证码
  const handleSendCode = async () => {
    if (!email) {
      addNotification({ title: "错误", message: "请输入邮箱地址", type: "error" });
      return;
    }

    setIsLoading(true);
    try {
      await sendVerificationCode(email);
      setIsCodeSent(true);
      addNotification({ title: "成功", message: "验证码已发送，请查收邮箱", type: "success" });
    } catch (error) {
      addNotification({ title: "错误", message: "验证码发送失败，请稍后重试", type: "error" });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // 邮箱登录
  const handleLogin = async () => {
    if (!email || !code) {
      addNotification({ title: "错误", message: "请输入邮箱和验证码", type: "error" });
      return;
    }

    setIsLoading(true);
    try {
      const token = await loginByEmail({ email, code });
      console.log(token);
      localStorage.setItem("token", token);
      await refreshUser();
      addNotification({ title: "请求成功", message: "登录成功", type: "success" });
      navigate("/");
    } catch (error) {
      addNotification({ title: "请求失败", message: error.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  // GitHub 登录
  const handleGithubLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${loginBackground})` }}>
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg w-full max-w-md border border-purple-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-800">登录</h2>

        <div className="space-y-4">
          <Input
            label="邮箱"
            type="email"
            placeholder="请输入邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="focus:border-purple-500 focus:ring-purple-500"
          />

          {isCodeSent && (
            <Input
              label="验证码"
              type="text"
              placeholder="请输入验证码"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={isLoading}
              className="focus:border-purple-500 focus:ring-purple-500"
            />
          )}

          <div className="flex justify-between">
            <Button
              onClick={isCodeSent ? handleLogin : handleSendCode}
              disabled={isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isLoading ? "处理中..." : isCodeSent ? "登录" : "发送验证码"}
            </Button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/register"
            className="text-sm text-purple-600 hover:text-purple-500"
          >
            立即注册
          </a>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2  text-gray-500">其他登录方式</span>
            </div>
          </div>

          <div className="mt-6">
            <Button
              disabled
              onClick={handleGithubLogin}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white flex items-center justify-center gap-2"
            >
              <Github className="w-5 h-5" />
              <span>使用 GitHub 登录</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 