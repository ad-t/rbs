import React from 'react';
import styled from 'styled-components';

import { grey100, grey900, primary900 } from 'src/shared/css.variables';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;

  color: ${grey900};
  font-family: Karla, sans-serif;
  padding: 0.5rem;
`;

const Icon = styled.div`
  background: ${primary900};
  border-radius: 100%;
  color: ${grey100};

  display: flex;
  align-items: center;
  justify-content: center;

  height: 32px;
  width: 32px;
`;

const Name = styled.div`
  margin-left: 0.5rem;
`;

interface ItemProps {
  icon: React.ReactNode;
  name: string;
}

function Item({ icon, name }: ItemProps) {
  return (
    <Wrapper>
      <Icon>{icon}</Icon>
      <Name>{name}</Name>
    </Wrapper>
  );
}

export default Item;
