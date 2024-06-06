import { Affix, Button, Title } from "@mantine/core";

export const EndGameScene = ({ onPlayAgain, onConfigure }) => {
  return (
    <>
      <Affix
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Title
          order={1}
          style={{
            textAlign: "center",
            fontSize: "48px",
            fontFamily: "PoetsenOne",
          }}
        >
          Félicitations
        </Title>
        <Button style={{ margin: "2px" }} onClick={onPlayAgain}>
          Rejouer
        </Button>
        <Button style={{ margin: "2px" }} color="green" onClick={onConfigure}>
          Configurer
        </Button>
      </Affix>
    </>
  );
};
