// import React from "react";
// import { useEffect, useState } from "react";
// import { useRef } from "react";
// import axios from "axios";
// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState();
//   const frmRef = useRef();
//   const [form, setForm] = useState({
//     pname: "",
//     description: "",
//     price: "",
//     imgUrl: "",
//   });
//   const [page, setPage] = useState(1);
//   const [searchVal, setSearchVal] = useState("");
//   const [totalPages, setTotalPages] = useState(1);
//   const [limit, setLimit] = useState(2);
//   const [editId, setEditId] = useState();
//   const API_URL = import.meta.env.VITE_BACKEND;
//   const fetchProducts = async () => {
//     try {
//       setError("Loading...");
//       const url = `${API_URL}/api/products/?page=${page}&limit=${limit}&search=${searchVal}`;
//       const result = await axios.get(url);
//       setProducts(result.data.products);
//       setTotalPages(result.data.total);
//       setError();
//     } catch (err) {
//       console.log(err);
//       setError("Something went wrong");
//     }
//   };
//   useEffect(() => {
//     fetchProducts();
//   }, [page]);
//   const handleDelete = async (id) => {
//     try {
//       const url = `${API_URL}/api/products/${id}`;
//       const result = await axios.delete(url);
//       setError("Product Deleted Successfully");
//       fetchProducts();
//     } catch (err) {
//       console.log(err);
//       setError("Something went wrong");
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     const frm = frmRef.current;
//     if (!frm.checkValidity()) {
//       frm.reportValidity();
//       return;
//     }
//     try {
//       const url = `${API_URL}/api/products`;
//       const result = await axios.post(url, form);
//       setError("Product added succesfully");
//       fetchProducts();
//       resetForm();
//     } catch (err) {
//       console.log(err);
//       setError("Something went wrong");
//     }
//   };

//   const handleEdit = (product) => {
//     setEditId(user._id);
//     setForm({
//       ...form,
//       pname: product.pname,
//       description: product.description,
//       price: product.price,
//       imgUrl: product.imgUrl,
//     });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const frm = frmRef.current;
//     if (!frm.checkValidity()) {
//       frm.reportValidity();
//       return;
//     }
//     try {
//       const url = `${API_URL}/api/products/${editId}`;
//       const result = await axios.patch(url, form);
//       fetchProducts();
//       setEditId();
//       resetForm();
//       setError("Product information updated successfully");
//     } catch (err) {
//       console.log(err);
//       setError("Something went wrong");
//     }
//   };

//   const handleCancel = () => {
//     setEditId();
//     resetForm();
//   };

//   const resetForm = () => {
//     setForm({
//       ...form,
//       pname: "",
//       description: "",
//       price: "",
//       imgUrl: "",
//     });
//   };
//   return (
//     <div>
//       <h2>Product Management</h2>
//       {error}
//       <div>
//         <form ref={frmRef}>
//           <input
//             name="pname"
//             value={form.pname}
//             type="text"
//             placeholder="Product Name"
//             onChange={handleChange}
//             required
//           />
//           <input
//             name="description"
//             value={form.description}
//             type="text"
//             placeholder="Description"
//             onChange={handleChange}
//             required
//           />
//           <input
//             name="price"
//             value={form.price}
//             type="text"
//             placeholder="Price"
//             onChange={handleChange}
//             required
//           />
//           <input
//             name="imgUrl"
//             value={form.imgUrl}
//             type="text"
//             placeholder="Image Url"
//             onChange={handleChange}
//             required
//           />


//           {editId ? (
//             <>
//               <button onClick={handleUpdate}>Update</button>
//               <button onClick={handleCancel}>Cancel</button>
//             </>
//           ) : (
//             <button onClick={handleAdd}>Add</button>
//           )}
//         </form>
//       </div>
//       <div>
//         <input type="text" onChange={(e) => setSearchVal(e.target.value)} />
//         <button onClick={fetchProducts}>Search</button>
//       </div>
//       <div>
//         <table border="1">
//           <thead>
//             <tr>
//               <th>Product Name</th>
//               <th>Description</th>
//               <th>Price</th>
//               <th>Image Url</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           {products.map((value) => (
//             <tbody key={value._id}>
//               <tr>
//                 <td>{value.pname}</td>
//                 <td>{value.description}</td>
//                 <td>{value.price}</td>
//                 <td>{value.imgUrl}</td>
//                 <td>
//                   <button onClick={() => handleEdit(value)}>Edit</button>
//                   <button onClick={() => handleDelete(value._id)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           ))}
//         </table>
//       </div>
//       <div>
//         <button disabled={page === 1} onClick={() => setPage(page - 1)}>
//           Previous
//         </button>
//         Page {page} of {totalPages}
//         <button
//           disabled={page === totalPages}
//           onClick={() => setPage(page + 1)}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }




// =================================================================================================

import "./Products.css";
import React from "react";
import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";


export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const frmRef = useRef();
  const [form, setForm] = useState({
    pname: "",
    description: "",
    price: "",
    imgUrl: "",
  });
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(2);
  const [editId, setEditId] = useState();
  const API_URL = import.meta.env.VITE_BACKEND;

  const { user } = useContext(AppContext);
  const token = user?.token;

  const fetchProducts = async () => {
    try {
      setError("Loading...");
      const url = `${API_URL}/api/products/?page=${page}&limit=${limit}&search=${searchVal}`;
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(result.data.products);
      setTotalPages(result.data.total);
      setError();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      const url = `${API_URL}/api/products/${id}`;
      const result = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setError("Product Deleted Successfully");
      fetchProducts();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/products`;
      const result = await axios.post(url, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setError("Product added succesfully");
      fetchProducts();
      resetForm();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setForm({
      pname: product.pname,
      description: product.description,
      price: product.price,
      imgUrl: product.imgUrl,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const frm = frmRef.current;
    if (!frm.checkValidity()) {
      frm.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/products/${editId}`;
      const result = await axios.patch(url, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProducts();
      setEditId();
      resetForm();
      setError("Product information updated successfully");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleCancel = () => {
    setEditId();
    resetForm();
  };

  const resetForm = () => {
    setForm({
      pname: "",
      description: "",
      price: "",
      imgUrl: "",
    });
  };

  return (
    <div className="products-container">
      <h2 className="products-title">Product Management</h2>
      {error}
      <div className="products-form-section">
        <form ref={frmRef} className="products-form">
          <input
            className="products-input"
            name="pname"
            value={form.pname}
            type="text"
            placeholder="Product Name"
            onChange={handleChange}
            required
          />
          <input
            className="products-input"
            name="description"
            value={form.description}
            type="text"
            placeholder="Description"
            onChange={handleChange}
            required
          />
          <input
            className="products-input"
            name="price"
            value={form.price}
            type="text"
            placeholder="Price"
            onChange={handleChange}
            required
          />
          <input
            className="products-input"
            name="imgUrl"
            value={form.imgUrl}
            type="text"
            placeholder="Image Url"
            onChange={handleChange}
            required
          />
          {editId ? (
            <>
              <button className="products-btn products-update-btn" onClick={handleUpdate}>Update</button>
              <button className="products-btn products-cancel-btn" onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <button className="products-btn products-add-btn" onClick={handleAdd}>Add</button>
          )}
        </form>
      </div>
      <div className="products-search-section">
        <input
          className="products-search-input"
          type="text"
          placeholder="Search products"
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <button className="products-btn products-search-btn" onClick={fetchProducts}>Search</button>
      </div>
      <div className="products-table-section">
        <table className="products-table" border="1">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Image Url</th>
              <th>Action</th>
            </tr>
          </thead>
          {products.map((value) => (
            <tbody key={value._id}>
              <tr>
                <td>{value.pname}</td>
                <td>{value.description}</td>
                <td>{value.price}</td>
                <td>{value.imgUrl}</td>
                <td>
                  <button className="products-btn products-edit-btn" onClick={() => handleEdit(value)}>Edit</button>
                  <button className="products-btn products-delete-btn" onClick={() => handleDelete(value._id)}>Delete</button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className="products-pagination">
        <button className="products-btn products-prev-btn" disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span className="products-page-info">Page {page} of {totalPages}</span>
        <button className="products-btn products-next-btn" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
