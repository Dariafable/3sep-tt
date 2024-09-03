import { create } from "zustand";
import { IPickupState } from "../types";

export const usePickupStore = create<IPickupState>((set) => ({
  orderNumber: "",
  recipientName: "",
  points: [],
  selectedPoint: null,
  dates: [],
  selectedDate: "",
  orders: [],

  setOrderNumber: (number) => set({ orderNumber: number }),
  setRecipientName: (name) => set({ recipientName: name }),
  setPoints: (points) => set({ points }),
  setSelectedPoint: (point) => set({ selectedPoint: point }),
  setDates: (dates) => set({ dates }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setOrders: (orders) => set({ orders }),
}));
