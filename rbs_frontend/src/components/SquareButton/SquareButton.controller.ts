import SquareButton from './SquareButton.state'; 

export default class SquareButtonController {
  close(state: TicketState) {
    state.open = false;
  }
  
  open(state: TicketState) {
    state.open = true;
  }
}
