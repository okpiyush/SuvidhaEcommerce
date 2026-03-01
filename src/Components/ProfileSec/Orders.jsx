import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { LoginContext } from '../../Contexts/LoginContext';
import Loading from '../Loader/Loading';
import Order from './Order';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #212121;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  color: #878787;
  text-align: center;
  gap: 12px;

  h3 { color: #212121; font-size: 18px; margin: 0; }
`;

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Orders = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loginData } = useContext(LoginContext);

  useEffect(() => {
    const fetchOrders = async () => {
      if (loginData?._id) {
        try {
          const headers = { token: `Bearer ${loginData.accessToken}` };
          const res = await axios.get(`${API_BASE_URL}/order/find/${loginData._id}`, { headers });
          setOrdersData(res.data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchOrders();
  }, [loginData]);

  if (loading) return <Loading />;

  return (
    <Container>
      <Title>My Orders</Title>
      {ordersData.length === 0 ? (
        <EmptyState>
          <h3>No Orders found</h3>
          <p>It looks like you haven't placed any orders yet.</p>
        </EmptyState>
      ) : (
        <OrdersList>
          {ordersData.map((item) => (
            <Order item={item} key={item._id} />
          ))}
        </OrdersList>
      )}
    </Container>
  );
};

export default Orders;