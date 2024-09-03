export interface IPickupPoint {
  id: string;
  title: string;
}

export interface IPickupAvailableDate {
  date: string;
  availableForOrderPickup: boolean;
}

export interface IRecipientOrder {
  id: string;
  name: string;
  orderNumber: string;
  orderAmount: number;
}

export type TAction<T> = (value: T) => void;

export interface IPickupState {
  orderNumber: string;
  recipientName: string;
  points: IPickupPoint[];
  selectedPoint: IPickupPoint | null;
  dates: IPickupAvailableDate[];
  selectedDate: string;
  orders: IRecipientOrder[];

  setOrderNumber: TAction<string>;
  setRecipientName: TAction<string>;
  setPoints: TAction<IPickupPoint[]>;
  setSelectedPoint: TAction<IPickupPoint | null>;
  setDates: TAction<IPickupAvailableDate[]>;
  setSelectedDate: TAction<string>;
  setOrders: TAction<IRecipientOrder[]>;
}
