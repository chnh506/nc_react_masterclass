import styled from "styled-components";

// interface는 JUST... "object의 모양을 설명하는 역할"이다!
interface ContainerProps {
  bgColor: string;
}

// styled-component에서 Typescript를 활용하려면, 아래처럼 사용해 주면 OK
const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor};
`;

interface CircleProps {
  bgColor: string;
}

function Circle({ bgColor }: CircleProps) {
  return <Container bgColor={bgColor} />;
}

export default Circle;
