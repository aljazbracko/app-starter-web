"use client";
import { Typography, Card } from "antd";
import { useAuth } from "@/context/AuthContext";

const { Title, Paragraph, Text } = Typography;

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <div>
        <Title level={2}>Dashboard</Title>
        <Paragraph>
          Welcome back! You are logged in as <Text strong>{user?.role}</Text>.
        </Paragraph>
      </div>

      <Card>
        <Title level={4}>Protected Content</Title>
        <Paragraph>
          This page is protected and only accessible to authenticated users.
          The middleware automatically redirects unauthenticated users to the login page.
        </Paragraph>
        <Paragraph type="secondary">
          Start building your application by adding more features to this dashboard!
        </Paragraph>
      </Card>
    </div>
  );
}
