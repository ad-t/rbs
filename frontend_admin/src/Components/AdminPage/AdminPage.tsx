import * as React from 'react';
import styled from 'styled-components';
import { AdminNavbar } from './AdminNavbar';
import { AdminFooter } from './AdminFooter';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Body = styled.div`
  flex: 1 1;
`;

type AdminPageProps = React.HTMLAttributes<HTMLDivElement>;

export function AdminPage({ children }: AdminPageProps) {
  return (
    <Wrapper>
      <AdminNavbar />
      <Body>{children}</Body>
      <AdminFooter />
    </Wrapper>
  );
}
