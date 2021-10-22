import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { MdModeEdit, MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { setProducts } from "../../store/action/product";

export default function ProductList() {
  const product = useSelector((state) => state.product);
  console.log({ products: product.products });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProducts());
  }, [dispatch]);

  return (
    <div className="mr-6">
      {product && product.products.length ? (
        <table
          style={{ width: "100%" }}
          className="table-fixed border-2 border-gray-300"
        >
          <thead>
            <tr className="h-11">
              <th className="border-2 border-gray-300">Product Name</th>
              <th className="border-2 border-gray-300">Vat</th>
              <th className="border-2 border-gray-300">Total Stock</th>
              <th className="border-2 border-gray-300">
                Price (gross) per Qty
              </th>
              <th className="border-2 border-gray-300">Price (net) per Qty</th>
              <th className="border-2 border-gray-300">Product Image</th>
              <th className="border-2 border-gray-300">Action</th>
            </tr>
          </thead>

          <tbody>
            {product.products.map((p, index) => (
              <tr className="h-14" key={index}>
                <td className="border-2 border-gray-300 pl-2 font-medium">
                  {p.name}
                </td>
                <td className="border-2 border-gray-300 pl-2 font-medium">
                  {p.vat}%
                </td>
                <td className="border-2 border-gray-300 pl-2 font-medium">
                  {p.stock}
                </td>
                <td className="border-2 border-gray-300 pl-2 font-medium">
                  ${p.grossPrice}
                </td>
                <td className="border-2 border-gray-300 pl-2 font-medium">
                  ${p.netPrice}
                </td>
                <td className="border-2 border-gray-300 pl-2 font-medium">
                  <img
                    style={{ width: 100, height: 100 }}
                    id="img"
                    src={p.productImage}
                    alt="logo"
                  />
                </td>
                <td className="border-2 border-gray-300 pl-2 font-medium">
                  <button>
                    <MdModeEdit />
                  </button>
                  <button>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3>No Products are available!!</h3>
      )}
    </div>
  );
}
