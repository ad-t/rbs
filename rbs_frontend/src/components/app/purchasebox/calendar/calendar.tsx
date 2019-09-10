/*
 * This is a stateless component (SFC = Stateless Function Component) that will just return
 * the display for the calendar icon, telling the user to select a date to book tickets.
 */
import React from 'react';

import CalendarImg from '../../../../assets/img/calendar-custom.png';

interface Props {};

const Calendar: React.SFC<Props> = () => {
  return (
    <div id='calendar-icon'>
      <img src={CalendarImg} alt='calendar icon' />
      <div id='text'>Please select the date you want to see the show to view the ticket options!</div>
    </div>
  );
};

export default Calendar;
