import React from "react";

import Container from "../../components/Container";
import StudyModule from "../../components/StudyModulesContainer";

import styles from "./Study.module.css";

const Study = () => {
  return (
    <Container navTitle="Study">
      <div className={styles.container}>
        <StudyModule
          color1="#02BAEF"
          color2="#006EE5"
          backgroundFigures={
            <>
              <div
                style={{
                  position: "absolute",
                  width: "110px",
                  height: "110px",
                  backgroundImage:
                    "linear-gradient(to bottom right, #006EE5, #02BAEF 70%)",
                  borderRadius: "1000px",
                  top: "40px",
                  left: "410px",
                  transform: "rotate(-80deg)",
                }}
                className={styles.backgroundFigure}
              />
              <div
                style={{
                  position: "absolute",
                  width: "110px",
                  height: "110px",
                  backgroundImage:
                    "linear-gradient(to bottom right, #006EE5, #02BAEF 60%)",
                  borderRadius: "1000px",
                  top: "200px",
                  left: "-40px",
                  transform: "rotate(50deg)",
                }}
                className={styles.backgroundFigure}
              />
              <div
                style={{
                  position: "absolute",
                  width: "110px",
                  height: "110px",
                  backgroundImage:
                    "linear-gradient(to bottom right, #006EE5, #02BAEF 60%)",
                  borderRadius: "1000px",
                  top: "290px",
                  left: "300px",
                  transform: "rotate(0deg)",
                }}
                className={styles.backgroundFigure}
              />
            </>
          }
          leftContentTitle="Flash Cards"
          toRoute={`/flash-cards`}
        />
        <StudyModule
          color1="#169587"
          color2="#A6CA63"
          backgroundFigures={
            <>
              <div
                style={{
                  position: "absolute",
                  width: "300px",
                  height: "300px",
                  backgroundImage:
                    "linear-gradient(to bottom right, #A6CA63, #169587 70%)",
                  borderRadius: "1000px",
                  top: "60px",
                  left: "-40px",
                  transform: "rotate(20deg)",
                }}
                className={styles.backgroundFigure}
              />
            </>
          }
          leftContentTitle="Pomodoro"
          toRoute={`/pomodoros`}
        />
      </div>
    </Container>
  );
};

export default Study;
