import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { LoginContext } from "../Contexts/LoginContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Components/Loader/Loading";
import { API_BASE_URL } from "../config";
import { CheckCircle, LocalShipping, Payment, ShoppingBasket } from '@mui/icons-material';

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

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  flex: 3;
`;

const Section = styled.div`
  background: white;
  border-radius: 2px;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
  margin-bottom: 12px;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  background: ${props => props.active ? '#2874f0' : 'white'};
  color: ${props => props.active ? 'white' : '#878787'};
  padding: 15px 24px;
  display: flex;
  align-items: center;
  gap: 15px;
  font-weight: 600;
  font-size: 16px;

  .step {
    background: ${props => props.active ? 'white' : '#f1f3f6'};
    color: ${props => props.active ? '#2874f0' : '#2874f0'};
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    border-radius: 2px;
  }
`;

const SectionBody = styled.div`
  padding: 24px;
  display: ${props => props.show ? 'block' : 'none'};
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  margin-bottom: 16px;
  font-size: 14px;
  &:focus {
    border-color: #2874f0;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  height: 100px;
  margin-bottom: 16px;
  font-size: 14px;
  &:focus {
    border-color: #2874f0;
    outline: none;
  }
`;

const Button = styled.button`
  background: #fb641b;
  color: white;
  border: none;
  padding: 12px 30px;
  font-weight: 600;
  border-radius: 2px;
  cursor: pointer;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.2);
  &:hover { background: #f4511e; }
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
  .green { color: #388e3c; }
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

const Checkout = () => {
  const { loginData, cart, setCart } = useContext(LoginContext);
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginData) {
      navigate("/login");
      return;
    }
    if (cart.length === 0) {
      navigate("/cart");
      return;
    }

    const fetchDetails = async () => {
      try {
        const headers = { token: `Bearer ${loginData.accessToken}` };
        const productIds = cart.map(item => item.productId);
        const res = await axios.post(`${API_BASE_URL}/products/getcustom`, { getproduct: productIds }, { headers });
        const productDetails = res.data;

        let total = 0;
        let original = 0;
        cart.forEach(item => {
          const details = productDetails.find(p => p._id === item.productId);
          if (details) {
            total += details.price * item.quantity;
            original += Math.round(details.price * 1.25) * item.quantity;
          }
        });
        setTotalPrice(total);
        setOriginalPrice(original);
        setTotalDiscount(original - total);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDetails();
  }, [loginData, cart]);

  const handlePlaceOrder = async () => {
    if (!address) {
      alert("Please enter a shipping address!");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        userId: loginData._id,
        products: cart.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        })),
        amount: totalPrice,
        address: address,
        paymentMethod: "COD",
        status: "pending"
      };

      const headers = { token: `Bearer ${loginData.accessToken}` };
      await axios.post(`${API_BASE_URL}/order/`, orderData, { headers });
      await axios.put(`${API_BASE_URL}/cart/${loginData._id}`, { products: [] }, { headers });
      setCart([]);

      alert("Order placed successfully! Cash on Delivery confirmed.");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("Error placing order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <Container>
      <Wrapper>
        <MainContent>
          {/* Step 1: Login (Implicitly done) */}
          <Section>
            <SectionHeader active={false}>
              <div className="step"><CheckCircle sx={{ fontSize: 16 }} /></div>
              LOGIN ({loginData?.username})
            </SectionHeader>
          </Section>

          {/* Step 2: Shipping Address */}
          <Section>
            <SectionHeader active={step === 1}>
              <div className="step">2</div>
              DELIVERY ADDRESS
            </SectionHeader>
            <SectionBody show={step === 1}>
              <TextArea
                placeholder="Address (House No, Building, Street, Area) *"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <div style={{ display: 'flex', gap: '12px' }}>
                <Button onClick={() => setStep(2)}>DELIVER HERE</Button>
              </div>
            </SectionBody>
            {step > 1 && (
              <div style={{ padding: '0 24px 15px', fontSize: '14px' }}>
                <b>Shipping to:</b> {address}
                <span
                  onClick={() => setStep(1)}
                  style={{ color: '#2874f0', marginLeft: '10px', cursor: 'pointer', fontWeight: 600 }}
                >
                  CHANGE
                </span>
              </div>
            )}
          </Section>

          {/* Step 3: Order Summary */}
          <Section>
            <SectionHeader active={step === 2}>
              <div className="step">3</div>
              ORDER SUMMARY
            </SectionHeader>
            <SectionBody show={step === 2}>
              <p>You have {cart.length} items in your bag.</p>
              <div style={{ padding: '15px 0' }}>
                <b>Payment Method:</b> Cash on Delivery
              </div>
              <Button onClick={handlePlaceOrder}>CONFIRM ORDER</Button>
            </SectionBody>
          </Section>
        </MainContent>

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
              <span>Total Payable</span>
              <span>₹{totalPrice}</span>
            </TotalAmount>
            <div style={{ padding: '16px 24px', color: '#388e3c', fontWeight: 600, fontSize: '14px' }}>
              Your Total Savings on this order: ₹{totalDiscount}
            </div>
          </PriceDetails>

          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '10px', color: '#878787', padding: '0 10px' }}>
            <Payment sx={{ fontSize: 20 }} />
            <span style={{ fontSize: '12px' }}>Safe and Secure Payments. Easy returns. 100% Authentic products.</span>
          </div>
        </RightColumn>
      </Wrapper>
    </Container>
  );
};

export default Checkout;
