import { Add, Remove } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div``;
const Wrapper = styled.div`
  display: flex;
  padding: 50px;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;
const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Image = styled.img`
  width: 90%;
  ${"" /* height: 90vh; */}
  ${"" /* object-fit: cover; */}
  ${mobile({ height: "40vh" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "0 10px" })}
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
  margin: 20px 0;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;
const FilterContainer = styled.div`
  display: flex;
  margin: 30px 0px;
  justify-content: space-between;
  width: 50%;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200px;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(p) => p.color};
  margin: 0 5px;
  cursor: pointer;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Button = styled.button`
  padding: 15px;
  border: 2px teal solid;
  cursor: pointer;
  background-color: white;
  font-weight: 500;

  &:hover {
    background-color: #feece9;
  }
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: teal 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

const Product = () => {
  let location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("product/find/" + id);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type == "increase") {
      setQuantity(quantity + 1);
    } else {
      quantity > 1 && setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(addProduct({ ...product, quantity,color,size }));
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>{product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption>{s}</FilterSizeOption>
                ))}
                {/* <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption> */}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("decrease")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("increase")} />
            </AmountContainer>
            <Button onClick={handleAddToCart}>Add to cart</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <NewsLetter />
      <Footer />
    </Container>
  );
};

export default Product;
