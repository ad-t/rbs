/*
 * This file will handle information relating to the show
 */
import React from 'react';
import moment from 'moment';
import { Button, Header } from 'semantic-ui-react';

interface ShowNight {
  id: number;
  reservedSeats: number;
  time: string;
  totalSeats: number;
};

interface Props {
  updateShow(selectedShow: number, showStr: string): void;
};
interface State {
  showNights: ShowNight[]
};

declare var REACT_APP_PROD_ID: number;
export default class SelectShow extends React.Component<Props, State> {
  state = {
    showNights: []
  };

  componentDidMount = async() => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/productions/${process.env.REACT_APP_PROD_ID}/shows`);
    if (res.status === 200) {
      const data = await res.json();
      this.setState({showNights: data});
    }
  }

  render() {
    const { showNights } = this.state;
    const btnElms: Array<JSX.Element> = [];

    showNights.forEach((e: ShowNight) => {
      console.log(e);
      btnElms.push(
        <Button
          key={e.id}
          size='large'
          fluid
          primary
          onClick={() => this.props.updateShow(e.id, moment(e.time).format('DD MMMM YYYY'))}
        >
          {moment(e.time).format('h:mma - ddd DD MMMM YYYY')}
        </Button>
      )
    });

    return (
      <div className="btn-show-nights">
        <Header as="h2">Select a night</Header>
        <p><strong>Venue:</strong> <a href="https://www.google.com/maps/place/The+Science+Theatre/@-33.9169099,151.2292462,18z/data=!4m5!3m4!1s0x6b12b18b08c4ec05:0x59642a2ddff49922!8m2!3d-33.9172663!4d151.2298228" target="_blank">UNSW Science Theatre</a> (parking and light rail available nearby)</p>
        {btnElms}
      </div>
    );
  }
};
