import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { AlertDialog } from "@/components/AlertDialog";
import loginBackground from "@/assets/login_background.png";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
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

    // 添加空值检查
    if (!email || !code || !password || !confirmPassword) {
      setError("请填写所有字段");
      setLoading(false);
      return;
    }

    // 验证密码是否匹配
    if (password !== confirmPassword) {
      setError("两次输入的密码不一致");
      setLoading(false);
      return;
    }

    try {
      // 这里调用注册的API
      await register(email, code, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "注册失败，请重试");
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
            创建新账号
          </h1>
          <p className="text-purple-600/80 dark:text-purple-300/80">
            加入墨协，开启高效协作
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
              autoComplete="email"
              inputMode="email"
              placeholder="请输入邮箱"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="focus:ring-purple-500 focus:border-purple-500"
            />
            <div className="flex gap-2">
              <Input
                label="验证码"
                type="text"
                placeholder="请输入验证码"
                value={code}
                onChange={(e) => setCode(e.target.value)}
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
            <Input
              label="密码"
              type="password"
              placeholder="请输入密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="focus:ring-purple-500 focus:border-purple-500"
            />
            <Input
              label="确认密码"
              type="password"
              placeholder="请再次输入密码"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-purple-600 hover:bg-purple-700"
            loading={loading}
          >
            注册
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-purple-600/80 dark:text-purple-300/80">
          已有账号？{" "}
          <a
            href="/login"
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            立即登录
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
