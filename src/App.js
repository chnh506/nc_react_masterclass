import styled, { keyframes } from "styled-components";

const rotationAnimation = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0%;
  }
  50% {
    transform: rotate(180deg);
    border-radius: 50%;
  }
  100% {
    transform: rotate(360deg);
    border-radius: 0%
  }
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  width: 200px;
  height: 200px;
  background-color: tomato;

  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 36px;

    &:hover {
      font-size: 72px;
    }
    &:active {
      opacity: 0;
    }
  }

  animation: ${rotationAnimation} 1s linear infinite;
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <span>🤑</span>
      </Box>
    </Wrapper>
  );
}

export default App;
