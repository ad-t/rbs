/*
 * This file will handle information relating to the show
 */
import React from 'react';
import { Button } from 'semantic-ui-react';

interface Props {};
interface State {};

export default class SelectShow extends React.Component<Props, State> {
  componentDidMount = async() => {
    const res = await fetch(`http://localhost:5000/productions/${process.env.REACT_APP_PROD_ID}/shows`);
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
    }
  }

  render() {
    return (
      <React.Fragment>
        <Button size='large'>10th December 2019</Button>
      </React.Fragment>
    );
  }
};
