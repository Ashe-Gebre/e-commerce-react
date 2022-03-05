import styled from "styled-components";
const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageBack = styled.div`
  width: 100px;
  height: 100px;
  background-color: #feece9;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
const Image = styled.img`
  width: 75px;
`;
const Successful = styled.div`
  background-color: green;

  padding: 20px;
  font-size: 30px;
  color: white;
  border-radius: 10px;
  margin-bottom: 20px;
`;
const Desc = styled.span`
  font-size: 20px;
`;

const Success = () => {
  return (
    <Container>
      <ImageBack>
        <Image src="https://github.com/mintesGeb/E-Commerce/blob/main/react-mini/src/images/home/favicon.png?raw=true" />
      </ImageBack>
      <Successful>Successful</Successful>
      <Desc>
        Your order is being prepared. Thanks for choosing Mintes Shop.
      </Desc>
    </Container>
  );
};

export default Success;
