import CreateProduct from "./Components/CreateProduct";
import ProductList from "./Components/ProductList/ProductList";

function App() {
  return (
    <div style={{ marginLeft: 20 }}>
      <h2 className="font-bold text-2xl mb-5 mt-2">Products</h2>
      <CreateProduct />
      <ProductList />
    </div>
  );
}

export default App;
