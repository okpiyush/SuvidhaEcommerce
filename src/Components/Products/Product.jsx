import React, { useContext } from "react";
import styled from "styled-components";
import { ShoppingCartOutlined, FavoriteBorder, Star, FlashOn } from '@mui/icons-material';
import { LoginContext } from "../../Contexts/LoginContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config";

const CardContainer = styled.div`
  flex: 1;
  min-width: 240px;
  max-width: 280px;
  background-color: white;
  border-radius: var(--radius);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border: 1px solid #f1f5f9;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    border-color: var(--accent);
  }
`;

const QuickAdd = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--accent);
  color: white;
  padding: 12px;
  text-align: center;
  font-weight: 700;
  font-size: 13px;
  transform: translateY(100%);
  transition: transform 0.3s;
  z-index: 20;
  text-transform: uppercase;
  letter-spacing: 0.1em;

  ${CardContainer}:hover & {
    transform: translateY(0);
  }
`;

const WishlistIcon = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  z-index: 15;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  transition: all 0.2s;

  &:hover {
    color: #ef4444;
    transform: scale(1.1);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f8fafc;
  position: relative;
  overflow: hidden;

  img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    transition: transform 0.5s ease;
  }

  ${CardContainer}:hover img {
    transform: scale(1.1);
  }
`;

const Body = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Category = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const Title = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: var(--text-main);
  margin: 0;
  line-height: 1.4;
  height: 42px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const RatingBadge = styled.div`
  background-color: rgba(16, 185, 129, 0.1);
  color: var(--accent);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-top: 4px;
`;

const CurrentPrice = styled.span`
  font-size: 18px;
  font-weight: 800;
  color: var(--primary);
`;

const OldPrice = styled.span`
  font-size: 13px;
  color: var(--text-muted);
  text-decoration: line-through;
`;

const DiscountTag = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: #ef4444;
  background: #fee2e2;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: auto;
`;

const Product = ({ item }) => {
  const { loginData, setCart } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!loginData) {
      navigate("/login");
      return;
    }

    try {
      const headers = { token: `Bearer ${loginData.accessToken}` };
      const res = await axios.put(`${API_BASE_URL}/cart/add`, {
        userId: loginData._id,
        product: { productId: item._id, quantity: 1 }
      }, { headers });

      alert("Added to cart!");
      // Optionally update cart context
    } catch (err) {
      console.error(err);
    }
  };

  const currentPrice = item.price;
  const originalPrice = Math.round(item.price * 1.2); // Simulated discount
  const discountPercent = "20% off";

  return (
    <CardContainer onClick={() => navigate(`/product/${item._id}`)}>
      <WishlistIcon onClick={(e) => e.stopPropagation()}>
        <FavoriteBorder fontSize="small" />
      </WishlistIcon>

      <ImageContainer>
        <img src={item.img} alt={item.title} />
        <QuickAdd onClick={handleAddToCart}>
          Quick Add
        </QuickAdd>
      </ImageContainer>

      <Body>
        <Category>{item.categories?.[0] || 'Modern'}</Category>
        <Title>{item.title}</Title>

        <RatingBadge>
          4.2 <Star sx={{ fontSize: 12 }} />
        </RatingBadge>

        <PriceRow>
          <CurrentPrice>₹{currentPrice}</CurrentPrice>
          <OldPrice>₹{originalPrice}</OldPrice>
          <DiscountTag>-20%</DiscountTag>
        </PriceRow>
      </Body>
    </CardContainer>
  );
};

export default Product;