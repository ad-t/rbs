/*
 * This component will return an invoice that shows what tickets were purchased from the user.
 */
import React from 'react';
import {
  Button,
  Divider,
  Form,
  Header,
  Icon,
  Input,
  Grid,
  Container,
  Segment,
  List,
  Label,
} from 'semantic-ui-react';

// Import our interface
import { ITicket, ITicketDetails } from '../../../types/tickets';
import { IDiscount } from '../../../types/discount';

interface Prop {
  selectedShow: number;
  tickets: ITicket[];
  ticketDetails: ITicketDetails[];
  discount: IDiscount | null;
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

export default class Ticket extends React.Component<Prop, State> {
  state = {
    currentIndex: 0,
    seats: [] as Seat[],
  };

  updateSeats = () => {
    this.props.next();
  };

  private rootSvg: React.RefObject<SVGSVGElement>;

  constructor(props: Prop) {
    super(props);
    this.rootSvg = React.createRef();
  }

  async componentDidMount() {
    const { selectedShow } = this.props;
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/shows/${selectedShow}/seats`
    );
    if (res.status === 200) {
      const data = (await res.json()) as Seat[];
      this.setState({ seats: data });
    }

    const root = this.rootSvg.current;
    if (!root) return;

    const size = root.getBBox();
    root.setAttribute(
      'viewBox',
      `${size.x} ${size.y} ${size.width} ${size.height}`
    );
  }

  seatMapClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!e.target) return false;
    if (e.target === this.rootSvg.current) return false;

    const target = e.target as SVGCircleElement;
    console.log(target);
    // FIXME: make this more robust
    if (target.dataset.disabled === '1' || target.dataset.disabled === 'true')
      return false;

    let { currentIndex } = this.state;
    if (!target.dataset.seatNumber) return false;

    // Don't allow the same seat to be selected twice.
    if (
      this.props.ticketDetails.find(
        (a) => a.seatNum === target.dataset.seatNumber
      )
    ) {
      return false;
    }

    const newSeat = this.state.seats.find(
      (a) => a.seatNum === target.dataset.seatNumber
    );
    if (newSeat && newSeat.wheelchair) {
      alert(
        'This is an accessible seat. While you may book this seat, please note this seat may be reallocated for customers requiring an accessible seat.'
      );
    }

    const ticketDetails = [...this.props.ticketDetails];
    const details = { ...ticketDetails[currentIndex] } as ITicketDetails;
    details.seatNum = target.dataset.seatNumber;
    ticketDetails[currentIndex] = details;
    this.props.updateTicketDetails(ticketDetails);

    if (currentIndex < ticketDetails.length - 1) {
      currentIndex++;
    }

    this.setState({ currentIndex });
  };

  seatIsSelected(seatNum: string) {
    return this.props.ticketDetails.some((t) => seatNum === t.seatNum);
  }

  render() {
    const { seats, currentIndex } = this.state;
    const selectionCompleted = this.props.ticketDetails.every(
      (t) => !!t.seatNum
    );
    const partOfGroup = !!this.props.discount?.partOfGroup;

    const seatCircles: any[] = [];
    let total = 0;
    for (const s of seats) {
      // Wheelchair accessible spots are separated anyway.
      // Soft disable seats that are two seats apart
      // Special group purchases (e.g. revue) can book together.
      const hasNearSeat =
        !partOfGroup &&
        !s.wheelchair &&
        !!seats.find(
          (e) =>
            e.booked &&
            e.posX - 10 <= s.posX &&
            s.posX <= e.posX + 10 &&
            e.posY - 4 <= s.posY &&
            s.posY <= e.posY + 4
        );
      const disabled = s.type === 0 || s.booked || hasNearSeat;

      const fill = disabled
        ? 'grey'
        : this.seatIsSelected(s.seatNum)
        ? 'orange'
        : 'green';
      if (!disabled) total++;
      const circle = (
        <circle
          cx={s.posX}
          cy={s.posY}
          r={2}
          fill={fill}
          data-seat-number={s.seatNum}
          data-disabled={disabled}
        />
      );

      seatCircles.push(circle);
    }

    console.log(total);

    const selectedSeats = [];
    let i = 0;
    const { tickets, ticketDetails } = this.props;
    for (const details of ticketDetails) {
      const ticketType = tickets.find((t) => details.typeId === t.id);
      const description = ticketType?.description || '';

      const currIndex = i;

      selectedSeats.push(
        <List.Item>
          {/* TODO: allow selecting any */}
          {/**/}
          Ticket {i + 1} ({description}):{' '}
          <Label
            horizontal
            color={i === currentIndex ? 'blue' : 'grey'}
            onClick={() => this.setState({ currentIndex: currIndex })}
          >
            {details.seatNum || 'Select'}
          </Label>
        </List.Item>
      );
      i++;
    }

    return (
      <div style={{ margin: '0em 1em' }}>
        <Header as="h2">Seat Selection</Header>
        <p>
          <strong>Note:</strong> tickets and seats are not reserved until
          payment is completed.
        </p>
        <p>
          <span style={{ color: 'green' }}>Green:</span> available,{' '}
          <span style={{ color: 'orange' }}>orange:</span> selected by you,
          grey: unavailable
        </p>
        <Grid stackable>
          <Grid.Row columns={2}>
            <Grid.Column>
              <svg
                viewBox="0 0 200 200"
                style={{ display: 'block' }}
                onClick={this.seatMapClick}
                ref={this.rootSvg}
              >
                <rect
                  x="-10"
                  y="0"
                  width="224"
                  height="200"
                  fill="#222"
                  rx="2"
                  ry="2"
                />
                <text
                  textAnchor="middle"
                  x="102"
                  y="15"
                  fill="#eee"
                  fontSize="0.6em"
                >
                  Stage
                </text>
                {seatCircles}
              </svg>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <List>{selectedSeats}</List>
              </Segment>
              <Button
                primary
                floated="right"
                disabled={!selectionCompleted}
                onClick={this.updateSeats}
              >
                Next
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
