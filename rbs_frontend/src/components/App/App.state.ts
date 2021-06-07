import * as mobx from 'mobx';
import { Production } from 'src/shared/types';

export class ProductionState {
  id: number | null = null;
  title: string | null = null;
  subtitle: string | null = null;
  year: number | null = null;
  description: string | null = null;

  constructor() {
    mobx.makeAutoObservable(this);
  }

  setProduction(production: Production) {
    this.id = production.id;
    this.title = production.title;
    this.subtitle = production.subtitle;
    this.year = production.year;
    this.description = production.description;
  }
}
