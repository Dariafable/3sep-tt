import { IRecipientOrder } from "@shared/types";
import { findOrder } from "./helpers";

interface IValidatePickupFormProps {
  orderNumber: string;
  recipientName: string;
}

interface IValidateOrderProps {
  orderNumber: string;
  recipientName: string;
  orders: IRecipientOrder[];
}

export const validatePickupForm = ({ orderNumber, recipientName }: IValidatePickupFormProps) => {
  let errors = {
    orderNumber: null as string | null,
    recipientName: null as string | null,
  };

  if (!orderNumber) {
    errors.orderNumber = "Необходимо ввести номер посылки";
  }

  if (!recipientName) {
    errors.recipientName = "Необходимо ввести имя";
  }

  return errors;
};

export const validateOrder = ({ orderNumber, recipientName, orders }: IValidateOrderProps) => {
  let errors = {
    orderNumber: null as string | null,
    recipientName: null as string | null,
  };

  const currentOrder = findOrder({ orders, orderNumber, recipientName });

  if (!currentOrder) {
    errors.orderNumber = "Номер посылки или имя не найдены";
    errors.recipientName = "Номер посылки или имя не найдены";
  }

  return errors;
};
