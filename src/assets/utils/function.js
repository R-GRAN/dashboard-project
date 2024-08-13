import axios from "axios";
import { API_ROUTES, APP_ROUTES } from "@/assets/utils/constants";
import { toast } from "react-toastify";

export function storeInLocalStorage(token, adminId) {
  localStorage.setItem("token", token);
  localStorage.setItem("adminId", adminId);
}



export async function addFood(data, image) {

  const adminId = localStorage.getItem("adminId");
  const food = {
    adminId,
    name: data.name,
    description: data.description,
    category: data.category,
    imageUrl: data.imageUrl,
    price: data.price,
  };
  const bodyFormData = new FormData();
  bodyFormData.append("food", JSON.stringify(food));
  bodyFormData.append("image", image);

  try {
    const response = await axios({
      method: "POST",
      url: `${API_ROUTES.FOODS + APP_ROUTES.ADD_FOOD}`,
      data: bodyFormData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (response?.status === 201) toast.success("Food created");
    return false;
  } catch (err) {
    if (err?.response?.status === 401) {
      toast.error("Veuillez vous connecter");
    }

    console.error(err);
    return true;
  }

}
