import * as React from 'react';
import styled from 'styled-components';
import { Button, Confirm, Container } from 'semantic-ui-react';
import { createSeating } from 'src/Components/Seating/create';

const MainWrapper = styled.div`
  padding: 6rem 1rem 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export function SeatingPage() {
  const [showPopup, setShowPopup] = React.useState(false);
  const { SeatingElement, seatingState } = createSeating();

  function closePopup() {
    setShowPopup(false);
  }

  function open() {
    setShowPopup(true);
  }

  function confirm() {
    //
  }

  return (
    <MainWrapper>
      <Container>
        <SeatingElement />
        <ButtonWrapper>
          <Button primary fluid onClick={open}>
            Confirm Seats
          </Button>
        </ButtonWrapper>
      </Container>
      <Confirm
        content="Are you sure you want to confirm the seating arrangement?"
        open={showPopup}
        onCancel={closePopup}
        onConfirm={confirm}
      />
    </MainWrapper>
  );
}
