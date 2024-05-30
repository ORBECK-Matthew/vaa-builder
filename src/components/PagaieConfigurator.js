import React from "react";
import { BackgroundImage, Box, Center, Grid, Stack, Text } from "@mantine/core";
import { useVaaCustomisation } from "../contexts/VaaCustomisationContext";

export const PagaieConfigurator = () => {
  const { pagaie, setPagaie } = useVaaCustomisation();

  return (
    <Stack spacing="sm" p={30} bg="#228BE61A" w={393}>
      <Grid>
        <Grid.Col span={6}>
          <Box
            h={100}
            onClick={() => setPagaie(0)}
            style={{ cursor: "pointer" }}
          >
            <BackgroundImage
              src="/assets/img/vaaThumb2.png"
              radius="md"
              h={100}
              style={{
                border: pagaie === 0 ? "2px solid blue" : "none",
              }}
            >
              <Center p="xl">
                <Text c="white">Pagaie 1</Text>
              </Center>
            </BackgroundImage>
          </Box>
        </Grid.Col>
        <Grid.Col span={6}>
          <Box
            h={100}
            onClick={() => setPagaie(1)}
            style={{ cursor: "pointer" }}
          >
            <BackgroundImage
              src="/assets/img/pagaieThumb1.png"
              radius="md"
              h={100}
              style={{
                border: pagaie === 1 ? "2px solid blue" : "none",
              }}
            >
              <Center p="xl">
                <Text c="white">Pagaie 2</Text>
              </Center>
            </BackgroundImage>
          </Box>
        </Grid.Col>
        <Grid.Col span={6}>
          <Box
            h={100}
            onClick={() => setPagaie(2)}
            style={{ cursor: "pointer" }}
          >
            <BackgroundImage
              src="/assets/img/pagaieThumb3.png"
              radius="md"
              h={100}
              style={{
                border: pagaie === 2 ? "2px solid blue" : "none",
              }}
            >
              <Center p="xl">
                <Text c="white">Pagaie 3</Text>
              </Center>
            </BackgroundImage>
          </Box>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
