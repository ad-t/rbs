import React, {useState} from 'react'
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
  TextArea,
  Form,
  Button,
  Message
} from 'semantic-ui-react'
import AdminNavbar from './Layouts/AdminNavbar'
import AdminFooter from './Layouts/AdminFooter'

async function sendOverride(orderId, amount, name, note) {
  if (typeof name !== "string" || name.length < 1 || typeof note !== "string" || note.length < 1) {
    alert("payment override needs name and reason");
    return false;
  }

  if (amount === undefined || amount < 0) {
    alert("Please enter amount >= 0");
    return false;
  }

  const amountCents = Math.round(amount * 100);
  const showRes = await fetch(`${process.env.REACT_APP_API_URL}/admin/order/${orderId}/override-payment`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      amount: amountCents,
      name,
      note
    })
  });

  return showRes.ok;
}

const OverridePayment = ({ match: { params } }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState();
  const [note, setNote] = useState("");
  const [success, setSuccess] = useState(false);
  const [attempted, setAttempted] = useState(false);

  const handleChange = (e, {name, value}) => {
    switch (name) {
    case 'name':
      setName(value);
      break;
    case 'amount':
      setAmount(value);
      break;
    case 'note':
      setNote(value);
      break;
    }
  };

  return (
    <div>
    <AdminNavbar />

    <Container text style={{ marginTop: '7em' }}>
      <Header as='h1'>Override Payment</Header>
      <p><strong>Order ID: </strong> {params.orderId}</p>
      <Form onSubmit={async () => {
        setSuccess(await sendOverride(params.orderId, amount, name, note));
        setAttempted(true);
      }} success={success} error={attempted && !success}>
        <Form.Input
          label='Overrider name'
          name='name'
          value={name}
          onChange={handleChange}
        />
        <Form.Input
          label='Amount Paid'
          name='amount'
          value={amount}
          onChange={handleChange}
        />
        <Form.Field
          control={TextArea}
          name='note'
          value={note}
          onChange={handleChange}
          label='Reason for override'
        />
        <Button type='submit' primary disabled={success}>Submit</Button>
        <Message error>
          An error occurred
        </Message>
        <Message success>
          Payment successfully overridden
        </Message>
      </Form>
    </Container>

    <AdminFooter />
    </div>
  );
};

export default OverridePayment;
