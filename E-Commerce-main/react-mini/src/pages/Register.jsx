import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("http://cdn.wallpapername.com/2560x1600/20130122/women%20minimalistic%20redheads%20models%20fashion%20freckles%20cintia%20dicker%20fashion%20model%202560x1600%20wallpap_www.wallpapername.com_51.jpg")
      center;
  display: flex;
  background-size: cover;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  background-color: white;
  ${mobile({ width: "75%" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 400;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const Aggreement = styled.p`
  font-size: 12px;
  margin: 20px 0;
`;
const Button = styled.button`
  border: none;
  width: 40%;
  padding: 15px 20px;
  cursor: pointer;
  background-color: teal;
  color: white;
  font-size: 15px;
`;
const Register = () => {
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="first name" />
          <Input placeholder="last name" />
          <Input placeholder="username" />
          <Input placeholder="email" />
          <Input placeholder="password" />
          <Input placeholder="confirm password" />
          <Aggreement>
            By Creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Aggreement>
          <Button>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
