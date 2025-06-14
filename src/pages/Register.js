import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useNotification } from "@/components/NotificationCenter";
import { registerByEmail, sendVerificationCode } from "@/api/user";
import loginBackground from "@/assets/login_background.png";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const handleSendCode = async () => {
    if (!email) {
      addNotification({ title: "错误", message: "请输入邮箱地址", type: "error" });
      return;
    }

    setLoading(true);
    try {
      await sendVerificationCode(email);
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
        if (countdown === 0) clearInterval(timer);
      }, 1000);
      setIsCodeSent(true);
      addNotification({ title: "成功", message: "验证码已发送，请查收邮箱", type: "success" });
    } catch (error) {
      addNotification({ title: "错误", message: "验证码发送失败，请稍后重试", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerByEmail({ email, code });
      addNotification({ title: "成功", message: "注册成功", type: "success" });
      navigate("/");
    } catch (error) {
      addNotification({ title: "错误", message: error.message || "注册失败，请重试", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBackground})` }}
    >
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-purple-100">
        <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">
          注册新账号
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="请输入邮箱"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="验证码"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              className="flex-1 focus:ring-purple-500 focus:border-purple-500"
            />
            <Button
              type="button"
              onClick={handleSendCode}
              disabled={isCodeSent || countdown > 0}
              className="w-32 bg-purple-100 hover:bg-purple-200 text-purple-600"
            >
              {countdown > 0 ? `${countdown}秒后重试` : "获取验证码"}
            </Button>
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
