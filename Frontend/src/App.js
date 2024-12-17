import './App.css';
import AddCategoryForm from './AddCategoryForm';
import AddProductForm from './AddProductForm';
import ProductList from './ProductList';

function App() {
  return (
    <div className="App">
     <AddCategoryForm />
     <AddProductForm />
     <ProductList />
    </div>
  );
}

export default App;
