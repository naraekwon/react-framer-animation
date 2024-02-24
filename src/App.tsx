import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(232, 67, 147, 1);
  flex-direction: column;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 50vw;
  gap: 10px;
`;

const Box = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  height: 20px;
  width: 20px;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled(motion.button)`
  margin-top: 40px;
  height: 32px;
  width: 56px;
  border-radius: 4px;
  border: none;
  background-color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
`;

const box = {
  hover: (custom: string) => ({
    scale: 1.1,
    x: ["1", "3"].includes(custom) ? -10 : ["2", "4"].includes(custom) ? 10 : 0,
    y: ["1", "2"].includes(custom) ? -8 : ["3", "4"].includes(custom) ? 8 : 0,
  }),
};

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const button = {
  clicked: (showCircle: boolean) => ({
    scale: showCircle ? 1.2 : 1,
    color: showCircle ? "rgba(214, 48, 49,1.0)" : "rgba(9, 132, 227, 1)",
    fontWeight: showCircle ? 700 : 600,
  }),
};

function App() {
  const [id, setId] = useState<null | string>(null);
  const [showCircle, setShowCircle] = useState<boolean>(false);
  return (
    <Wrapper>
      <Grid>
        {["1", "2", "3", "4"].map((n) => (
          <Box
            onClick={() => setId(n)}
            key={n}
            layoutId={n}
            custom={n}
            variants={box}
            whileHover="hover"
          >
            {n === "2" && !showCircle ? (
              <Circle layoutId="circle" id={n} />
            ) : null}
            {n === "3" && showCircle ? (
              <Circle layoutId="circle" id={n} />
            ) : null}
          </Box>
        ))}
      </Grid>
      <Button
        custom={showCircle}
        variants={button}
        animate="clicked"
        onClick={() => setShowCircle((prev) => !prev)}
      >
        Switch
      </Button>
      <AnimatePresence>
        {id ? (
          <Overlay
            variants={overlay}
            onClick={() => setId(null)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Box
              layoutId={id}
              style={{ width: 200, height: 140, backgroundColor: "white" }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}
export default App;

// done: ball animation
// done: hover
// done: box click
// done: hover button
// done: click button
