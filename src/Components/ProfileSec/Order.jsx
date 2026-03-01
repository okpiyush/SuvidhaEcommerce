import React, { useState } from 'react';
import styled from 'styled-components';
import { CheckCircle, LocalShipping, HourglassEmpty, ChevronRight, ExpandMore } from '@mui/icons-material';

const OrderCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  margin-bottom: 16px;
  transition: box-shadow 0.2s;
  background: white;

  &:hover {
    box-shadow: 0 4px 12px 0 rgba(0,0,0,.05);
  }
`;

const OrderHeader = styled.div`
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: ${props => props.expanded ? '#f9f9f9' : 'white'};
`;

const HeaderLeft = styled.div`
  display: flex;
  gap: 40px;
`;

const HeaderCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  span:first-child { font-size: 12px; color: #878787; font-weight: 500; }
  span:last-child { font-size: 14px; font-weight: 600; color: #212121; }
`;

const StatusBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.status === 'delivered' ? '#388e3c' : props.status === 'shipped' ? '#2874f0' : '#fb641b'};

  svg { font-size: 18px; }
`;

const OrderDetails = styled.div`
  padding: 24px;
  border-top: 1px solid #f0f0f0;
  background: white;
`;

const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f9f9f9;
  &:last-child { border-bottom: none; }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  span:first-child { font-size: 14px; font-weight: 500; }
  span:last-child { font-size: 12px; color: #878787; }
`;

const Order = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  const getStatusIcon = (status) => {
    if (status === 'delivered') return <CheckCircle />;
    if (status === 'shipped') return <LocalShipping />;
    return <HourglassEmpty />;
  };

  return (
    <OrderCard>
      <OrderHeader expanded={expanded} onClick={() => setExpanded(!expanded)}>
        <HeaderLeft>
          <HeaderCol>
            <span>ORDER ID</span>
            <span>{item._id.substring(0, 10)}...</span>
          </HeaderCol>
          <HeaderCol>
            <span>ORDER PLACED</span>
            <span>{item.createdAt.substring(0, 10)}</span>
          </HeaderCol>
          <HeaderCol>
            <span>TOTAL</span>
            <span>₹{item.amount}</span>
          </HeaderCol>
        </HeaderLeft>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <StatusBadge status={item.status}>
            {getStatusIcon(item.status)}
            {item.status.toUpperCase()}
          </StatusBadge>
          {expanded ? <ExpandMore /> : <ChevronRight />}
        </div>
      </OrderHeader>

      {expanded && (
        <OrderDetails>
          <div style={{ fontWeight: 600, marginBottom: '16px', fontSize: '14px' }}>Items in this order:</div>
          {item.products.map((prod) => (
            <ProductItem key={prod.productId}>
              <ProductInfo>
                <span>Product ID: {prod.productId}</span>
                <span>Quantity: {prod.quantity}</span>
              </ProductInfo>
              <div style={{ fontWeight: 600 }}>₹{item.amount / item.products.length}</div>
            </ProductItem>
          ))}
          <div style={{ marginTop: '20px', borderTop: '1px solid #f0f0f0', paddingTop: '16px', fontSize: '13px', color: '#878787' }}>
            <b>Shipping Address:</b> {item.address}
          </div>
        </OrderDetails>
      )}
    </OrderCard>
  );
};

export default Order;