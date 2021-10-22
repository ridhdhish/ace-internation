import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { AiOutlinePlus } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import { addProduct } from "../store/action/product";

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
        className="flex text-md justify-center items-center font-semibold bg-gray-200 p-1 rounded mb-3"
        onClick={() => {
          setIsVisible(true);
        }}
      >
        <AiOutlinePlus className="font-bold" />
        Add
      </button>
      {isVisible ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          className="flex justify-center items-center"
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: -10,
              opacity: "0.8",
            }}
            className="bg-black"
          ></div>
          <form
            className="rounded-md p-2 mb-3 bg-blue-400"
            style={{
              width: "400px",
            }}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Product</h3>
              <GrFormClose
                size={20}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setIsVisible(false);
                }}
              />
            </div>
            <div className="mb-3 mt-5">
              <label className="block text-sm font-semibold">
                Product Name
              </label>
              <input
                className="focus:ring focus:ring-blue-700 focus:border-opacity-0 rounded-sm focus:outline-none w-64 h-10 pl-2 text-gray-600"
                type="text"
                name="name"
                value={name}
                placeholder="e.g. Mouse"
                autoComplete="off"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="mb-3 mt-5">
              <label className="block text-sm font-semibold">Vat</label>
              <select
                className="focus:ring focus:ring-blue-700 focus:border-opacity-0 rounded-sm focus:outline-none w-64 h-10 pl-2 text-gray-600"
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
            <div className="mb-3 mt-5">
              <label className="block text-sm font-semibold">
                Price (gross)
              </label>
              <input
                className="focus:ring focus:ring-blue-700 focus:border-opacity-0 rounded-sm focus:outline-none w-64 h-10 pl-2 text-gray-600"
                type="number"
                name="gross"
                value={grossPrice}
                autoComplete="off"
                onChange={(e) => {
                  if (!e.target.value) {
                    setGrossPrice(0);
                    return;
                  }
                  setGrossPrice(e.target.value);

                  setNetPrice(
                    e.target.value - (vat * e.target.value || 0) / 100
                  );
                }}
              />
            </div>
            <div className="mb-3 mt-5">
              <label className="block text-sm font-semibold">Price (net)</label>
              <input
                className="rounded-sm bg-gray-300 w-64 h-10 pl-2"
                type="number"
                name="net"
                value={netPrice}
                onChange={() => {}}
                disabled
              />
            </div>
            <div className="mb-3 mt-5">
              <label className="block text-sm font-semibold">Total Stock</label>
              <input
                className="focus:ring focus:ring-blue-700 focus:border-opacity-0 rounded-sm focus:outline-none w-64 h-10 pl-2 text-gray-600"
                type="number"
                name="stock"
                value={stock}
                autoComplete="off"
                onChange={(e) => {
                  setStock(e.target.value);
                }}
              />
            </div>
            <div className="mb-3 mt-5">
              <label className="block text-sm font-semibold">
                Product Image
              </label>
              <input
                className="w-64 h-10"
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
                className="text-white bg-green-900 rounded-full w-20 h-8 font-semibold"
                onClick={addProductHandler}
              >
                Add
              </button>
              <button
                className="text-white bg-red-600 rounded-full w-20 h-8 font-semibold ml-3"
                onClick={(e) => {
                  e.preventDefault();
                  setIsVisible(false);
                }}
              >
                Cancel
              </button>
            </div>
            {err.error ? <p style={{ color: "red" }}>{err.msg}</p> : []}
          </form>
        </div>
      ) : (
        []
      )}
    </div>
  );
}
