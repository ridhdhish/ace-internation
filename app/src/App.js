import CreateProduct from "./Components/CreateProduct";
import Products from "./Components/Products";

function App() {
  return (
    <div style={{ marginLeft: 20 }}>
      <h2>Products</h2>
      <CreateProduct />
      <Products />
    </div>
  );
}

export default App;
