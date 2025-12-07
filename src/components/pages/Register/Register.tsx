"use client";
import { useState } from "react";
import RegisterForm from "@/components/forms/auth/RegisterForm";
import LoginForm from "@/components/forms/auth/LoginForm";
import { useLoginMutation, useRegisterMutation } from "@/util/hook/user";
import { App } from "antd";
import { handleErrorMessage } from "@/util/helpers/handleErrorMessage";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Register() {
  const [showLogin, setShowLogin] = useState(false);
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

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
        setShowLogin(true);
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
        {showLogin ? (
          <LoginForm onFinish={handleLogin} />
        ) : (
          <RegisterForm onFinish={handleRegister} />
        )}
        <div className="auth-switch-text">
          {showLogin ? (
            <span>
              Don&apos;t have an account?{" "}
              <a onClick={() => setShowLogin(false)} className="auth-link">
                Register
              </a>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <a onClick={() => setShowLogin(true)} className="auth-link">
                Log in
              </a>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
