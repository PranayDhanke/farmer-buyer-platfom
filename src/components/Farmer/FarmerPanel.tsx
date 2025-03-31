"use client";
import { useState } from "react";


const FarmerPanel = ({isEdit , id}:{isEdit:boolean , id:any}) => {

  const [products, setProducts] = useState<any[]>([]);
  const [newProduct, setNewProduct] = useState<any>({
    id: 0,
    name: "",
    price: 0,
    description: "",
    image: "",
    category: "",  // Added category field
  });
  const [isEditing, setIsEditing] = useState<boolean>(isEdit);

  // Handle adding a new product
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price > 0 && newProduct.category) {
      setProducts([...products, { ...newProduct, id: Date.now() }]);
      setNewProduct({
        id: 0,
        name: "",
        price: 0,
        description: "",
        image: "",
        category: "",  // Reset the category field
      });
    }
  };

  // Handle updating the product after editing
  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setProducts(
      products.map((product) =>
        product.id === newProduct.id ? newProduct : product
      )
    );
    setIsEditing(false);
    setNewProduct({
      id: 0,
      name: "",
      price: 0,
      description: "",
      image: "",
      category: "",  // Reset the category field
    });
  };

  return (
    <div className="flex justify-center items-center pt-10 bg-gray-50">
      <div className="container max-w-md p-6 bg-white rounded-lg shadow-lg">

        {/* Add Product Form */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isEditing ? "Edit Product" : "Add Product"}
          </h2>
          <form
            onSubmit={isEditing ? handleUpdateProduct : handleAddProduct}
            className="space-y-4"
          >
            <div>
              <label htmlFor="product-name" className="block text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                id="product-name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label htmlFor="product-price" className="block text-gray-700">
                Price(₹) (Per KG)
              </label>
              <input
                type="number"
                id="product-price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: Number(e.target.value) })
                }
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label htmlFor="product-category" className="block text-gray-700">
                Category
              </label>
              <select
                id="product-category"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Category</option>
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Grains">Grains</option>
                <option value="Dairy">Dairy</option>
                <option value="Herbs">Herbs</option>
                {/* Add more categories as needed */}
              </select>
            </div>

            <div>
              <label htmlFor="product-description" className="block text-gray-700">
                Description
              </label>
              <textarea
                id="product-description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label htmlFor="product-image" className="block text-gray-700">
                Image URL
              </label>
              <input
                type="url"
                id="product-image"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isEditing ? "Update Product" : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FarmerPanel;
