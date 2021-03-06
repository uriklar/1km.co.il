import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';

function formatDistance(distance) {
  if (distance > 1000) {
    return `${(distance / 1000).toFixed(1)} ק"מ ממיקומך`;
  } else {
    return `${distance} מטר ממיקומך`;
  }
}

function ProtestCard({ protestInfo }) {
  const history = useHistory();
  const { displayName, streetAddress, distance, whatsAppLink, telegramLink, meeting_time: meetingTime, notes, id } = protestInfo;
  return (
    <ProtestCardWrapper onClick={() => history.push(`/protest/${id}`)}>
      <ProtestCardTitle>{displayName}</ProtestCardTitle>
      <ProtestCardInfo>
        {streetAddress && (
          <ProtestCardDetail>
            <ProtestCardIcon src="/icons/location.svg" alt="" aria-hidden="true" title="מיקום ההפגנה" />
            {streetAddress}
          </ProtestCardDetail>
        )}
        {meetingTime && (
          <ProtestCardDetail>
            <ProtestCardIcon src="/icons/time.svg" alt="" aria-hidden="true" title="שעת מפגש" />
            {meetingTime}
          </ProtestCardDetail>
        )}
        <ProtestCardDetail>
          <ProtestCardIcon src="/icons/ruler.svg" alt="" aria-hidden="true" title="מרחק" />
          {formatDistance(distance)}
        </ProtestCardDetail>
      </ProtestCardInfo>
      {notes && <ProtestCardDetail style={{ textAlign: 'center' }}>{notes}</ProtestCardDetail>}
      {telegramLink || whatsAppLink ? (
        <>
          {whatsAppLink && (
            <ProtestCardGroupButton type="whatsapp" href={whatsAppLink} target="_blank">
              קבוצת וואטסאפ
            </ProtestCardGroupButton>
          )}
          {telegramLink && (
            <ProtestCardGroupButton type="telegram" href={telegramLink} target="_blank">
              קבוצת טלגרם
            </ProtestCardGroupButton>
          )}
          <ProtestCardGroupButton href="https://forms.gle/xESvVCD6Q2CMXKpUA" target="_blank">
            הקבוצה התמלאה? שלחו קבוצה מעודכנת
          </ProtestCardGroupButton>
        </>
      ) : (
        <ProtestCardGroupButton href="https://forms.gle/xESvVCD6Q2CMXKpUA" target="_blank">
          הוספת קבוצת וואטסאפ
        </ProtestCardGroupButton>
      )}
    </ProtestCardWrapper>
  );
}

const ProtestCardWrapper = styled.div`
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 1px 4px 0px rgba(80, 80, 82, 0.16);
  cursor: pointer;
`;

const ProtestCardTitle = styled.h2`
  margin: 0;
  margin-bottom: 7.5px;
  font-size: 22px;
  font-weight: 600;
`;

const ProtestCardInfo = styled.div`
  margin-bottom: 7.5px;
`;

const ProtestCardDetail = styled.h3`
  margin: 0;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 100;
  margin-bottom: 5px;
`;

const ProtestCardIcon = styled.img`
  width: 17.5px;
  margin-inline-end: 5px;
  user-select: none;
`;

const ProtestCardGroupButton = styled.a`
  display: block;
  max-width: 100%;
  margin-top: 10px;
  padding: 4px 16px;
  background: ${(props) => (props.type ? (props.type === 'whatsapp' ? '#00c647' : '#6AB2E4') : 'blue')};
  color: #fff;
  font-family: Simpler, sans-serif;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  border: none;
  border-radius: 3px;
`;

export default ProtestCard;
