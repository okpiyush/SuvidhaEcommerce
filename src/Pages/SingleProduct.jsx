import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ShoppingCart, FlashOn, Star, LocalOffer } from '@mui/icons-material';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../Contexts/LoginContext";
import Loading from "../Components/Loader/Loading";
import { API_BASE_URL } from "../config";
import Discountsubs from '../Components/Discountsubs';

const Container = styled.div`
  background-color: white;
  min-height: 100vh;
  padding: 20px 0;
`;

const Wrapper = styled.div`
  max-width: 1248px;
  margin: 0 auto;
  display: flex;
  gap: 30px;
  padding: 0 16px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 1.2;
  position: sticky;
  top: 85px;
  height: fit-content;

  @media (max-width: 900px) {
    position: static;
  }
`;

const ImageContainer = styled.div`
  border: 1px solid #f0f0f0;
  padding: 20px;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 450px;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionButton = styled.button`
  flex: 1;
  height: 56px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.2);
  color: white;
`;

const AddToCartBtn = styled(ActionButton)`
  background: #ff9f00;
  &:hover { background: #f39700; }
`;

const BuyNowBtn = styled(ActionButton)`
  background: #fb641b;
  &:hover { background: #f4511e; }
`;

const Right = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 500;
  color: #212121;
  margin: 0;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RatingBadge = styled.div`
  background: #388e3c;
  color: white;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const PriceText = styled.span`
  font-size: 28px;
  font-weight: 600;
`;

const OriginalPrice = styled.span`
  font-size: 16px;
  color: #878787;
  text-decoration: line-through;
`;

const Discount = styled.span`
  font-size: 16px;
  color: #388e3c;
  font-weight: 600;
`;

const OfferSection = styled.div`
  margin-top: 10px;
  h4 { font-size: 16px; margin-bottom: 8px; }
`;

const OfferItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  font-size: 14px;
  color: #212121;
`;

const DeliveryInfo = styled.div`
  margin: 20px 0;
  padding: 16px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  display: flex;
  gap: 20px;
  font-size: 14px;
`;

const ReviewSection = styled.div`
  margin-top: 30px;
`;

const ReviewCard = styled.div`
  padding: 16px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  margin-bottom: 12px;
`;

const SingleProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { loginData, fetchCart } = useContext(LoginContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/products/find/${id}`);
                setProduct(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddCart = async () => {
        if (!loginData) {
            navigate("/login");
            return;
        }
        try {
            const headers = { token: `Bearer ${loginData.accessToken}` };
            await axios.put(`${API_BASE_URL}/cart/add`, {
                userId: loginData._id,
                product: { productId: id, quantity: 1 }
            }, { headers });
            await fetchCart();
            alert("Added to cart successfully!");
        } catch (error) {
            alert(error.response?.data || "Something went wrong");
        }
    };

    if (loading) return <Loading />;
    if (!product) return <div>Product not found</div>;

    return (
        <Container>
            <Wrapper>
                <Left>
                    <ImageContainer>
                        <img src={product.img} alt={product.title} />
                    </ImageContainer>
                    <ButtonGroup>
                        <AddToCartBtn onClick={handleAddCart}>
                            <ShoppingCart /> ADD TO CART
                        </AddToCartBtn>
                        <BuyNowBtn onClick={async () => { await handleAddCart(); navigate("/cart"); }}>
                            <FlashOn /> BUY NOW
                        </BuyNowBtn>
                    </ButtonGroup>
                </Left>

                <Right>
                    <div style={{ color: '#878787', fontSize: '14px', marginBottom: '4px' }}>
                        Suvidha Store &gt; {product.categories?.[0] || 'General'}
                    </div>
                    <Title>{product.title}</Title>

                    <RatingContainer>
                        <RatingBadge>4.2 <Star sx={{ fontSize: 12, ml: 0.5 }} /></RatingBadge>
                        <span style={{ color: '#878787', fontWeight: 600, fontSize: '14px' }}>
                            1,248 Ratings & 156 Reviews
                        </span>
                    </RatingContainer>

                    <PriceSection>
                        <div style={{ color: '#388e3c', fontSize: '14px', fontWeight: 600 }}>Special Price</div>
                        <PriceRow>
                            <PriceText>₹{product.price}</PriceText>
                            <OriginalPrice>₹{Math.round(product.price * 1.25)}</OriginalPrice>
                            <Discount>25% off</Discount>
                        </PriceRow>
                    </PriceSection>

                    <OfferSection>
                        <h4>Available offers</h4>
                        <OfferItem>
                            <LocalOffer sx={{ color: '#26a541', fontSize: 18 }} />
                            <span><b>Bank Offer</b> 5% Cashback on Suvidha Axis Bank Card</span>
                        </OfferItem>
                        <OfferItem>
                            <LocalOffer sx={{ color: '#26a541', fontSize: 18 }} />
                            <span><b>Special Price</b> Get extra ₹150 off (price inclusive of cashback/coupon)</span>
                        </OfferItem>
                    </OfferSection>

                    <DeliveryInfo>
                        <div style={{ color: '#878787', minWidth: '80px' }}>Delivery</div>
                        <div>
                            <div style={{ fontWeight: 600 }}>Delivery by Tomorrow, Mon | <span style={{ color: '#388e3c' }}>Free</span></div>
                            <div style={{ fontSize: '12px', color: '#878787', marginTop: '4px' }}>If ordered before 11:59 PM</div>
                        </div>
                    </DeliveryInfo>

                    <div>
                        <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '8px' }}>Description</div>
                        <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#212121' }}>
                            {product.desc || 'No description available for this product.'}
                        </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', margin: '10px 0' }}>
                        <div style={{ fontWeight: 600 }}>Size:</div>
                        <div style={{ padding: '6px 12px', border: '2px solid #2874f0', color: '#2874f0', borderRadius: '2px', fontSize: '14px', fontWeight: 600 }}>
                            {product.size || 'Regular'}
                        </div>
                    </div>

                    <ReviewSection>
                        <h4 style={{ marginBottom: '16px' }}>Ratings & Reviews</h4>
                        <ReviewCard>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                <RatingBadge>5 <Star sx={{ fontSize: 12, ml: 0.5 }} /></RatingBadge>
                                <b>Excellent Product</b>
                            </div>
                            <p style={{ fontSize: '14px', margin: 0 }}>Amazing quality and very fast delivery. Highly recommended!</p>
                            <div style={{ fontSize: '12px', color: '#878787', marginTop: '8px' }}>Kunal - 2 days ago</div>
                        </ReviewCard>
                        <ReviewCard>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                <RatingBadge>4 <Star sx={{ fontSize: 12, ml: 0.5 }} /></RatingBadge>
                                <b>Very Good</b>
                            </div>
                            <p style={{ fontSize: '14px', margin: 0 }}>Value for money. The packaging was also great.</p>
                            <div style={{ fontSize: '12px', color: '#878787', marginTop: '8px' }}>Ravi - 5 days ago</div>
                        </ReviewCard>
                    </ReviewSection>
                </Right>
            </Wrapper>
            <div style={{ marginTop: '50px' }}>
                <Discountsubs />
            </div>
        </Container>
    );
};

export default SingleProduct;