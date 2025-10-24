"use client";

import { Button, Text, Stack, Paper, ActionIcon } from "@mantine/core";
import { Home, ScanLine, Settings, Database } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";

export default function Navigation({}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = params?.locale || "en";

  const tabs = [
    { id: "home", label: "Home", icon: Home, href: `/${locale}` },
    { id: "scan", label: "Scan", icon: ScanLine, href: `/${locale}/scan` },
    {
      id: "products",
      label: "Products",
      icon: Database,
      href: `/${locale}/products`,
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      href: `/${locale}/settings`,
    },
  ];

  const handleClick = (tab) => {
    router.push(tab.href);
  };

  return (
    <Paper
      shadow="xs"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: "auto",
        borderTop: "1px solid #e0e0e0",
        borderRadius: 0,
        zIndex: 100,
      }}
      p="sm"
      className="nav-container"
    >
      {/* Mobile */}
      <Stack
        gap="xs"
        align="center"
        className="nav-mobile"
        style={{ maxWidth: 500, margin: "0 auto" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.href;

            return (
              <Stack
                key={tab.id}
                align="center"
                gap={4}
                style={{
                  cursor: "pointer",
                  flex: 1,
                  transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
                  opacity: isActive ? 1 : 0.7,
                }}
                onClick={() => handleClick(tab)}
              >
                <ActionIcon
                  size="lg"
                  variant="transparent"
                  color={isActive ? "blue" : "gray"}
                  style={{
                    backgroundColor: isActive ? "#e8f0fe" : "transparent",
                    borderRadius: "12px",
                  }}
                >
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                </ActionIcon>
                <Text
                  size="xs"
                  fw={isActive ? 600 : 500}
                  c={isActive ? "blue" : "gray.7"}
                >
                  {tab.label}
                </Text>
              </Stack>
            );
          })}
        </div>
      </Stack>

      {/* Desktop */}
      <Stack
        gap="xs"
        align="center"
        className="nav-desktop"
        style={{ display: "none" }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;

          return (
            <Button
              key={tab.id}
              variant={isActive ? "light" : "subtle"}
              color={isActive ? "blue" : "gray"}
              leftSection={<Icon size={20} strokeWidth={isActive ? 2.5 : 2} />}
              justify="flex-start"
              fullWidth
              style={{
                height: "48px",
                borderRadius: "24px",
                transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
                fontWeight: isActive ? 600 : 500,
              }}
              onClick={() => handleClick(tab)}
            >
              {tab.label}
            </Button>
          );
        })}
      </Stack>

      <style jsx global>{`
                @media (min-width: 768px) {
                    .nav-container {
                        bottom: 0 !important;
                        left: 0 !important;
                        right: auto !important;
                        top: 0 !important;
                        width: 240px !important;
                        height: 100vh !important;
                        border-top: none !important;
                        padding: 16px !important;
                    }

                    .nav-mobile {
                        display: none !important;
                    }

                    .nav-desktop {
                        display: flex !important;
                    }
                }

                @media (max-width: 767px) {
                    .nav-mobile {
                        display: flex !important;
                    }

                    .nav-desktop {
                        display: none !important;
                    }
                }
            `}</style>
    </Paper>
  );
}
