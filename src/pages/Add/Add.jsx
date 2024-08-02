import { useState } from "react";
import { FaImage } from "react-icons/fa6";

function Add() {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "",
    imageUrl: "",
    price: 0,
  });

  function updateDataObject(evt) {
    if (evt.target.type === "file")
      setData({
        ...data,
        [evt.target.name]: URL.createObjectURL(evt.target.files[0]),
      });
    else if (evt.target.name === "price")
      setData({ ...data, [evt.target.name]: parseInt(evt.target.value) });
    else setData({ ...data, [evt.target.name]: evt.target.value });
  }

  return (
    <div className="add">
      <form className="flex-col add-form ">
        <div className="add-img-upload flex-col">
          <p>Charger une image</p>
          <label htmlFor="image">
            {image ? (
              <img
                className="add-img-upload-img"
                src={URL.createObjectURL(image)}
                alt=""
              />
            ) : (
              <FaImage className="add-img-upload-icon" />
            )}
          </label>
        </div>
        <input
          onChange={(evt) => {
            setImage(evt.target.files[0]), updateDataObject(evt);
          }}
          type="file"
          name="imageUrl"
          id="image"
          hidden
          required
        />
        <div className="add-product-name flex-col">
          <p>Nom du produit</p>
          <input
            onChange={(evt) => updateDataObject(evt)}
            type="text"
            name="name"
            id=""
            required
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Description du produit</p>
          <textarea
            onChange={(evt) => updateDataObject(evt)}
            name="description"
            rows="6"
            required
          />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Catégorie du produit</p>
            <select
              onChange={(evt) => updateDataObject(evt)}
              name="category"
              id=""
              required
            >
              <option value=""></option>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Prix du produit</p>
            <input
              onChange={(evt) => updateDataObject(evt)}
              type="number"
              name="price"
              min={0}
              placeholder="4€"
              required
            />
          </div>
        </div>
        <button
          onClick={(evt) => {
            evt.preventDefault(), console.log(data);
          }}
          className="add-btn"
        >
          AJOUTER
        </button>
      </form>
    </div>
  );
}

export default Add;
