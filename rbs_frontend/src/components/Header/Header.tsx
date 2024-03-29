import React from 'react';
import { Container, Menu, Image, List } from 'semantic-ui-react';
import CovidImage from './covid-safe-logo.png';

interface BookingHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  showName: string;
}

export function BookingHeader({ showName }: BookingHeaderProps) {
  return (
    <Menu inverted>
      <Container>
        <Menu.Menu position="left">
          <Menu.Item>
            <Image size="tiny" src={CovidImage} style={{ width: '64px' }} />
          </Menu.Item>
          <Menu.Item>
            <List>
              <List.Item>
                <strong>{showName}</strong>
              </List.Item>
            </List>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}
