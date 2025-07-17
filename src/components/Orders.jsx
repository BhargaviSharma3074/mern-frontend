// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useContext } from "react";
// import { AppContext } from "../App";
// import { useFetcher } from "react-router-dom";
// export default function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState();
//   const [page, setPage] = useState(1);
//   const [limit,setLimit]= useState(3)
//   const [totalPages, setTotalPages] = useState(1);
//   const [status, setStatus] = useState("");
//   const { user } = useContext(AppContext);
//   const API_URL = import.meta.env.VITE_BACKEND;
//   const fetchOrders = async () => {
//     try {
//       const url = `${API_URL}/api/orders/?page=${page}&limit=${limit}&status=${status}`;
//       const result = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       });
//       setOrders(result.data.orders);
//       setTotalPages(result.data.total);
//     } catch (err) {
//       console.log(err);
//       setError("Something went wrong");
//     }
//   };
//   useEffect(() => {
//     fetchOrders();
//   }, [status,page]);
//   const updateOrder = async (status, id) => {
//     try {
//       const url = `${API_URL}/api/orders/${id}`;
//       const result = await axios.patch(url, { status });
//       fetchOrders();
//     } catch (err) {
//       console.log(err);
//       setError("Something went wrong");
//     }
//   };
//   return (
//     <div>
//       <h2>Order Management</h2>
//       {error}
      
//       <div>
//         <select onChange={(e) => setStatus(e.target.value)}>
//           <option value="">All</option>
//           <option value="Pending" >
//             Pending
//           </option>
//           <option value="completed">Completed</option>
//           <option value="cancelled">Cancelled</option>
//         </select>
//         {/* <button>Show</button> */}
//       </div>
//       {orders &&
//         orders.map((order) => (
//           <li>
//             {order._id}-{order.orderValue}-{order.status}-
//             {order.status === "Pending" && (
//               <>
//                 <button onClick={() => updateOrder("cancelled", order._id)}>
//                   Cancel
//                 </button>
//                 -
//                 <button onClick={() => updateOrder("completed", order._id)}>
//                   Complete
//                 </button>
//               </>
//             )}
//           </li>
//         ))}
//         <div>
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


// ==============================================================

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("");
  const { user } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_BACKEND;

  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/api/orders/?page=${page}&limit=${limit}&status=${status}`;
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setOrders(result.data.orders);
      setTotalPages(result.data.total);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status, page]);

  const updateOrder = async (status, id) => {
    try {
      const url = `${API_URL}/api/orders/${id}`;
      await axios.patch(url, { status }, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      fetchOrders();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div>
      <h2>Order Management</h2>
      {error}

      <div>
        <select onChange={(e) => setStatus(e.target.value)} value={status}>
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <table border="1">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Value</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td>No orders found.</td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.orderValue}</td>
                <td>{order.status}</td>
                <td>
                  {order.status === "Pending" ? (
                    <>
                      <button onClick={() => updateOrder("cancelled", order._id)}>
                        Cancel
                      </button>{" "}
                      <button onClick={() => updateOrder("completed", order._id)}>
                        Complete
                      </button>
                    </>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div style={{ marginTop: "10px" }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>{" "}
        Page {page} of {totalPages}{" "}
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}
