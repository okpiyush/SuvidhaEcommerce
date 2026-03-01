import React from 'react';
import styled from "styled-components"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from "@mui/icons-material/Twitter";
import MapIcon from '@mui/icons-material/Map';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Container = styled.footer`
  background-color: var(--primary);
  color: #f8fafc;
  padding: 80px 24px;
`;

const Wrapper = styled.div`
  max-width: 1248px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  h1 {
    font-size: 28px;
    font-weight: 800;
    letter-spacing: -1px;
    margin: 0;
    background: linear-gradient(135deg, white 0%, #94a3b8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .dot {
    width: 8px;
    height: 8px;
    background-color: var(--accent);
    border-radius: 50%;
  }
`;

const Info = styled.p`
  color: #94a3b8;
  font-size: 14px;
  line-height: 1.6;
  max-width: 320px;
`;

const Socials = styled.div`
  display: flex;
  gap: 12px;
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background-color: var(--accent);
    transform: translateY(-4px);
    border-color: var(--accent);
  }
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 8px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ListItem = styled.li`
  color: #94a3b8;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: var(--accent);
    padding-left: 4px;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #94a3b8;
  font-size: 14px;

  svg {
    color: var(--accent);
    font-size: 20px;
  }
`;

const Bottom = styled.div`
  max-width: 1248px;
  margin: 60px auto 0;
  padding-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const Copyright = styled.p`
  color: #64748b;
  font-size: 13px;
`;

const Payment = styled.img`
  height: 30px;
  opacity: 0.6;
  filter: grayscale(1);
  transition: all 0.3s;

  &:hover {
    opacity: 1;
    filter: none;
  }
`;

const Footer = () => {
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Logo>
                        <h1>SUVIDHA</h1>
                        <div className="dot"></div>
                    </Logo>
                    <Info>
                        Redefining the standard of premium retail. Suvidha brings you the finest selection of quality goods with an unparalleled administrative precision.
                    </Info>
                    <Socials>
                        <SocialIcon href="#"><FacebookIcon /></SocialIcon>
                        <SocialIcon href="#"><InstagramIcon /></SocialIcon>
                        <SocialIcon href="#"><TwitterIcon /></SocialIcon>
                        <SocialIcon href="#"><LinkedInIcon /></SocialIcon>
                    </Socials>
                </Left>

                <Column>
                    <Title>Company</Title>
                    <List>
                        <ListItem>About Us</ListItem>
                        <ListItem>Store Locator</ListItem>
                        <ListItem>Careers</ListItem>
                        <ListItem>Sustainability</ListItem>
                    </List>
                </Column>

                <Column>
                    <Title>Support</Title>
                    <List>
                        <ListItem>Order Tracking</ListItem>
                        <ListItem>Privacy Policy</ListItem>
                        <ListItem>Terms of Service</ListItem>
                        <ListItem>FAQs</ListItem>
                    </List>
                </Column>

                <Column>
                    <Title>Contact</Title>
                    <ContactInfo>
                        <ContactItem>
                            <MapIcon />
                            <span>XYZ road, Deoghar, Pin :814112</span>
                        </ContactItem>
                        <ContactItem>
                            <PhoneIcon />
                            <span>+91 XXX-XXX-4577</span>
                        </ContactItem>
                        <ContactItem>
                            <EmailIcon />
                            <span>contact@suvidha.com</span>
                        </ContactItem>
                    </ContactInfo>
                </Column>
            </Wrapper>

            <Bottom>
                <Copyright>© 2026 SUVIDHA ENTERPRISE SOLUTIONS. ALL RIGHTS RESERVED.</Copyright>
                <Payment src="https://user-images.githubusercontent.com/52581/44514079-4219bb80-a713-11e8-83a4-88f26bd07e2a.png" />
            </Bottom>
        </Container>
    );
}

export default Footer;