import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { AiOutlinePlus } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import { addProduct } from "../store/action/product";

import imageToBase64 from "image-to-base64/browser";

export default function CreateProduct() {
  const [isVisible, setIsVisible] = useState(false);

  const [name, setName] = useState("");
  const [vat, setVat] = useState(10);
  const [netPrice, setNetPrice] = useState();
  const [grossPrice, setGrossPrice] = useState();
  const [stock, setStock] = useState();
  const [img, setImg] = useState("");

  const [err, setErr] = useState({ error: false, msg: "" });

  const dispatch = useDispatch();

  const addProductHandler = async (e) => {
    e.preventDefault();
    if (!name && !vat && !grossPrice && !netPrice && !stock) {
      setErr({ error: true, msg: "Fill all the above information" });
    }

    console.log({ vat });

    setErr({ error: false, msg: "" });

    const fd = new FormData();
    fd.append("image", img);
    fd.append("name", name);
    fd.append("vat", vat);
    fd.append("netPrice", netPrice);
    fd.append("grossPrice", grossPrice);
    fd.append("stock", stock);

    await dispatch(addProduct(fd));
    setIsVisible(false);
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: "white",
          border: 0,
          fontSize: "1rem",
          marginBottom: 10,
          cursor: "pointer",
        }}
        onClick={() => {
          setIsVisible(true);
        }}
      >
        <AiOutlinePlus style={{ marginBottom: -2.5, marginRight: 5 }} />
        Add
      </button>
      {isVisible ? (
        <form
          style={{
            width: "400px",
            border: "1px solid black",
            padding: 5,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3>Product</h3>
            <GrFormClose
              style={{ cursor: "pointer" }}
              onClick={() => {
                setIsVisible(false);
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <label>Vat</label>
            <select
              name="vat"
              id="vat"
              onChange={(e) => {
                setVat(e.target.value);
                setNetPrice(grossPrice - (e.target.value * grossPrice) / 100);
              }}
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="25">25</option>
            </select>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <label>Price (gross)</label>
            <input
              type="number"
              name="gross"
              value={grossPrice}
              onChange={(e) => {
                if (!e.target.value) {
                  setGrossPrice(0);
                  return;
                }
                setGrossPrice(e.target.value);

                setNetPrice(e.target.value - (vat * e.target.value || 0) / 100);
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <label>Price (net)</label>
            <input
              type="number"
              name="net"
              value={netPrice}
              onChange={() => {}}
              disabled
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <label>Total Stock</label>
            <input
              type="number"
              name="stock"
              value={stock}
              onChange={(e) => {
                setStock(e.target.value);
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <label>Product Image</label>
            <input
              type="file"
              name="image"
              accept="image/png, image/jpg"
              onChange={async (e) => {
                const res = e.target.files[0];
                setImg(res);
              }}
            />
          </div>
          <div>
            <button
              type="submit"
              style={{
                backgroundColor: "green",
                border: 0,
                color: "white",
                fontWeight: "bold",
                marginRight: 5,
                marginTop: 15,
              }}
              onClick={addProductHandler}
            >
              Add
            </button>
            <button
              style={{
                backgroundColor: "red",
                border: 0,
                color: "white",
                fontWeight: "bold",
              }}
            >
              Cancel
            </button>
          </div>
          {err.error ? <p style={{ color: "red" }}>{err.msg}</p> : []}
        </form>
      ) : (
        []
      )}
    </div>
  );
}
