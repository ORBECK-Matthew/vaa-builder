import React from "react";
import { BackgroundImage, Box, Center, Grid, Stack, Text } from "@mantine/core";
import { useVaaCustomisation } from "../contexts/VaaCustomisationContext";

export const VaaConfigurator = () => {
  const { vaa, setVaa } = useVaaCustomisation();

  return (
    <Stack spacing="sm" p={30} bg="#228BE61A" w={340}>
      <Grid>
        <Grid.Col span={6}>
          <Box h={100} onClick={() => setVaa(0)} style={{ cursor: "pointer" }}>
            <BackgroundImage
              src="/assets/img/vaaThumb1.png"
              radius="md"
              h={100}
              style={{
                border: vaa === 0 ? "2px solid blue" : "none",
              }}
            >
              <Center p="xl">
                <Text c="white">Vaa 1</Text>
              </Center>
            </BackgroundImage>
          </Box>
        </Grid.Col>
        <Grid.Col span={6}>
          <Box h={100} onClick={() => setVaa(1)} style={{ cursor: "pointer" }}>
            <BackgroundImage
              src="/assets/img/vaaThumb2.png"
              radius="md"
              h={100}
              style={{
                border: vaa === 1 ? "2px solid blue" : "none",
              }}
            >
              <Center p="xl">
                <Text c="white">Vaa 2</Text>
              </Center>
            </BackgroundImage>
          </Box>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
