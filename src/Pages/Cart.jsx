import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { KeyboardArrowRight, Add, Remove, DeleteOutline, ShoppingBag } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Contexts/LoginContext";
import axios from "axios";
import Loading from "../Components/Loader/Loading";
import CartProduct from "../Components/CartProduct/CartProduct";
import { API_BASE_URL } from "../config";

const Container = styled.div`
  background-color: #f1f3f6;
  min-height: 100vh;
  padding: 20px 0;
`;

const Wrapper = styled.div`
  max-width: 1248px;
  margin: 0 auto;
  display: flex;
  gap: 16px;
  padding: 0 16px;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const LeftColumn = styled.div`
  flex: 3;
`;

const CartCard = styled.div`
  background: white;
  border-radius: 2px;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
  margin-bottom: 16px;
`;

const Header = styled.div`
  padding: 15px 24px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-size: 18px;
    font-weight: 500;
    margin: 0;
  }
`;

const ProductItem = styled.div`
  padding: 24px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  gap: 24px;
`;

const EmptyCart = styled.div`
  background: white;
  padding: 40px;
  text-align: center;
  border-radius: 2px;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);

  img {
    width: 200px;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  p {
    color: #878787;
    margin-bottom: 20px;
  }
`;

const RightColumn = styled.div`
  flex: 1.2;
`;

const PriceDetails = styled.div`
  background: white;
  border-radius: 2px;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
  position: sticky;
  top: 80px;
`;

const PriceHeader = styled.div`
  padding: 13px 24px;
  border-bottom: 1px solid #f0f0f0;
  color: #878787;
  font-weight: 500;
  text-transform: uppercase;
`;

const PriceBody = styled.div`
  padding: 0 24px;
`;

const PriceItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  font-size: 16px;

  .green {
    color: #388e3c;
  }
`;

const TotalAmount = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 24px;
  border-top: 1px dashed #f0f0f0;
  border-bottom: 1px dashed #f0f0f0;
  font-size: 18px;
  font-weight: 700;
  color: #212121;
`;

const Savings = styled.div`
  padding: 12px 24px;
  color: #388e3c;
  font-weight: 600;
  font-size: 14px;
`;

const CheckoutButton = styled.button`
  width: 100%;
  background: #fb641b;
  color: white;
  border: none;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 2px;
  cursor: pointer;
  margin-top: 16px;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.2);

  &:hover {
    background: #f4511e;
  }
`;

const Cart = () => {
  const { loginData, cart, setCart } = useContext(LoginContext);
  const [loading, setLoading] = useState(true);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      if (loginData?.accessToken) {
        try {
          const headers = { token: `Bearer ${loginData.accessToken}` };
          const response = await axios.get(`${API_BASE_URL}/cart/find/${loginData._id}`, { headers });
          const cartItems = response.data.products;
          setCart(cartItems);

          if (cartItems.length > 0) {
            const productIds = cartItems.map(item => item.productId);
            const res = await axios.post(`${API_BASE_URL}/products/getcustom`, { getproduct: productIds }, { headers });
            const productDetails = res.data;

            let total = 0;
            let original = 0;

            cartItems.forEach(item => {
              const details = productDetails.find(p => p._id === item.productId);
              if (details) {
                total += details.price * item.quantity;
                original += Math.round(details.price * 1.25) * item.quantity;
              }
            });

            setTotalPrice(total);
            setOriginalPrice(original);
            setTotalDiscount(original - total);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchCart();
  }, [loginData]);

  const updateQuantity = async (productId, newQty) => {
    if (newQty < 1) return;
    try {
      const headers = { token: `Bearer ${loginData.accessToken}` };
      await axios.put(`${API_BASE_URL}/cart/add`, { userId: loginData._id, product: { productId, quantity: newQty - (cart.find(p => p.productId === productId)?.quantity || 0) } }, { headers });
      setCart(cart.map(item => item.productId === productId ? { ...item, quantity: newQty } : item));
    } catch (err) {
      console.error(err);
    }
  };

  const removeProduct = async (productId) => {
    try {
      const headers = { token: `Bearer ${loginData.accessToken}` };
      await axios.put(`${API_BASE_URL}/cart/remove`, { userId: loginData._id, productId }, { headers });
      setCart(cart.filter(item => item.productId !== productId));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Loading />;

  return (
    <Container>
      <Wrapper>
        {cart?.length > 0 ? (
          <>
            <LeftColumn>
              <CartCard>
                <Header>
                  <h2>My Cart ({cart.length})</h2>
                </Header>
                {cart.map((item, index) => (
                  <CartProduct
                    key={index}
                    product={item}
                    updateQuantity={updateQuantity}
                    removeProduct={removeProduct}
                  />
                ))}
                <div style={{ padding: '16px 24px', textAlign: 'right', background: 'white', boxShadow: '0 -2px 10px rgba(0,0,0,0.05)' }}>
                  <CheckoutButton onClick={() => navigate("/checkout")} style={{ width: '250px' }}>
                    PLACE ORDER
                  </CheckoutButton>
                </div>
              </CartCard>
            </LeftColumn>

            <RightColumn>
              <PriceDetails>
                <PriceHeader>Price Details</PriceHeader>
                <PriceBody>
                  <PriceItem>
                    <span>Price ({cart.length} items)</span>
                    <span>₹{originalPrice}</span>
                  </PriceItem>
                  <PriceItem>
                    <span>Discount</span>
                    <span className="green">- ₹{totalDiscount}</span>
                  </PriceItem>
                  <PriceItem>
                    <span>Delivery Charges</span>
                    <span className="green">FREE</span>
                  </PriceItem>
                </PriceBody>

                <TotalAmount>
                  <span>Total Amount</span>
                  <span>₹{totalPrice}</span>
                </TotalAmount>

                <Savings>
                  You will save ₹{totalDiscount} on this order
                </Savings>
              </PriceDetails>
            </RightColumn>
          </>
        ) : (
          <div style={{ width: '100%' }}>
            <EmptyCart>
              <ShoppingBag sx={{ fontSize: 100, color: '#2874f0', opacity: 0.2 }} />
              <h3>Your cart is empty!</h3>
              <p>Add items to it now.</p>
              <button
                onClick={() => navigate("/")}
                style={{ background: '#2874f0', color: 'white', border: 'none', padding: '12px 40px', cursor: 'pointer', borderRadius: '2px' }}
              >
                Shop Now
              </button>
            </EmptyCart>
          </div>
        )}
      </Wrapper>
    </Container>
  );
};

export default Cart;