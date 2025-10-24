import { Container, TextInput, Button, Text, Group, Stack, Paper, SimpleGrid, ActionIcon, rem } from '@mantine/core';
import {Search, Home, ScanLine, Settings, Database} from 'lucide-react';
import {useParams, usePathname, useRouter} from "next/navigation";



export default function BottomNavigation({
  activeTab,
  onTabChange,
  onStartCamera,
}) {

    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const locale = params?.locale || 'en';


    const tabs = [
    { id: "home", label: "home", icon: Home, href: `/${locale}` },
    { id: "scan", label: "scan", icon: ScanLine, href: `/${locale}/scan` },
    { id: "products", label: "products", icon: Database, href: `/${locale}/products` },
    { id: "settings", label: "settings", icon: Settings, href: `/${locale}/settings` },


  ];


  return (
      <Paper
          shadow="sm"
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            borderTop: '1px solid #e9ecef',
            borderRadius: 0,
            zIndex: 100
          }}
          p="xs"
      >
        <Group justify="space-around" maw={500} mx="auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.href;
            const isScan = tab.id === "scan";

            return (
                <Stack
                    key={tab.id}
                    align="center"
                    gap={4}
                    style={{
                      cursor: 'pointer',
                      flex: 1,
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => {
                      if (isScan && onStartCamera) {
                        onStartCamera();
                      } else {
                        router.push(tab.href)
                      }
                    }}
                >

                      <ActionIcon
                          size="lg"
                          variant={isActive ? "light" : "transparent"}
                          color={isActive ? "blue" : "gray"}
                      >
                        <Icon size={20} />
                      </ActionIcon>

                  <Text
                      size="xs"
                      fw={500}
                      c={isActive ? "blue" : "dimmed"}
                  >
                    {tab.label}
                  </Text>
                </Stack>
            );
          })}
        </Group>
      </Paper>
  )
}
