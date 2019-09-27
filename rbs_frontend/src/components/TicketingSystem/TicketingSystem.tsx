/*
 * This file will handle the entire landing page.
 */
import React from 'react';

// Import icons
import { FaPlus, FaMinus } from 'react-icons/fa';

interface Props {};
interface State {};

class Ticket extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <div>ARC - GENERAL</div>
        <div className=" br-100"><FaMinus /></div>
        <div>0</div>
        <div className="br-100"><FaPlus /></div>
      </div>
    );
  }
};

export default class TicketingSystem extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <Ticket />
      </div>
    );
  }
};
