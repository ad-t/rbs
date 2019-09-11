/*
 * Defines the ticket context. Therefore, we do not have to pass ticket information or
 * functions down via props, reducing the number of code we need to write.
 */
import React from 'react';

import { ITicketManager } from '../types/tickets';

const TicketContext = React.createContext<ITicketManager | null>(null);

export  default TicketContext;
