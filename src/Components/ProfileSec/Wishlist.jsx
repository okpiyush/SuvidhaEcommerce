import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { LoginContext } from '../../Contexts/LoginContext';
import axios from 'axios';
import Loading from '../Loader/Loading';
import { API_BASE_URL } from '../../config';
import Product from '../Products/Product';
import { FavoriteBorder } from '@mui/icons-material';

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

const WishlistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

const Wishlist = () => {
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loginData } = useContext(LoginContext);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (loginData?.wishlist?.length > 0) {
        try {
          const headers = { token: `Bearer ${loginData.accessToken}` };
          const res = await axios.post(`${API_BASE_URL}/products/getcustom`, { getproduct: loginData.wishlist }, { headers });
          setWishlistData(res.data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [loginData]);

  if (loading) return <Loading />;

  return (
    <Container>
      <Title>My Wishlist ({wishlistData.length})</Title>
      {wishlistData.length === 0 ? (
        <EmptyState>
          <FavoriteBorder sx={{ fontSize: 60, opacity: 0.2 }} />
          <h3>Your Wishlist is Empty</h3>
          <p>Save items that you like in your wishlist to review them later.</p>
        </EmptyState>
      ) : (
        <WishlistGrid>
          {wishlistData.map((item) => (
            <Product item={item} key={item._id} />
          ))}
        </WishlistGrid>
      )}
    </Container>
  );
};

export default Wishlist;