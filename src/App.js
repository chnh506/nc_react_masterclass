import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const Btn = styled.button`
  color: white;
  background-color: blue;
  border: 0;
  padding: 10px;
  border-radius: 15px;
`;

const Input = styled.input.attrs({ required: true, minLength: 10 })`
  background-color: whitesmoke;
`;

function App() {
  return (
    <Father as="header">
      <Btn>Log In</Btn>
      <Btn as="a" href="https://www.notion.so/" target="_blank">
        Go To Notion
      </Btn>
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
    </Father>
  );
}

export default App;
