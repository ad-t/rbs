import React from 'react';
import { Container, Dropdown, Image, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const AdminNavbar = () => (
  <Menu fixed="top" inverted>
    <Container>
      <Menu.Item as={Link} header to="/welcome">
        <Image size="mini" src="/logo.png" style={{ marginRight: '1.5em' }} />
        Admin Panel
      </Menu.Item>
      <Dropdown item simple text="Bookings">
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/manual-booking">
            Manual Booking
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/find-booking">
            Find Booking
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Header>Super Admin</Dropdown.Header>
          <Dropdown.Item as={Link} to="/bookings">
            Bookings List
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Menu.Menu position="right">
        <Menu.Item>
          <strong>CSE Revue 2021</strong>
        </Menu.Item>
        <Menu.Item as="a">Logout</Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
);

export default AdminNavbar;
