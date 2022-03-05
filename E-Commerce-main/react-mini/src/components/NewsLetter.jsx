import { Send } from "@material-ui/icons";
import styled from "styled-components";

import { mobile } from "../responsive";

const Container = styled.div`
  height: 60vh;
  background-color: #fff8f3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({})}
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;
const Description = styled.div`
  font-size: 24px;
  font-weight: 300px;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}
`;
const InputContainer = styled.div`
  background-color: white;
  width: 50%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  border: 1px gray solid;
  ${mobile({width:"80%"})}
`;
const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;
const Button = styled.button`
  border: none;
  background-color: teal;
  color: white;
  flex: 1;
`;
const NewsLetter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Get timely updates from your favorite products.</Description>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default NewsLetter;
