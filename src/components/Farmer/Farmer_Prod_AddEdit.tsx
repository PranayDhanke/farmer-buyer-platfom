"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { VscLoading } from "react-icons/vsc";
import { LiaCheckCircle } from "react-icons/lia";
import { onAuthStateChanged } from "firebase/auth";
import { fireAuth } from "@/app/lib/Firebase/Firebase";

const Farmer_Prod_AddEdit = ({
  isEdit,
  id,
}: {
  isEdit: boolean;
  id: string;
}) => {
  const router = useRouter();

  interface Product {
    id: number;
    prod_name: string;
    price: number | string;
    description: string;
    image: File | null; // assuming image could be null or a string URL
    category: string;
  }

  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    prod_name: "",
    price: 0,
    description: "",
    image: null,
    category: "", 
  });

  const [isEditing] = useState<boolean>(isEdit);
  const [loading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [isuser, setisUser] = useState(false);
  const [uid, setUid] = useState("");

  const [farmer, setFarmer] = useState({
    name: "",
    district: "",
    taluka: "",
    city: "",
    profilePhoto: "",
    state: "Maharashtra",
  });

  useEffect(() => {
    const verifyAndLoad = async () => {
      onAuthStateChanged(fireAuth, async (user) => {
        if (user?.uid) {
          const profileRes = await fetch("/api/Farmer/profile/get", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uid: user.uid }),
          });

          if (profileRes.ok) {
            const profileData = await profileRes.json();
            const mainData = profileData.data;

            if (mainData) {
              setFarmer(mainData);
            } else {
              toast.error("Farmer profile not found.");
              return;
            }
          } else {
            toast.error("Failed to load profile.");
          }
          setisUser(true);
          setUid(user.uid);
        } else {
          setisUser(false);
        }
      });
    };
    verifyAndLoad();

    if (isEdit && isuser) {
      const loadEdit = async () => {
        try {
          const docId = id;
          const res = await fetch(`/api/Farmer/Product/getSingle`, {
            method: "POST",
            body: JSON.stringify({ id: docId }),
          });

          if (res.ok) {
            const data = await res.json();
            const subdata = data.product;

            setNewProduct(subdata);
          }else{
            router.push("/Farmer-Panel")
          }
        } catch {
          toast.error("Error while Loading the product data");
        }
      };

      loadEdit();
    }
  }, [id, isEdit , isuser , router]);

  const handleFileChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    setNewProduct({
      ...newProduct,
      image: file,
    });
  };

  // Handle adding a new product
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData();

    formData.append("name", farmer.name);
    formData.append("profilePhoto", farmer.profilePhoto);
    formData.append("district", farmer.district);
    formData.append("taluka", farmer.taluka);
    formData.append("city", farmer.city);
    formData.append("state", farmer.state);

    formData.append("uid", uid);
    formData.append("prod_name", newProduct.prod_name);
    formData.append("price", newProduct.price.toString());
    formData.append("description", newProduct.description);
    formData.append("category", newProduct.category);
    if (newProduct.image) {
      toast.loading("Wait Image is Uploading");
      formData.append("prod_image", newProduct.image);
    }

    const res = await fetch("/api/Farmer/Product/add", {
      method: "POST",
      body: formData,
    });

    toast.loading("Wait image is uploading ");

    if (res.ok) {
      toast.success("Product added successfully");
      setIsSuccess(true);
      router.push("/Farmer-Panel");
    } else {
      toast.error("Error While Adding Product");
    }
  };

  // Handle updating the product after editing
  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const docId = id;
    const formData = new FormData();
    formData.append("uid", docId);
    formData.append("prod_name", newProduct.prod_name);
    formData.append("price", newProduct.price.toString());
    formData.append("description", newProduct.description);
    formData.append("category", newProduct.category);

    if (newProduct.image) {
      toast.loading("Wait Image are Uploading");
      formData.append("prod_image", newProduct.image);
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/Farmer/Product/edit", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setIsSuccess(true);
        toast.success("Product Updated successfully");
        router.push("/Farmer-Panel");
      }
    } catch {
      toast.error("Error While Updating the Product ");
    }
  };

  return (
    <div className="flex justify-center items-center pt-10 bg-gray-50">
      <ToastContainer />
      {isuser ? (
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
                  id="prod_name"
                  value={newProduct.prod_name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, prod_name: e.target.value })
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
                    setNewProduct({
                      ...newProduct,
                      price: Number(e.target.value),
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="product-category"
                  className="block text-gray-700"
                >
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
                <label
                  htmlFor="product-description"
                  className="block text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="product-description"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label htmlFor="product-image" className="block text-gray-700">
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleFileChanges}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {loading ? (
                  <VscLoading className="animate-spin text-center mx-auto text-xl" />
                ) : isSuccess ? (
                  <LiaCheckCircle className="text-center mx-auto text-xl" />
                ) : isEditing ? (
                  "Update Product"
                ) : (
                  "Add Product"
                )}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="mx-auto text-center">Please Login First</h1>
        </div>
      )}
    </div>
  );
};

export default Farmer_Prod_AddEdit;
