import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase'; // Replace with your Firebase config
import "./App.css"

// Import your logo image
import logo from './logo.png'; // Replace './logo.png' with the path to your logo image

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const ordersCollection = collection(db, 'orders1');
      const ordersSnapshot = await getDocs(ordersCollection);
      const orderList = ordersSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Sort the orderList by timestamp in descending order
      orderList.sort((a, b) => b.timestamp - a.timestamp);
      
      setOrders(orderList);
      setFilteredOrders(orderList);
    };

    getOrders();
  }, []);

  useEffect(() => {
    // Filter orders based on searchQuery
    const filtered = orders.filter(order => 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [searchQuery, orders]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="orders-container">
      <img src={logo} alt="Logo" className="logo" /> {/* Logo */}
      <h2>Orders Received</h2>
      <input 
        type="text" 
        value={searchQuery} 
        onChange={handleSearchChange} 
        placeholder="Search by order number or customer name" 
        className="search-bar" // Apply class for search bar styling
      />
      {filteredOrders.length > 0 ? (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Customer Name</th>
              <th>Date & Time</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <React.Fragment key={order.id}>
                <tr>
                  <td>{order.orderNumber}</td>
                  <td>{order.userName}</td>
                  <td>{order.timestamp}</td>
                  <td>
                    <ul>
                      {Array.isArray(order.fileURLs) && order.fileURLs.map((url, index) => (
                        <li key={index}>
                          <a href={url} target="_blank" rel="noopener noreferrer">Download {index + 1}</a>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders received yet.</p>
      )}
    </div>
  );
}

export default OrdersList;
