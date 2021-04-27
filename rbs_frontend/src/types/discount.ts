export interface IDiscount {
  name: string;
  code: string;
  message: string;
  minGroupSize: number;
  showId: number;
  waiveHandlingFee: boolean;
  partOfGroup: boolean;
};
