/*
 * This component will return an invoice that shows what tickets were purchased from the user.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Button, Divider, Form, Header, Icon,
  Input, Grid, Container, Segment, List
} from 'semantic-ui-react';

import TicketNoControl from '../TicketNoControl';
import TicketholderDetails from '../TicketholderDetails';

// Import our interface
import { ITicket, ITicketDetails } from '../../../types/tickets';

interface Prop {
  selectedShow: number;
  tickets: Array<ITicket>;
  updateSeats(tickets: Array<ITicket>): void;
}

interface State {
  seatNumber: string;
  selected: Set<string>;
}

let stallsLeft = [{
  start: [10, 10],
  offset: [5, 2],
  row: 'AA',
  col: 1,
  repeat: 10,
  disabled: 1
}, {
  start: [10, 20],
  offset: [5, 2],
  row: 'BB',
  col: 1,
  repeat: 10,
  disabled: 1
}, {
  start: [10, 30],
  offset: [5, 2],
  row: 'CC',
  col: 1,
  repeat: 10,
  disabled: 1
}, {
  start: [10, 40],
  offset: [5, 2],
  row: 'DD',
  col: '1A',
  disabled: 0
}, {
  start: [15, 42],
  offset: [5, 2],
  row: 'DD',
  col: '1B',
  disabled: 0
}, {
  start: [20, 44],
  offset: [5, 2],
  row: 'DD',
  col: '1C',
  disabled: 0
}, {
  start: [25, 46],
  offset: [5, 2],
  row: 'DD',
  col: 1,
  repeat: 6,
  disabled: 0
}, {
  start: [10, 50],
  offset: [5, 2],
  row: 'EE',
  col: 'A',
  repeat: 10,
  disabled: 0
}, {
  start: [0, 56],
  offset: [5 * 5 / 3, 2 * 5 / 3],
  row: 'A',
  col: 1,
  repeat: 3,
  disabled: 0,
  wheelchair: 1
}, {
  start: [25, 66],
  offset: [5, 2],
  row: 'A',
  col: 4,
  repeat: 6,
  disabled: 0
}, {
  start: [55, 78],
  offset: [5, 2],
  row: 'A',
  col: '9A',
  disabled: 0
}, {
  start: [60, 80],
  offset: [5, 2],
  row: 'A',
  col: '9B',
  disabled: 0
}, {
  start: [0, 76],
  offset: [5, 2],
  row: 'C',
  col: 1,
  repeat: 13,
  disabled: 0
}, {
  start: [0, 86],
  offset: [5, 2],
  row: 'D',
  col: 1,
  repeat: 13,
  disabled: 0
}, {
  start: [0, 96],
  offset: [5, 2],
  row: 'E',
  col: 1,
  repeat: 12,
  disabled: 0
}, {
  start: [0, 106],
  offset: [5, 2],
  row: 'F',
  col: 1,
  repeat: 12,
  disabled: 0
}, {
  start: [0, 116],
  offset: [5, 2],
  row: 'G',
  col: 1,
  repeat: 11,
  disabled: 0
}, {
  start: [0, 126],
  offset: [5, 2],
  row: 'H',
  col: 1,
  repeat: 11,
  disabled: 0
}, {
  start: [0, 136],
  offset: [5, 2],
  row: 'I',
  col: 1,
  repeat: 11,
  disabled: 0
}, {
  start: [0, 146],
  offset: [5, 2],
  row: 'J',
  col: 1,
  repeat: 11,
  disabled: 0
}, {
  start: [0, 156],
  offset: [5, 2],
  row: 'K',
  col: '1A',
  disabled: 0
}, {
  start: [5, 158],
  offset: [5, 2],
  row: 'K',
  col: 1,
  repeat: 10,
  disabled: 0
}];

let stallsCentre = [{
  start: [78, 30],
  offset: [6, 0],
  row: 'AA',
  col: 11,
  repeat: 9,
  disabled: 1
}, {
  start: [78, 40],
  offset: [6, 0],
  row: 'BB',
  col: 9,
  repeat: 9,
  disabled: 1
}, {
  start: [78, 50],
  offset: [6, 0],
  row: 'CC',
  col: 11,
  repeat: 9,
  disabled: 1
}, {
  start: [78, 60],
  offset: [6, 0],
  row: 'DD',
  col: 7,
  repeat: 9,
  disabled: 0
}, {
  start: [75, 70],
  offset: [6, 0],
  row: 'EE',
  col: 'K',
  disabled: 0
}, {
  start: [81, 70],
  offset: [6, 0],
  row: 'EE',
  col: 1,
  repeat: 9,
  disabled: 0
}, {
  start: [78, 80],
  offset: [6, 0],
  row: 'A',
  col: 10,
  repeat: 9,
  disabled: 0
}, {
  start: [78, 90],
  offset: [6, 0],
  row: 'B',
  col: 1,
  repeat: 9,
  disabled: 0
}, {
  start: [75, 100],
  offset: [6, 0],
  row: 'C',
  col: 14,
  repeat: 10,
  disabled: 0
}, {
  start: [72, 110],
  offset: [6, 0],
  row: 'D',
  col: 14,
  repeat: 11,
  disabled: 0
}, {
  start: [69, 120],
  offset: [6, 0],
  row: 'E',
  col: 13,
  repeat: 12,
  disabled: 0
}, {
  start: [66, 130],
  offset: [6, 0],
  row: 'F',
  col: 13,
  repeat: 13,
  disabled: 0
}, {
  start: [63, 140],
  offset: [6, 0],
  row: 'G',
  col: 12,
  repeat: 14,
  disabled: 0
}, {
  start: [63, 150],
  offset: [6, 0],
  row: 'H',
  col: 12,
  repeat: 14,
  disabled: 0
}, {
  start: [63, 160],
  offset: [6, 0],
  row: 'I',
  col: 12,
  repeat: 14,
  disabled: 0
}, {
  start: [63, 170],
  offset: [6, 0],
  row: 'J',
  col: 12,
  repeat: 14,
  disabled: 0
}, {
  start: [63, 180],
  offset: [6, 0],
  row: 'K',
  col: 11,
  repeat: 14,
  disabled: 0
}, {
  start: [63, 190],
  offset: [6, 0],
  row: 'K',
  col: 1,
  repeat: 3,
  disabled: 0
}, {
  start: [129, 190],
  offset: [6, 0],
  row: 'L',
  col: 4,
  repeat: 3,
  disabled: 0
}];

let stallsRight = [{
  start: [194, 10],
  offset: [-5, 2],
  row: 'AA',
  col: 30,
  repeat: -10,
  disabled: 1
}, {
  start: [194, 20],
  offset: [-5, 2],
  row: 'BB',
  col: 27,
  repeat: -10,
  disabled: 1
}, {
  start: [189, 32],
  offset: [-5, 2],
  row: 'CC',
  col: 29,
  repeat: -9,
  disabled: 1
}, {
  start: [194, 40],
  offset: [-5, 2],
  row: 'DD',
  col: 26,
  repeat: -11,
  disabled: 0
}, {
  start: [194, 50],
  offset: [-5, 2],
  row: 'EE',
  col: 20,
  repeat: -11,
  disabled: 0
}, {
  start: [199, 58],
  offset: [-5, 2],
  row: 'A',
  col: 28,
  disabled: 0,
  wheelchair: 1
}, {
  start: [189, 62],
  offset: [-5, 2],
  row: 'A',
  col: 27,
  repeat: -9,
  disabled: 0
}, {
  start: [144, 80],
  offset: [5, 2],
  row: 'A',
  col: '19B',
  disabled: 0
}, {
  start: [139, 82],
  offset: [5, 2],
  row: 'A',
  col: '19A',
  disabled: 0
}, {
  start: [204, 76],
  offset: [-5, 2],
  row: 'C',
  col: 36,
  repeat: -13,
  disabled: 0
}, {
  start: [204, 86],
  offset: [-5, 2],
  row: 'D',
  col: 37,
  repeat: -13,
  disabled: 0
}, {
  start: [204, 96],
  offset: [-5, 2],
  row: 'E',
  col: 36,
  repeat: -12,
  disabled: 0
}, {
  start: [204, 106],
  offset: [-5, 2],
  row: 'F',
  col: 37,
  repeat: -12,
  disabled: 0
}, {
  start: [204, 116],
  offset: [-5, 2],
  row: 'G',
  col: 37,
  repeat: -11,
  disabled: 0
}, {
  start: [204, 126],
  offset: [-5, 2],
  row: 'H',
  col: 36,
  repeat: -11,
  disabled: 0
}, {
  start: [204, 136],
  offset: [-5, 2],
  row: 'I',
  col: 36,
  repeat: -11,
  disabled: 0
}, {
  start: [204, 146],
  offset: [-5, 2],
  row: 'J',
  col: 36,
  repeat: -11,
  disabled: 0
}, {
  start: [204, 156],
  offset: [-5, 2],
  row: 'K',
  col: 37,
  repeat: -4,
  disabled: 0
}];


let stalls = [...stallsLeft, ...stallsCentre, ...stallsRight];
// STALLS

export default class Ticket extends React.Component<Prop, State> {
  state = {
    seatNumber: '',
    selected: new Set() as Set<string>
  }

  updateSeats = () => {
    this.props.updateSeats(this.props.tickets);
  }

  private rootSvg: React.RefObject<SVGSVGElement>;

  constructor(props: Prop) {
    super(props);
    this.rootSvg = React.createRef();
  }

  componentDidMount() {
    const root = this.rootSvg.current;
    if (!root) return;

    const size = root.getBBox();
    root.setAttribute('viewBox', `${size.x} ${size.y} ${size.width} ${size.height}`);
  }

  seatMapClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!e.target) return false;
    if (e.target === this.rootSvg.current) return false;
    const target = e.target as SVGCircleElement;
    console.log(target);
    if (target.dataset.disabled === "1") return false;

    const newSet = new Set(this.state.selected);
    if (!target.dataset.seatNumber) return false;
    newSet.add(target.dataset.seatNumber);
    this.setState({seatNumber: target.dataset.seatNumber, selected: newSet});

  }

  render() {
    const seats = [];
    let total = 0;
    for (let group of stalls) {
      const repeat = group.repeat || 1;

      for (let i = 0; i < Math.abs(repeat); ++i) {
        let col;
        if (typeof group.col === 'number') {
          col = i * Math.sign(repeat) + group.col;
        } else if (typeof group.col === 'string' && group.col.length === 1) {
          col = String.fromCharCode(group.col.charCodeAt(0) + i * Math.sign(repeat));
        } else {
          col = group.col;
        }

        const seatNum = group.row + col;
        const fill = group.disabled ? 'grey' : this.state.selected.has(seatNum) ? 'orange' : 'green';
        if (!group.disabled) total++;
        const circle = <circle
          cx={group.start[0] + i * group.offset[0]}
          cy={group.start[1] + i * group.offset[1]}
          r={2}
          fill={fill}
          data-seat-number={seatNum}
          data-disabled={group.disabled} />

        seats.push(circle);
      }
    }

    console.log(total);

    return (
      <div style={{margin: '0em 1em'}}>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column>
          <svg viewBox='0 0 200 200' style={{display: "block"}}
              onClick={this.seatMapClick} ref={this.rootSvg}>
            <rect x="-10" y="0" width="224" height="200" fill="#222" rx="2" ry="2" />
            <text text-anchor="middle" x="102" y="15" fill="#eee" font-size="0.6em">Stage</text>
            {seats}
          </svg>
          </Grid.Column>
          <Grid.Column>
          <Segment>
          Seats selected:
          <List>
          {Array.from(this.state.selected).map(a => <List.Item>{a}</List.Item>)}
          </List>
          </Segment>
          <Button primary floated='right' onClick={this.updateSeats}>Next</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </div>
    );
  }
};

