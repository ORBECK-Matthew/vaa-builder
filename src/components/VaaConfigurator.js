import React from "react";
import { BackgroundImage, Box, Center, Grid, Stack, Text } from "@mantine/core";
import { useVaaCustomisation } from "../contexts/VaaCustomisationContext";

export const VaaConfigurator = () => {
  const { vaa, setVaa } = useVaaCustomisation();

  return (
    <Stack spacing="sm" p={30} bg="#228BE61A" w={350}>
      <Grid>
        <Grid.Col span={6}>
          <Box h={100} onClick={() => setVaa(0)} style={{ cursor: "pointer" }}>
            <BackgroundImage
              src="/assets/img/vaa1Thumb-min.png"
              radius="md"
              h={100}
              style={{
                border: vaa === 0 ? "2px solid blue" : "none",
              }}
            >
              <Center p="xl">
                <Text c="white"></Text>
              </Center>
            </BackgroundImage>
          </Box>
        </Grid.Col>
        <Grid.Col span={6}>
          <Box h={100} onClick={() => setVaa(1)} style={{ cursor: "pointer" }}>
            <BackgroundImage
              src="/assets/img/vaa2Thumb-min.png"
              radius="md"
              h={100}
              style={{
                border: vaa === 1 ? "2px solid blue" : "none",
              }}
            >
              <Center p="xl">
                <Text c="white"></Text>
              </Center>
            </BackgroundImage>
          </Box>
        </Grid.Col>
        <Grid.Col span={6}>
          <Box h={100} onClick={() => setVaa(2)} style={{ cursor: "pointer" }}>
            <BackgroundImage
              src="/assets/img/vaa3Thumb-min.png"
              radius="md"
              h={100}
              style={{
                border: vaa === 2 ? "2px solid blue" : "none",
              }}
            >
              <Center p="xl">
                <Text c="white"></Text>
              </Center>
            </BackgroundImage>
          </Box>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
