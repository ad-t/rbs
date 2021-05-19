import React from 'react';
import { Container, Menu, Image, List } from 'semantic-ui-react';
import CovidImage from './covid-safe-logo.png';

interface BookingHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  Logo: React.ReactNode | undefined;
  email: string;
  showName: string;
}

export function BookingHeader({ Logo, email, showName }: BookingHeaderProps) {
  return (
    <Menu inverted>
      <Container>
        {Logo && <Menu.Item header>{Logo}</Menu.Item>}

        <Menu.Menu position="right">
          <Menu.Item>
            <List>
              <List.Item>
                <strong>{showName}</strong>
              </List.Item>
              <List.Item>
                <strong>Need help?</strong>{' '}
                <a href={`mailto:${email}`}>{email}</a>
              </List.Item>
            </List>
          </Menu.Item>
          <Menu.Item>
            <Image size="tiny" src={CovidImage} />
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}
