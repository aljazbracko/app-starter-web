"use client";
import { Layout, Space, Typography, Dropdown, Button } from "antd";
import type { MenuProps } from "antd";
import {
  AppstoreOutlined,
  LoginOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
  SettingOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: 'Profile',
      icon: <ProfileOutlined />,
      onClick: () => router.push('/profile'),
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: <SettingOutlined />,
      onClick: () => router.push('/settings'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
      danger: true,
    },
  ];

  return (
    <AntHeader className="app-header">
      {/* Logo & Navigation */}
      <Space size="large">
        <Link href="/" className="logo-link">
          <div className="logo-box">
            <AppstoreOutlined className="logo-icon" />
          </div>
          <Text strong className="logo-text">
            App Starter
          </Text>
        </Link>
        {user && (
          <Link href="/dashboard">
            <Space size="small">
              <DashboardOutlined />
              <Text>Dashboard</Text>
            </Space>
          </Link>
        )}
      </Space>

      {/* Auth Actions */}
      <Space size="middle">
        {user ? (
          <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
            <Space size="small">
              <UserOutlined className="user-icon" />
              <Text strong className="user-name">
                {user.role}
              </Text>
            </Space>
          </Dropdown>
        ) : (
          <Button
            type="primary"
            icon={<LoginOutlined />}
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
        )}
      </Space>
    </AntHeader>
  );
}
