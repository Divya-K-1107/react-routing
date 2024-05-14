import React, { useState, useEffect } from "react";
import apiClient from "../../utils/api-client";
import Loader from "../Common/Loader.jsx";
const Sellers = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sellers, setSellers] = useState([]);
  const [error, setError] = useState("");

  const addSeller = () => {
    const newSeller = {
      name,
      id: sellers.length + 1,
    };
    setSellers([newSeller, ...sellers]);
    setName("");
    apiClient
      .post("/users", newSeller)
      .then((res) => {
        setSellers([res.data, ...sellers]);
      })
      .catch((err) => {
        setError(err.message);
        setSellers(sellers);
      });
  };

  const deleteSeller = (id) => {
    const filteredSellers = sellers.filter((seller) => seller.id !== id);
    setSellers(filteredSellers);
    apiClient.delete(`/users/${id}`).catch((err) => {
      setError(err.message);
      setSellers(sellers);
    });
  };

  const updateSeller = (seller) => {
    const updatedSeller = {
      ...seller,
      name: seller.name + " Updated",
    };
    setSellers(sellers.map((s) => (s.id === seller.id ? updatedSeller : s)));
    apiClient.patch(`/users/${seller.id}`, updatedSeller).catch((err) => {
      setError(err.message);
      setSellers(sellers);
    });
  };

  useEffect(() => {
    //fetchSellers();
    setIsLoading(true);
    apiClient
      .get("/users")
      .then((res) => {
        setSellers(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  }, []);

  // const fetchSellers = async () => {
  //   setIsLoading(true);
  //   try {
  //     const res = await axios.get("https://jsonplaceholder.typicode.com/users")
  //     setSellers(res.data);
  //     setIsLoading(false);
  //   } catch (err) {
  //     setIsLoading(false);
  //     setError(err.message);
  //   }
  // }

  return (
    <>
      <h3>Admin Sellers Page</h3>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addSeller}>Add Seller</button>
      {isLoading && <Loader />}
      {error && <em>{error}</em>} {/*emphasize tag*/}
      <table>
        <tbody>
          {sellers.map((seller) => (
            <tr key={seller.id}>
              <td>{seller.name}</td>
              <td>
                <button
                  onClick={() => {
                    deleteSeller(seller.id);
                  }}
                >
                  {" "}
                  Delete
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    updateSeller(seller);
                  }}
                >
                  {" "}
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Sellers;
