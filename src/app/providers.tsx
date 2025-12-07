"use client";

import "@ant-design/v5-patch-for-react-19";
import { Layout, App, ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/header/Header";
import { useState, useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  }));

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ConfigProvider
          theme={{
            cssVar: true,
          }}
        >
          <App>
            <Layout className="layout-main">
              <Header />
              <Layout.Content>
                {children}
              </Layout.Content>
            </Layout>
          </App>
        </ConfigProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
