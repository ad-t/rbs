/*
 * This file will handle information relating to the show
 */
import React from 'react';
import moment from 'moment';
import { Button } from 'semantic-ui-react';

interface ShowNight {
  id: number;
  reservedSeats: number;
  time: string;
  totalSeats: number;
}

interface Props {
  updateShow(selectedShow: number): void;
}
interface State {
  showNights: Array<ShowNight>;
}

export default class SelectShow extends React.Component<Props, State> {
  state = {
    showNights: [],
  };

  componentDidMount = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/productions/${process.env.REACT_APP_PROD_ID}/shows`
    );
    if (res.status === 200) {
      const data = await res.json();
      this.setState({ showNights: data });
    }
  };

  render() {
    const { showNights } = this.state;
    const btnElms: Array<JSX.Element> = [];

    showNights.forEach((e: ShowNight) => {
      console.log(e);
      btnElms.push(
        <Button
          key={e.id}
          size="large"
          fluid
          primary
          onClick={() => this.props.updateShow(e.id)}
        >
          {moment(e.time).format('h:mmA - Do MMMM YYYY')}
        </Button>
      );
    });

    return (
      <React.Fragment>
        <div className="btn-show-nights">{btnElms}</div>
      </React.Fragment>
    );
  }
}
