/*
 * Defines the ticket context. Therefore, we do not have to pass ticket information or
 * functions down via props, reducing the number of code we need to write.
 * 
 * The purpose of this context is to allow for the top component to pass down ticket
 * controls down the system.
 */
import React from 'react';

import { ITicketManager } from '../types/tickets';

const TicketContext = React.createContext<ITicketManager | null>(null);

export  default TicketContext;
