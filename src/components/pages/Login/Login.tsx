"use client";
import { useState } from "react";
import LoginForm from "../../forms/auth/LoginForm";
import RegisterForm from "../../forms/auth/RegisterForm";
import { useLoginMutation, useRegisterMutation } from "@/util/hook/user";
import { App } from "antd";
import { handleErrorMessage } from '@/util/helpers/handleErrorMessage';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/AuthContext";

export default function Login() {

  // State
  const [showRegister, setShowRegister] = useState(false);
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  // Hooks
  const router = useRouter();
  const { login } = useAuth();
  const { message } = App.useApp();


  const handleLogin = (values: IUserAuth) => {
    loginMutation.mutate(values, {
      onSuccess: (data) => {
        login(data.accessToken);
        message.success("Login successful!");
        router.push("/dashboard");
      },
      onError: (error) => {
        const errorMsg = handleErrorMessage(error?.message);
        message.error(errorMsg);
      },
    });
  };

  const handleRegister = async (values: IUserAuth & { confirm: string }) => {
    registerMutation.mutate(values, {
      onSuccess: () => {
        message.success("Registration successful! Please log in.");
        setShowRegister(false);
      },
      onError: (error) => {
        const errorMsg = handleErrorMessage(error?.message);
        message.error(errorMsg);
      },
    });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        {showRegister ? (
          <RegisterForm onFinish={handleRegister} />
        ) : (
          <LoginForm onFinish={handleLogin} />
        )}
        <div className="auth-switch-text">
          {showRegister ? (
            <span>
              Already have an account?{" "}
              <a onClick={() => setShowRegister(false)} className="auth-link">
                Log in
              </a>
            </span>
          ) : (
            <span>
              Don&apos;t have an account?{" "}
              <a onClick={() => setShowRegister(true)} className="auth-link">
                Register
              </a>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}