import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState,useHistory } from "react";
import { userRequest } from "../requestMethods";
// import { useHistory } from "react-router-dom";


const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${"" /* align-items:center; */}
  padding: 20px;
  margin: 50px 0;
  ${mobile({ padding: "10px", margin: "10px 0" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;
const TopTexts = styled.div``;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
  ${mobile({ display: "none" })}
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;
const Summery = styled.div`
  flex: 1;
  border: 0.5px solid lightgrey;
  padding: 20px;
  border-radius: 10px;
  height: 50vh;
`;
const SummeryTitle = styled.h1`
  font-weight: 200;
`;
const SummeryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummeryItemText = styled.span``;
const SummeryItemPrice = styled.span``;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Product = styled.div`
  display: flex;

  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.div``;
const ProductId = styled.span``;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.span``;
const PriceDetail = styled.span`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  ${mobile({ marginTop: "10px" })}
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  border: none;
  background-color: #eee;
  height: 1px;
  ${mobile({ marginBottom: "20px" })}
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);

 

  const onToken = (token) => {
    setStripeToken(token);

  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total]);

  console.log(stripeToken);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>Continue Shopping</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Wish List(0)</TopText>
          </TopTexts>
          <TopButton type="filled">Checkout Now</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products?.map((prod) => (
              <Product key={prod._id}>
                <ProductDetail>
                  <Image src={prod.img} />
                  <Details>
                    <ProductName>
                      <b>Product: </b>
                      {prod.title}
                    </ProductName>
                    <ProductId>
                      <b>ID: </b>
                      {prod._id}
                    </ProductId>
                    <ProductColor color={prod.color} />
                    <ProductSize>
                      <b>Size: </b>
                      {prod.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Remove />
                    <ProductAmount>{prod.quantity}</ProductAmount>
                    <Add />
                  </ProductAmountContainer>
                  <ProductPrice>$ {prod.price * prod.quantity}</ProductPrice>
                </PriceDetail>
              </Product>
            ))}
          </Info>
          <Summery>
            <SummeryTitle>Order Summery</SummeryTitle>
            <SummeryItem>
              <SummeryItemText>Subtotal</SummeryItemText>
              <SummeryItemPrice>{cart.total}</SummeryItemPrice>
            </SummeryItem>
            <SummeryItem>
              <SummeryItemText>Estimated Shipping</SummeryItemText>
              <SummeryItemPrice>$ 5.90</SummeryItemPrice>
            </SummeryItem>
            <SummeryItem>
              <SummeryItemText>Shipping Discount</SummeryItemText>
              <SummeryItemPrice>$ -5.90</SummeryItemPrice>
            </SummeryItem>
            <SummeryItem type="total">
              <SummeryItemText>Total</SummeryItemText>
              <SummeryItemPrice>{cart.total}</SummeryItemPrice>
            </SummeryItem>
            <StripeCheckout
              name="Mintes Shop"
              image="https://github.com/mintesGeb/E-Commerce/blob/main/react-mini/src/images/home/favicon.png?raw=true"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey="pk_test_51KDddTB2P3fva0aNfoTxnm7NxRRuxrcp9SPK9grPxcORAQZYHecWykS4l8xIwnlczB0LiTm4ptY5yHpCDCQzlTWX00SWoKSj9E"
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summery>
        </Bottom>
      </Wrapper>

      <Footer />
    </Container>
  );
};

export default Cart;
