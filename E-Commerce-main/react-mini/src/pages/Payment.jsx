import styled from "styled-components";

import StripeCheckout from "react-stripe-checkout";
import { useState, useEffect } from "react";
import axios from "axios";

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background-color: black;
  color: white;
  padding: 20px;
  border-radius: 5px;
  width: 100px;
  &:hover {
    background-color: grey;
  }
`;

const key =
  "pk_test_51KDddTB2P3fva0aNfoTxnm7NxRRuxrcp9SPK9grPxcORAQZYHecWykS4l8xIwnlczB0LiTm4ptY5yHpCDCQzlTWX00SWoKSj9E";

const Payment = () => {
  const [stripeToken, setStripeToken] = useState("none");

  const onToken = (token) => {
    console.log(token);

    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: 2000,
          }
        );
        console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest()
  }, [stripeToken]);

  return (
    <Container>
      <StripeCheckout
        name="Mintes."
        image="https://github.com/mintesGeb/E-Commerce/blob/main/react-mini/src/images/home/favicon.png?raw=true"
        billingAddress
        shippingAddress
        description="Your total is $20"
        amount={2000}
        token={onToken}
        stripeKey={key}
      >
        <Button>Pay Now</Button>
      </StripeCheckout>
    </Container>
  );
};

export default Payment;
