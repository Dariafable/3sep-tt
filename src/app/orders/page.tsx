import { cookies } from "next/headers";
import { OrderList } from "@features/order-list/components";

const OrdersPage = async () => {
  const cookieStore = cookies();
  const pickupData = cookieStore.get("pickupData")?.value;

  const parsedData = pickupData ? JSON.parse(pickupData) : null;

  return <OrderList pickupData={parsedData} />;
};

export default OrdersPage;
