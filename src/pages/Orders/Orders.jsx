import axios from "axios";
import { useEffect, useState } from "react";
import { API_ROUTES } from "@/assets/utils/constants";
import { toast } from "react-toastify";
import {
  LuPackage,
  LuPackage2,
  LuPackageCheck,
  LuPackageOpen,
} from "react-icons/lu";

function Order() {
  const [orders, setOrders] = useState([]);

  async function fetchAllOrders() {
    try {
      const response = await axios({
        method: "POST",
        url: API_ROUTES.ORDERS,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response) {
        setOrders(response.data);
      }
    } catch (error) {
      toast.error(error?.response?.data);
      console.error(error?.message);
    
    }
  }

  async function statusHandler(evt, orderId) {
    try {
      const response = await axios.post(
        API_ROUTES.ORDER_STATUS,
        {
          orderId,
          status: evt.target.value,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) fetchAllOrders();
    } catch (error) {
      console.error(error?.data);
    }
  }

  function getIconByStatus(OrderStatus) {
    switch (OrderStatus) {
      case "processing":
        return <LuPackageOpen />;

      case "ready for delivery":
        return <LuPackage2 />;
      case "in delivery":
        return <LuPackage />;
      case "delivered":
        return <LuPackageCheck />;
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <>
   
      <div className="order add">
        <h2>Commandes</h2>
        <div className="order-list">
          {orders.map((order) => (
            <div key={order._id} className="order-item">
              {getIconByStatus(order.status)}

              <div>
                <p className="order-itemfood">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1)
                      return `${item.name} x ${item.quantity} `;
                    else return `${item.name} x ${item.quantity}, `;
                  })}
                </p>
                <p className="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street + ","}</p>
                  <p>
                    {order.address.city +
                      "," +
                      order.address.state +
                      ", " +
                      order.address.country +
                      ", " +
                      order.address.zipcode}
                  </p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Items : {order.items.length}</p>
              <p>{order.amount} €</p>
              <select
                onChange={(evt) => statusHandler(evt, order._id)}
                value={order.status}
              >
                <option value="processing">En cours de préparation</option>
                <option value="ready for delivery">Prête</option>
                <option value="in delivery">Expediée</option>
                <option value="delivered">Livrée</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Order;
