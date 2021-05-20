/*
 * This file will handle information relating to the show
 */
import React from 'react';
import dayjs from 'dayjs';
import { Button, Header } from 'semantic-ui-react';
import { ShowNight } from 'src/shared/types';

interface Props {
  showNights: ShowNight[];
  updateShow(selectedShow: number, showStr: string): void;
}

export default class SelectShow extends React.Component<Props> {
  render() {
    const { showNights } = this.props;
    const btnElms: Array<JSX.Element> = [];

    showNights.forEach((showNight: ShowNight) => {
      const ratio = showNight.reservedSeats / showNight.totalSeats;
      const showIsHourIn =
        dayjs(showNight.time).valueOf() + 60 * 60 * 1000 < Date.now();
      const isSoldout =
        showNight.reservedSeats >= showNight.totalSeats &&
        !window.location.pathname.includes('foh');

      if (showIsHourIn) {
        return;
      }

      btnElms.push(
        <Button
          key={showNight.id}
          size="large"
          fluid
          color={ratio < 0.7 ? 'blue' : ratio < 0.9 ? 'yellow' : 'red'}
          style={{ margin: '1rem 0' }}
          onClick={() =>
            this.props.updateShow(
              showNight.id,
              dayjs(showNight.time).format('DD MMMM YYYY')
            )
          }
          disabled={isSoldout}
        >
          {dayjs(showNight.time).format('h:mma - ddd DD MMMM YYYY')}
          {isSoldout ? ' (SOLD OUT)' : ''}
        </Button>
      );
    });

    return (
      <div>
        <Header as="h2">Select a night</Header>
        <p>
          <strong>Venue:</strong>{' '}
          <a
            href="https://www.google.com/maps/place/The+Science+Theatre/@-33.9169099,151.2292462,18z/data=!4m5!3m4!1s0x6b12b18b08c4ec05:0x59642a2ddff49922!8m2!3d-33.9172663!4d151.2298228"
            target="_blank"
            rel="noreferrer"
          >
            UNSW Science Theatre
          </a>{' '}
          (parking and light rail available nearby)
        </p>
        {btnElms}
      </div>
    );
  }
}
