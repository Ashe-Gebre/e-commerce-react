import {
  Facebook,
  Instagram,
  LinkedIn,
  MailOutline,
  Phone,
  Room,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#eee" })}
`;

const Logo = styled.h1``;
const Desc = styled.p`
  margin: 20px 0;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  margin-right: 20px;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;
const Payment = styled.img`
  width: 60%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>Mintes.</Logo>
        <Desc>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3b5998">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="8a3ab9">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="00acee">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="0e76a8">
            <LinkedIn />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> 6202 Springhill Dr, Greenbelt
          MD,20770
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} />
          +1 347 622 8398
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} /> contact@mintesinot.com
        </ContactItem>
        <Payment src="https://content.asos-media.com/-/media/customer-care/images/imported/us/uspaymentmethodsklarna.ash?la=en-us&h=418&w=1385&hash=A8DC189DE960960509E521CB0405352C" />
      </Right>
    </Container>
  );
};

export default Footer;
