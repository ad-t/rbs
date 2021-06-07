import * as mobxReact from 'mobx-react-lite';
import { createTicketingSystem } from 'src/components/TicketingSystem/create';
import { installProduction } from 'src/mocks/installProduction';
import LandingPage from 'src/pages/LandingPage';
import { App } from './App';
import { ProductionState } from './App.state';

export function createApp() {
  const productionState = new ProductionState();

  const { TicketingSystemElement } = createTicketingSystem();
  const LandingPageWrapper = mobxReact.observer(() => <LandingPage />);

  installProduction().then((production) =>
    productionState.setProduction(production)
  );

  return {
    AppElement: mobxReact.observer(() => (
      <App
        LandingPageElement={<LandingPageWrapper />}
        TicketingSystemElement={<TicketingSystemElement />}
      />
    )),
  };
}
