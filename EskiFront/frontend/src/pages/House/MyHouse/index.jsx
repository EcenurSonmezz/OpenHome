import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { LoginContext } from "../../state/context"; // Doğru dosya yolunu kullanın
import "./MyHouse.css";

export function MyHouse() {
  const { login } = useContext(LoginContext);
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    const fetchHouses = async () => {
      console.log("MyHouseLogin", login);
      if (!login || !login.id) {
        console.error("Login context not available or id is missing");
        return;
      } else {
        console.log("MyHouse User ID", login.id);
      }

      try {
        console.log("Kullanıcı ID:", login.id); // ID'yi konsola yazdır
        const response = await axios.get(`/api/v1/homes/user?userId=${login.id}`);
        setHouses(response.data);
      } catch (error) {
        console.error("Error fetching houses:", error);
      }
    };

    if (login && login.id) {
      fetchHouses();
    } else {
      console.error("Login or id is not available");
    }
  }, [login]);

  return (
    <div className="container">
      <h2>Eklediğim Evler</h2>
      <div className="home-list">
        {houses.length > 0 ? (
          houses.map((house) => (
            <div key={house.id} className="card">
              {console.log("House", house)}
              <img src={`data:image/jpeg;base64,${house.image}`} alt={house.address} className="img-fluid" />
              <div className="house-details">
                <h3>{house.address}</h3>
                <p>Oda Sayısı: {house.rooms}</p>
                <p>Fiyat: {house.price} TL</p>
                <p>Müsaitlik: {house.availability ? "Evet" : "Hayır"}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Henüz eklediğiniz bir ev yok.</p>
        )}
      </div>
    </div>
  );
}
