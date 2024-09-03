import useSWR from "swr";
import { apiClient } from "@shared/api";
import { ENDPOINTS } from "@shared/constants";
import { IPickupAvailableDate, IPickupPoint, IRecipientOrder } from "@shared/types";

const fetcher = (url: string) => apiClient.get(url).then((res) => res.data);

export const usePoints = () => useSWR<IPickupPoint[]>(ENDPOINTS.PICKUP_POINTS, fetcher);

export const useDates = (pointId: string | null) =>
  useSWR<IPickupAvailableDate[] | null>(pointId ? ENDPOINTS.PICKUP_DATES(pointId) : null, fetcher);

export const useOrders = () => useSWR<IRecipientOrder[]>(ENDPOINTS.PICKUP_ORDERS, fetcher);
