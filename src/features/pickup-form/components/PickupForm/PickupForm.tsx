"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { usePoints, useDates, useOrders } from "../../api";
import { validatePickupForm, validateOrder } from "../../utils/validation";
import { findOrder } from "../../utils/helpers";

import { usePickupStore } from "@shared/store";
import { Button, InputField, Selector } from "@shared/ui";
import { IRecipientOrder, IPickupPoint, IPickupAvailableDate, TAction } from "@shared/types";

import styles from "./PickupForm.module.scss";

const PickupForm: React.FC = () => {
  const router = useRouter();

  const [loadingOrdersPage, setLoadingOrdersPage] = React.useState(false);
  const [errors, setErrors] = React.useState<{
    recipientName: string | null;
    orderNumber: string | null;
  }>({
    recipientName: null,
    orderNumber: null,
  });

  const {
    orderNumber,
    recipientName,
    points,
    selectedPoint,
    dates,
    selectedDate,
    orders,

    setOrderNumber,
    setRecipientName,
    setPoints,
    setSelectedPoint,
    setDates,
    setSelectedDate,
    setOrders,
  } = usePickupStore();

  const { data: pointsData, isLoading: isPointsLoading, error: pointsError } = usePoints();
  const { data: datesData } = useDates(selectedPoint?.id || null);
  const { data: ordersData, isLoading: isOrdersLoading, error: ordersError } = useOrders();

  const isLoadingData = isPointsLoading || isOrdersLoading;
  const isError = pointsError || ordersError;

  const handlePointsData = (data: IPickupPoint[]) => {
    setPoints(data);
    setSelectedPoint(data[0] || null);
    setRecipientName("");
    setOrderNumber("");
  };

  const handleDatesData = (data: IPickupAvailableDate[]) => {
    const availableDates = data.filter((date) => date.availableForOrderPickup);
    setDates(availableDates);
    setSelectedDate(availableDates.length ? availableDates[0].date : "");
  };

  const handleOrdersData = (data: IRecipientOrder[]) => {
    setOrders(data);
  };

  React.useEffect(() => {
    if (pointsData) {
      handlePointsData(pointsData);
    }
  }, [pointsData]);

  React.useEffect(() => {
    if (datesData) {
      handleDatesData(datesData);
    }
  }, [datesData]);

  React.useEffect(() => {
    if (ordersData) {
      handleOrdersData(ordersData);
    }
  }, [ordersData]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    setValue: TAction<string>,
    field?: "recipientName" | "orderNumber"
  ) => {
    setValue(event.target.value);

    if (field) {
      setErrors({
        recipientName: null,
        orderNumber: null,
      });
    }
  };

  const handlePointChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = points.find((point) => point.id === event.target.value);
    setSelectedPoint(selected || null);
  };

  const handleBlur = () => {
    const validationResults = validatePickupForm({
      orderNumber,
      recipientName,
    });
    setErrors(validationResults);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoadingOrdersPage(true);

    const formErrors = validatePickupForm({ orderNumber, recipientName });
    if (formErrors.orderNumber || formErrors.recipientName) {
      setErrors(formErrors);
      setLoadingOrdersPage(false);
      return;
    }

    const orderErrors = validateOrder({ orderNumber, recipientName, orders });
    if (orderErrors.orderNumber || orderErrors.recipientName) {
      setErrors(orderErrors);
      setLoadingOrdersPage(false);
      return;
    }

    const currentOrder = findOrder({ orders, orderNumber, recipientName });

    try {
      await axios.post("/api/save-pickup-data", {
        orderNumber,
        recipientName,
        selectedPoint,
        selectedDate,
        orderAmount: currentOrder?.orderAmount,
        orderId: currentOrder?.id,
      });

      router.push("/orders");
      router.refresh();
    } catch (error) {
      console.error("Error saving pickup data", error);
      setErrors({
        orderNumber: "Ошибка при сохранении данных",
        recipientName: "Ошибка при сохранении данных",
      });
    }
  };

  if (isLoadingData) return <div>Загрузка формы...</div>;
  if (isError) return <div>Произошла ошибка при загрузке данных</div>;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.title}>Добавление посылки</h1>
      <div className={styles.fields}>
        <Selector
          label="Пункт выдачи"
          options={points.map(({ id, title }) => ({ value: id, label: title }))}
          value={selectedPoint?.id || ""}
          onChange={(e) => handlePointChange(e)}
          required
          disabled={loadingOrdersPage}
        />
        <Selector
          label="Дата выдачи"
          options={dates.map(({ date }) => ({ value: date, label: date }))}
          value={selectedDate}
          onChange={(e) => handleChange(e, setSelectedDate)}
          required
          disabled={loadingOrdersPage}
        />
        <InputField
          label="Номер посылки"
          placeholder="Введите номер"
          type="number"
          value={orderNumber}
          onChange={(e) => handleChange(e, setOrderNumber, "orderNumber")}
          required
          disabled={loadingOrdersPage}
          error={errors.orderNumber}
          onBlur={handleBlur}
        />
        <InputField
          label="Имя получателя"
          placeholder="Введите имя"
          type="text"
          value={recipientName}
          onChange={(e) => handleChange(e, setRecipientName, "recipientName")}
          required
          disabled={loadingOrdersPage}
          error={errors.recipientName}
          onBlur={handleBlur}
        />
      </div>
      <div className={styles.button}>
        <Button
          type="submit"
          disabled={
            loadingOrdersPage ||
            [!selectedPoint, !selectedDate, !recipientName, !orderNumber].some(Boolean)
          }
          text="Добавить"
        />
      </div>
    </form>
  );
};

export default PickupForm;
