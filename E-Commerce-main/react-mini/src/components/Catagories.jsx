import styled from "styled-components";
import { catagories } from "../data.js";
import CatagoryItem from "./CatagoryItem";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ flexDirection: "column", padding:0 })}
`;
const Catagories = () => {
  return (
    <Container>
      {catagories.map((item) => (
        <CatagoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Catagories;
