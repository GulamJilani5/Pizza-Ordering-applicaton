// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import { getOrder } from "../../services/apiRestaurant";

import OrderItem from './OrderItem';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import UpdateOrder from "./UpdateOrder";

function Order() {
  const order = useLoaderData();  
  //console.log("order " + order);

  const fetcher = useFetcher();
  
  useEffect(function () {
     if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
     
  }, [fetcher]);
//console.log(fetcher.data)

  // Everyone can search for all orders, so for privacy reasons we're gonna exclude names or address,
  // these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-8">
      <div className="flex gap-2 items-center justify-between flex-wrap">
        <h2 className="text-xl font-semibold">Order ${ id} Status</h2>

        <div className="space-x-2">
          {priority && <span className="bg-red-500 text-red-100 rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide">Priority</span>}
          <span className="bg-green-500 text-green-100 rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide"> ${ status}order</span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 bg-stone-200 py-5 px-6">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">{ cart.map((item) => (<OrderItem item={item} key={item.pizzaId} isLoadingIngredients={fetcher.state === 'loading'} ingredients={fetcher?.data?.find(el => el.id === item.pizzaId)?.ingredients ?? []}/>))}</ul>

      <div className="space-x-2 bg-stone-200 px-6 py-5">
        <p className="font-medium text-sm text-stone-500">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p  className="font-medium text-sm text-stone-500">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
      {!priority && <UpdateOrder order={order}/>}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
