import React from "react";
import { IPickupPoint } from "@shared/types";

import styles from "./OrderItem.module.scss";

interface IOrderItemProps {
  selectedDate: string;
  selectedPoint: IPickupPoint | null;
  orderNumber: string;
  recipientName: string;
}

const OrderItem: React.FC<IOrderItemProps> = ({
  selectedDate,
  selectedPoint,
  orderNumber,
  recipientName,
}) => {
  return (
    <div className={styles.orderItem}>
      <p className={styles.orderInfo}>{selectedDate}</p>
      <p className={styles.orderInfo}>{selectedPoint?.title}</p>
      <p className={styles.orderInfo}>{orderNumber}</p>
      <p className={styles.orderInfo}>{recipientName}</p>
    </div>
  );
};

export default OrderItem;
