/*
 * This component will return an invoice that shows what tickets were purchased from the user.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Button, Divider, Form, Header, Icon,
  Input, Grid, Container, Segment, List, Label
} from 'semantic-ui-react';

/*
// Import our interface
import { ITicket, ITicketDetails } from '../../../types/tickets';

interface Prop {
  selectedShow: number;
  tickets: ITicket[];
  ticketDetails: ITicketDetails[];
  updateTickets(tickets: ITicket[]): void;
  updateTicketDetails(t: ITicketDetails[]): void;
  next(): void;
}

interface Seat {
  seatNum: string;
  wheelchair: number;
  type: number;
  // FIXME: change these to number
  posX: number;
  posY: number;
  booked: number;
}

interface State {
  currentIndex: number;
  seats: Seat[];
}
*/

export default class Ticket extends React.Component {
  state = {
    currentIndex: 0,
    seats: [],
    tickets: [],
    ticketDetails: []
  }

  updateSeats = () => {
    this.props.next();
  }

  constructor(props) {
    super(props);
    this.rootSvg = React.createRef();
  }

  async componentDidMount() {
    const {selectedShow} = this.props;
    const {match: {params}} = this.props;

    const ticketRes = await fetch(`${process.env.REACT_APP_API_URL}/admin/tickets/${params.ticketId}`, {credentials: 'include'});
    let ticketData;
    if (res.status === 200) {
      ticketData = await res.json();
      this.setState({ ticketDetails: [ ticketData ] });
    }

    const res = await fetch(`${process.env.REACT_APP_API_URL}/shows/${ticketData.order.show.id}/seats`);
    if (res.status === 200) {
      const data = await res.json();
      this.setState({ seats: data });
    }

    const root = this.rootSvg.current;
    if (!root) return;

    const size = root.getBBox();
    root.setAttribute('viewBox', `${size.x} ${size.y} ${size.width} ${size.height}`);
  }

  seatMapClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!e.target) return false;
    if (e.target === this.rootSvg.current) return false;

    const target = e.target;
    console.log(target);
    // FIXME: make this more robust
    if (target.dataset.disabled === "1" || target.dataset.disabled === "true") return false;

    let { currentIndex } = this.state;
    if (!target.dataset.seatNumber) return false;

    // Don't allow the same seat to be selected twice.
    if (this.props.ticketDetails.find(a => a.seatNum === target.dataset.seatNumber)) {
      return false;
    }

    let ticketDetails = [...this.props.ticketDetails];
    let details = { ...ticketDetails[currentIndex] };
    details.seatNum = target.dataset.seatNumber;
    ticketDetails[currentIndex] = details;
    this.props.updateTicketDetails(ticketDetails);

    if (currentIndex < ticketDetails.length - 1) {
      currentIndex++;
    }

    this.setState({currentIndex});
  }

  seatIsSelected(seatNum: string) {
    return this.props.ticketDetails.some(t => seatNum === t.seatNum);
  }

  render() {
    const { seats, currentIndex } = this.state;
    const selectionCompleted = this.props.ticketDetails.every(t => !!t.seatNum);

    const seatCircles: any[] = [];
    let total = 0;
    for (let s of seats) {
      // Wheelchair accessible spots are separated anyway.
      // Soft disable seats that are two seats apart
      /*
      const hasNearSeat = !s.wheelchair && !!seats.find(e =>
        e.booked &&
        e.posX - 10 <= s.posX && s.posX <= e.posX + 10 &&
        e.posY - 4 <= s.posY && s.posY <= e.posY + 4
      );
      */
      const disabled = s.type === 0 || s.booked;

      const fill = disabled ? 'grey' : this.seatIsSelected(s.seatNum) ? 'orange' : s.wheelchair ? 'blue' : 'green';
      if (!disabled) total++;
      const circle = <circle
        cx={s.posX}
        cy={s.posY}
        r={2}
        fill={fill}
        data-seat-number={s.seatNum}
        data-disabled={disabled} />

      seatCircles.push(circle);
    }

    console.log(total);

    let selectedSeats = [];
    let i = 0;
    let { tickets, ticketDetails } = this.props;
    for (let details of ticketDetails) {
      const ticketType = tickets.find(t => details.typeId === t.id);
      const description = (ticketType && ticketType.description) || "";

      const currIndex = i;

      selectedSeats.push(
        <List.Item>
          Ticket {i + 1} ({description}): <Label horizontal color={i === currentIndex ? 'blue' : 'grey'} onClick={() => this.setState({currentIndex: currIndex})}>{details.seatNum || "Select"}</Label>
        </List.Item>
      )
      i++;
    }

    return (
      <div style={{margin: '0em 1em'}}>
      <Header as='h2'>Reallocate Seat</Header>
      <p><span style={{color:'green'}}>Green:</span> available, <span style={{color:'orange'}}>orange:</span> selected by you, grey: unavailable</p>
      <Grid stackable>
        <Grid.Row columns={2}>
          <Grid.Column>
          <svg viewBox='0 0 200 200' style={{display: "block"}}
              onClick={this.seatMapClick} ref={this.rootSvg}>
            <rect x="-10" y="0" width="224" height="200" fill="#222" rx="2" ry="2" />
            <text textAnchor="middle" x="102" y="15" fill="#eee" fontSize="0.6em">Stage</text>
            {seatCircles}
          </svg>
          </Grid.Column>
          <Grid.Column>

          <Segment>
          <List>
          {selectedSeats}
          </List>
          </Segment>
          <Button primary floated='right' disabled={!selectionCompleted} onClick={this.updateSeats}>Next</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </div>
    );
  }
};

