import axios from "axios";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import { API_ROUTES, APP_ROUTES } from "@/assets/utils/constants";
import "react-toastify/dist/ReactToastify.css";

function List() {
  const [list, setList] = useState([]);

  async function fetchData() {
    const response = await axios.get(API_ROUTES.FOODS);
    if (response.status === 200) {
      setList(response.data);
    }
  }

  async function deleteItem(item) {
    try {
      const adminId = localStorage.getItem("adminId");
      const response = await axios.delete(
        `${API_ROUTES.FOODS}${APP_ROUTES.DELETE_FOOD}/${item._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: {
            adminId,
          },
        }
      );
      if (response.status === 200) {
        const updated = list.filter((obj) => obj._id != item._id);
        setList(updated);
        toast.success(`${item.name} supprimé !`);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.error(error.response.data);
      }

      console.error(error);
      toast.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="list add flex-col">
      <ToastContainer />
      <p>Liste des items</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Nom</b>
          <b>Catégorie</b>
          <b>Prix</b>
          <b>Supprimer</b>
        </div>

        {list.map((item, index) => (
          <div key={index} className="list-table-format ">
            <img src={item.imageUrl} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price} €</p>
            <FaXmark className="cursor" onClick={() => deleteItem(item)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
