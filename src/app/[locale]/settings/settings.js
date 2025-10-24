"use client"
import { useState } from 'react';
import { Container, Stack, Text, Select, Button, Group, Divider } from '@mantine/core';
import { Sun, Moon, Globe, Bug, Mail } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Navigation from "@/components/navigation.js";
import {useLocale, useTranslations} from "next-intl";


export default function SettingsPage() {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState(useLocale());
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("home");
  const t = useTranslations('settings');

  const changeLanguage = (locale) => {
    setLanguage(locale);
    const pathWithoutLocale = pathname.replace(/^\/(en|fi|se)/, '');
    router.push(`/${locale}${pathWithoutLocale}`);
  };

  return (
      <Container size="sm" style={{ minHeight: '100vh', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <Stack gap="xl">
          {/* Header */}
          <div>
            <Text size="2rem" fw={300} ta="center" style={{ letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
              {t('title')}
            </Text>
            <Text size="sm" c="dimmed" ta="center">
              {t('subtitle')}
            </Text>
          </div>

          {/* Settings Options */}
          <Stack gap="md" mt="md">

            {/* Theme */}
            <Group gap="md" wrap="nowrap" p="sm">
              <div style={{
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
              </div>
              <div style={{ flex: 1 }}>
                <Text fw={500} size="sm" mb={4}>Theme</Text>
                <Select
                    value={theme}
                    onChange={(value) => setTheme(value || 'light')}
                    data={[
                      { value: 'light', label: 'Light' },
                      { value: 'dark', label: 'Dark' },
                    ]}
                    size="sm"
                    variant="default"
                />
              </div>
            </Group>

            {/* Language */}
            <Group gap="md" wrap="nowrap" p="sm" >
              <div style={{
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Globe size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <Text fw={500} size="sm" mb={4}>Language</Text>
                <Select
                    value={language}
                    onChange={(value) => changeLanguage(value || 'en')}
                    data={[
                      { value: 'en', label: 'English' },
                      { value: 'fi', label: 'Suomi' },
                    ]}
                    size="sm"
                    variant="default"
                />
              </div>
            </Group>

            <Divider my="md" />

            {/* Support */}
            <Group gap="md" wrap="nowrap" p="sm">
              <div style={{
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Mail size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <Text fw={500} size="sm" mb={4}>Support</Text>
                <Button
                    variant="subtle"
                    size="sm" // Was 'xs'
                    p={0}
                    component="a"
                    href="mailto:support@pastepick.com"
                    styles={{
                      root: {
                        fontWeight: 400,
                        height: 'auto',
                        '&:hover': {
                          backgroundColor: 'transparent',
                          textDecoration: 'underline'
                        }
                      }
                    }}
                >
                  support@pastepick.com
                </Button>
              </div>
            </Group>

            {/* Report Bug */}
            <Group gap="md" wrap="nowrap" p="sm">
              <div style={{
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Bug size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <Text fw={500} size="sm" mb={4}>Report a bug</Text>
                <Button
                    variant="subtle"
                    size="sm" // Was 'xs'
                    p={0}
                    component="a"
                    href="blank"
                    target="_blank"
                    styles={{
                      root: {
                        fontWeight: 400,
                        height: 'auto',
                        '&:hover': {
                          backgroundColor: 'transparent',
                          textDecoration: 'underline'
                        }
                      }
                    }}
                >
                  Submit feedback
                </Button>
              </div>
            </Group>
          </Stack>

          {/* Version */}
          <Text size="xs" c="dimmed" ta="center" mt="xl">
            Version 1.0.0
          </Text>
        </Stack>
        <Navigation
            activeTab={activeTab}
            onTabChange={setActiveTab}

        />
      </Container>
  );
}