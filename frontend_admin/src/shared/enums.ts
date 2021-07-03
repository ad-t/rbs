export enum StepItemState {
  ERROR = 'ERROR',
  COMPLETED = 'COMPLETED',
  IN_PROGRESS = 'IN_PROGRESS',
  NOT_STARTED = 'NOT_STARTED',
}

export enum SeatState {
  // Seat has being given to a different user
  TAKEN = 'TAKEN',

  // Seat has being given to the user
  BOOKED = 'BOOKED',
  // Seat is reserved for the user
  RESERVED = 'RESERVED',

  // Seat is free
  FREE = 'FREE',
}

export enum SeatType {
  WHEELCHAIR = 'WHEELCHAIR',
  COMMON = 'COMMON',
  NONE = 'NONE',
}

export enum TicketSystemState {
  SELECT_SHOW = 0,
  BOOK_TICKETS = 1,
  SELECT_SEATS = 2,
  INVOICE = 3,
  CONFIRM = 4,
}

export enum LoadStates {
  NOT_LOADED = 'NOT_LOADED',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
}

export enum SearchByType {
  NAME = 'name',
  EMAIL = 'email',
  PHONE = 'phone',
}
