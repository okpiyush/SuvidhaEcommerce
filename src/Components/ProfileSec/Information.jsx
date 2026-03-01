import React, { useContext } from 'react';
import styled from 'styled-components';
import { LoginContext } from '../../Contexts/LoginContext';

const Section = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #212121;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  max-width: 600px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.span`
  font-size: 14px;
  color: #878787;
`;

const Value = styled.div`
  padding: 12px;
  background: #f1f3f6;
  border-radius: 2px;
  font-size: 14px;
  color: #212121;
  border: 1px solid #e0e0e0;
`;

const AddressCard = styled.div`
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 2px;
  margin-top: 16px;
  position: relative;
`;

const EditButton = styled.button`
  color: #2874f0;
  background: none;
  border: none;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
`;

const Information = () => {
  const { loginData } = useContext(LoginContext);

  return (
    <div>
      <Section>
        <SectionTitle>Personal Information <EditButton>Edit</EditButton></SectionTitle>
        <InfoGrid>
          <InfoItem>
            <Label>Username</Label>
            <Value>{loginData?.username}</Value>
          </InfoItem>
          <InfoItem>
            <Label>Email Address</Label>
            <Value>{loginData?.email}</Value>
          </InfoItem>
        </InfoGrid>
      </Section>

      <Section>
        <SectionTitle>Manage Addresses</SectionTitle>
        <AddressCard>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ background: '#f0f0f0', padding: '2px 8px', fontSize: '10px', fontWeight: 600, borderRadius: '2px' }}>HOME</span>
            <EditButton>Edit</EditButton>
          </div>
          <div style={{ fontWeight: 600, marginBottom: '4px' }}>{loginData?.username}</div>
          <div style={{ fontSize: '14px', color: '#212121', lineHeight: '1.5' }}>
            {loginData?.address || "No address saved yet. Add one during your next checkout!"}
          </div>
        </AddressCard>
      </Section>
    </div>
  );
};

export default Information;