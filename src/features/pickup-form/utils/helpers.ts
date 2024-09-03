import { IRecipientOrder } from "@shared/types";

interface IFindOrderProps {
  orders: IRecipientOrder[];
  orderNumber: string;
  recipientName: string;
}

export const findOrder = ({
  orders,
  orderNumber,
  recipientName,
}: IFindOrderProps): IRecipientOrder | null => {
  const foundOrder = orders.find(
    (order) =>
      order.orderNumber === orderNumber && order.name.toLowerCase() === recipientName.toLowerCase()
  );

  return foundOrder || null;
};
