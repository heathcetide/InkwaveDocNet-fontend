import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { AlertDialog } from "@/components/AlertDialog";
import loginBackground from "@/assets/login_background.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSendCode = async () => {
    if (!email) {
      setError("请输入邮箱");
      return;
    }

    try {
      // 这里调用发送验证码的API
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      setIsCodeSent(true);
      setError("");
    } catch (err) {
      setError(err.message || "验证码发送失败");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !code) {
      setError("请填写邮箱和验证码");
      setLoading(false);
      return;
    }

    try {
      // 这里调用验证码登录的API
      await login(email, code);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "登录失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${loginBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="w-full max-w-md bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-purple-800 dark:text-purple-200">
            欢迎回来
          </h1>
          <p className="text-purple-600/80 dark:text-purple-300/80">
            使用邮箱验证码登录
          </p>
        </div>

        {error && (
          <AlertDialog variant="error" className="mb-4">
            {error}
          </AlertDialog>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Input
              label="邮箱"
              type="email"
              placeholder="请输入邮箱"
              value={email}
              onChange={(value) => setEmail(value || "")}
              required
              className="focus:ring-purple-500 focus:border-purple-500"
            />
            <div className="flex gap-2">
              <Input
                label="验证码"
                type="text"
                placeholder="请输入验证码"
                value={code}
                onChange={(value) => setCode(value || "")}
                required
                className="focus:ring-purple-500 focus:border-purple-500"
              />
              <Button
                type="button"
                onClick={handleSendCode}
                disabled={countdown > 0}
                className="w-32 bg-purple-100 hover:bg-purple-200 text-purple-600"
              >
                {countdown > 0 ? `${countdown}秒后重发` : "获取验证码"}
              </Button>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-purple-600 hover:bg-purple-700"
            loading={loading}
          >
            登录
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-purple-600/80 dark:text-purple-300/80">
          还没有账号？{" "}
          <a
            href="/register"
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            立即注册
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 