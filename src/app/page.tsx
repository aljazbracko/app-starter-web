"use client";
import { Typography } from "antd";
import { useAuth } from "@/context/AuthContext";

const { Title, Paragraph } = Typography;

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div>
      <Title level={1}>Welcome to App Starter</Title>
      <Paragraph>
        A clean Next.js starter template with authentication built-in.
      </Paragraph>

      {user ? (
        <Paragraph>
          You are logged in as <strong>{user.role}</strong>. Start building your application!
        </Paragraph>
      ) : (
        <Paragraph>
          Get started by logging in or creating a new account.
        </Paragraph>
      )}
    </div>
  );
}
