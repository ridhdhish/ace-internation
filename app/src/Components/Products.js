import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { MdModeEdit, MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { setProducts } from "../store/action/product";

export default function Products() {
  const product = useSelector((state) => state.product);
  console.log({ products: product.products });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProducts());
  }, [dispatch]);

  return (
    <div>
      {product && product.products.length ? (
        <table
          style={{
            width: "100vw",
            borderCollapse: "collapse",
            border: "1px solid black",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid black" }}>Product Name</th>
              <th style={{ border: "1px solid black" }}>Vat</th>
              <th style={{ border: "1px solid black" }}>Total Stock</th>
              <th style={{ border: "1px solid black" }}>
                Price (gross) per Qty
              </th>
              <th style={{ border: "1px solid black" }}>Price (net) per Qty</th>
              <th style={{ border: "1px solid black" }}>Product Image</th>
              <th style={{ border: "1px solid black" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {product.products.map((p, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid black" }}>{p.name}</td>
                <td style={{ border: "1px solid black" }}>{p.vat}%</td>
                <td style={{ border: "1px solid black" }}>{p.stock}</td>
                <td style={{ border: "1px solid black" }}>${p.grossPrice}</td>
                <td style={{ border: "1px solid black" }}>${p.netPrice}</td>
                <td style={{ border: "1px solid black" }}>
                  <img
                    style={{ width: 100, height: 100 }}
                    id="img"
                    src={p.productImage}
                    alt="logo"
                  />
                </td>
                <td style={{ border: "1px solid black" }}>
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
