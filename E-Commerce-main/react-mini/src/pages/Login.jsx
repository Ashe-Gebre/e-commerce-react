import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://i.pinimg.com/originals/31/40/ef/3140ef2e0e9becfd697698517122d500.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  padding: 20px;
  width: 25%;
  background-color: white;
  ${mobile({ width: "75%" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 400;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;

const Button = styled.button`
  border: none;
  width: 40%;
  padding: 15px 20px;
  cursor: pointer;
  background-color: teal;
  color: white;
  font-size: 15px;
  &:disabled {
    color: grey;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin-top: 10px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error=styled.span`
color:red;
`

const Login = () => {
  const [username, setUsername] = useState("mintesinot.tekle");
  const [password, setPassword] = useState("123456");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
    console.log(username, password);
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <Form>
          <Input
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            placeholder="password"
            type="password"
            value={password}            
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button onClick={handleClick} disabled={isFetching}>
            CREATE
          </Button>
          {error && <Error>SOMETHING WENT WRONG</Error>}
          <Link>FORGOT PASSWORD</Link>
          <Link>CREATE NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
