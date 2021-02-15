import React from 'react';
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom'

const AdminNavbar = (props) => (
  <Menu fixed='top' inverted>
    <Container>
      <Menu.Item as={Link} header to='/welcome'>
        <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} />
        Admin Panel
      </Menu.Item>
      {/*<Menu.Item link as={Link} to='/welcome'>Home</Menu.Item>*/}

      {/* TODO: hide if no event selected */}
      <Dropdown item simple text='Bookings'>
        <Dropdown.Menu>
          <Dropdown.Item>Manual Booking</Dropdown.Item>
          <Dropdown.Item as={Link} to='/find-booking'>Find Booking</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Header>Super Admin</Dropdown.Header>
          <Dropdown.Item as={Link} to='/bookings'>Bookings List</Dropdown.Item>
          {/*
          <Dropdown.Item>
            <i className='dropdown icon' />
            <span className='text'>Submenu</span>
            <Dropdown.Menu>
              <Dropdown.Item>List Item</Dropdown.Item>
              <Dropdown.Item>List Item</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Item>
          <Dropdown.Item>List Item</Dropdown.Item>
          */}
        </Dropdown.Menu>
      </Dropdown>

      <Menu.Menu position='right'>
        {/* TODO: dynamically load events */}
        {/*
        <Dropdown item simple text='Select Event&hellip;'>
          <Dropdown.Menu>
            <Dropdown.Header>Events</Dropdown.Header>

            <Dropdown.Item>Med Revue 2021</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>More Actions</Dropdown.Header>
            <Dropdown.Item>Create Event</Dropdown.Item>
            <Dropdown.Item>Event List</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        */}
        <Menu.Item><strong>Med Revue 2021</strong></Menu.Item>
        {/* TODO: implement logout */}
        <Menu.Item as='a'>Logout</Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
);

export default AdminNavbar;
