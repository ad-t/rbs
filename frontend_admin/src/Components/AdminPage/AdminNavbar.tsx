import React from 'react';
import { Container, Dropdown, Image, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import LogoSrc from 'src/Assets/logo.png';

export const AdminNavbar = () => (
  <Menu fixed="top" inverted>
    <Container>
      <Menu.Item as={Link} header to="/welcome">
        <Image size="mini" src={LogoSrc} style={{ marginRight: '1.5em' }} />
        Admin Panel
      </Menu.Item>
      <Dropdown item simple text="Bookings">
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/manual-booking">
            Manual Booking
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/find-booking">
            Check In Ticket
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/bookings">
            Bookings List
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  </Menu>
);
