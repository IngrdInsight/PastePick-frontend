"use client";

import { useState } from "react";
import {
  Container,
  TextInput,
  Button,
  Text,
  Group,
  Stack,
  SimpleGrid,
} from "@mantine/core";
import { Search, Info, Plus } from "lucide-react";

export default function Homepage() {
  const [searchValue, setSearchValue] = useState("");

  const stats = [
    { value: "135", label: "Toothpastes" },
    { value: "191", label: "Ingredients" },
  ];

  return (
    <Container
      size="md"
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "2rem 1rem",
      }}
    >
      <Stack align="center" gap="xl">
        <Text
          size="3rem"
          fw={300}
          ta="center"
          style={{
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: "1rem",
          }}
          styles={{
            root: {
              "@media (maxWidth: 768px)": {
                fontSize: "2rem",
              },
            },
          }}
        >
          PastePick
        </Text>

        {/* Search Bar */}
        <TextInput
          size="lg"
          placeholder="Search for an ingredient, brand or product"
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
          leftSection={<Search size={24} />}
          styles={{
            root: {
              width: "100%",
              maxWidth: "600px",
            },
            input: {
              borderRadius: "50px",
            },
          }}
        />

        {/* Action Buttons */}
        <Group gap="md" mt="md" justify="center" wrap="nowrap">
          <Button
            variant="subtle"
            size="md"
            leftSection={<Info size={18} />}
            styles={{
              root: {
                "@media (maxWidth: 768px)": {
                  fontSize: "0.875rem",
                  padding: "1rem 1rem",
                },
              },
            }}
          >
            How we determine scores
          </Button>
          <Button
            variant="subtle"
            size="md"
            leftSection={<Plus size={18} />}
            styles={{
              root: {
                "@media (maxWidth: 768px)": {
                  fontSize: "0.875rem",
                  padding: "0.5rem 1rem",
                },
              },
            }}
          >
            Add your product
          </Button>
        </Group>

        {/* Stats */}
        <SimpleGrid
          cols={{ base: 1, xs: 2 }}
          spacing="xl"
          mt="3rem"
          style={{ width: "100%", maxWidth: "600px" }}
        >
          {stats.map((stat) => (
            <Stack key={stat.label} align="center" gap={4}>
              <Text size="2.5rem" fw={300} lh={1}>
                {stat.value}
              </Text>
              <Text size="sm" c="dimmed" fw={500}>
                {stat.label}
              </Text>
            </Stack>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
}
