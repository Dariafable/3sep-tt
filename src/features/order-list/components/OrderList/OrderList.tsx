import React from "react";
import { IPickupPoint } from "@shared/types";

import { OrderItem } from "./components";

import styles from "./OrderList.module.scss";

interface IOrderListProps {
  pickupData: {
    orderNumber: string;
    recipientName: string;
    selectedPoint: IPickupPoint | null;
    selectedDate: string;
    orderAmount: number;
    orderId: string;
  } | null;
}

const OrderList: React.FC<IOrderListProps> = ({ pickupData }) => {
  if (!pickupData) {
    return <div>Нет данных</div>;
  }

  return (
    <div className={styles.orderList}>
      <div className={styles.orderHeader}>
        <p className={styles.orderTitle}>Дата выдачи</p>
        <p className={styles.orderTitle}>Пункт выдачи</p>
        <p className={styles.orderTitle}>Номер посылки</p>
        <p className={styles.orderTitle}>Имя</p>
      </div>

      {Array.from({ length: pickupData.orderAmount }).map((_, index) => (
        <OrderItem
          key={pickupData.orderId + "-" + index}
          selectedDate={pickupData.selectedDate}
          selectedPoint={pickupData.selectedPoint}
          orderNumber={pickupData.orderNumber}
          recipientName={pickupData.recipientName}
        />
      ))}
    </div>
  );
};

export default OrderList;
