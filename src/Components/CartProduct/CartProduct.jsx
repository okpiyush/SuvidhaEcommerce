import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Add, Remove } from '@mui/icons-material';
import Loading from '../Loader/Loading';
import { API_BASE_URL } from '../../config';

const ItemContainer = styled.div`
  padding: 24px;
  border-bottom: 1px solid #f0f0f0;
  background: white;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  display: flex;
  gap: 24px;
`;

const ImageWrapper = styled.div`
  width: 112px;
  height: 112px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const InfoWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.div`
  font-size: 16px;
  color: #212121;
  cursor: pointer;
  &:hover {
    color: #2874f0;
  }
`;

const SubText = styled.div`
  font-size: 14px;
  color: #878787;
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
`;

const Price = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #212121;
`;

const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 24px;
`;

const QtyControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const QtyButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    border-color: #2874f0;
    color: #2874f0;
  }
`;

const QtyDisplay = styled.div`
  width: 46px;
  height: 28px;
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const TextAction = styled.button`
  background: none;
  border: none;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  cursor: pointer;
  color: #212121;

  &:hover {
    color: #2874f0;
  }
`;

const CartProduct = ({ product: cartItem, updateQuantity, removeProduct }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/products/find/${cartItem.productId}`);
        setProduct(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [cartItem.productId]);

  if (loading) return null;

  return (
    <ItemContainer>
      <MainContent>
        <ImageWrapper>
          <img src={product.img} alt={product.title} />
        </ImageWrapper>
        <InfoWrapper>
          <Title>{product.title}</Title>
          <SubText>Size: {product.size || 'Regular'}</SubText>
          <SubText>Seller: Suvidha Retail</SubText>
          <PriceWrapper>
            <Price>₹{product.price * cartItem.quantity}</Price>
            <span style={{ fontSize: '14px', color: '#388e3c', fontWeight: 600 }}>20% Off 1 applied</span>
          </PriceWrapper>
        </InfoWrapper>
        <div style={{ fontSize: '14px', textAlign: 'right', width: '200px' }}>
          Delivery by Tomorrow, Mon | <span style={{ color: '#388e3c' }}>Free</span>
        </div>
      </MainContent>

      <ActionWrapper>
        <QtyControl>
          <QtyButton
            disabled={cartItem.quantity <= 1}
            onClick={() => updateQuantity(cartItem.productId, cartItem.quantity - 1)}
          >
            <Remove fontSize="small" />
          </QtyButton>
          <QtyDisplay>{cartItem.quantity}</QtyDisplay>
          <QtyButton onClick={() => updateQuantity(cartItem.productId, cartItem.quantity + 1)}>
            <Add fontSize="small" />
          </QtyButton>
        </QtyControl>

        <TextAction>Save for Later</TextAction>
        <TextAction
          style={{ color: '#ff4343' }}
          onClick={() => removeProduct(cartItem.productId)}
        >
          Remove
        </TextAction>
      </ActionWrapper>
    </ItemContainer>
  );
};

export default CartProduct;