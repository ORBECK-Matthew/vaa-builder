import { Affix, Button, Title } from "@mantine/core";

export const EndGameScene = ({
  onPlayAgain,
  onConfigure,
  elapsedTime,
  personalBestTime,
}) => {
  return (
    <Affix
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "white",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
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
      <div
        style={{
          fontSize: "1rem",
          marginTop: "10px",
          fontWeight: "bold",
          width: "225px",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          padding: "1rem",
          borderRadius: "5px",
        }}
      >
        Temps réalisé : {elapsedTime}s
      </div>
      {personalBestTime !== null && (
        <div
          style={{
            fontSize: "1rem",
            marginTop: "10px",
            fontWeight: "bold",
            width: "225px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            color: "black",
            padding: "1rem",
            borderRadius: "5px",
          }}
        >
          Record personnel : {personalBestTime}s
        </div>
      )}
    </Affix>
  );
};
