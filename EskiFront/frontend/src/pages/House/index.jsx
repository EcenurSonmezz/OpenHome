import { useState, useEffect } from "react";
import axios from "axios";
import { loadLoginState } from "../state/storage";

export function House() {
  const loginData = loadLoginState();
  const [formData, setFormData] = useState({
    address: "",
    rooms: "",
    price: "",
    availability: false,
    image: "",
    userId: loginData ? loginData.id : null,
  });
  const [homes, setHomes] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [addedHome, setAddedHome] = useState(null);

  useEffect(() => {
    if (loginData && loginData.userDto) {
      setFormData((prevData) => ({
        ...prevData,
        userId: loginData.id,
      }));
    }
    fetchHomes();
  }, [loginData]);

  const fetchHomes = async () => {
    try {
      const response = await axios.get("/api/v1/homes");
      setHomes(response.data);
    } catch (error) {
      console.error("Error fetching homes:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const onSelectImage = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result.split(',')[1] }); // Only base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.address.trim()) {
      errors.address = "Adres boş bırakılamaz.";
    }
    if (!formData.rooms.trim()) {
      errors.rooms = "Oda sayısı boş bırakılamaz.";
    }
    if (!formData.price.trim()) {
      errors.price = "Fiyat boş bırakılamaz.";
    }
    if (!formData.userId) {
      errors.userId = "Kullanıcı ID belirtilmelidir.";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      console.log("Hatalı veri", formData);
      setErrorMessage("Formdaki bazı alanlar eksik veya hatalı.");
      return;
    }

    try {
      console.log("Gönderilen veri:", formData);

      const response = await axios.post("/api/v1/homes", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSuccessMessage("Ev başarıyla eklendi.");
      console.log("Home added successfully:", response.data);
      setAddedHome(response.data);
      fetchHomes(); // New home added, refetch homes
    } catch (error) {
      console.log("Error occurred:", error);
      if (error.response) {
        console.error("Gönderilen veri:", formData);
        console.error("Error response:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
        setErrorMessage(error.response.data.message || "Bir hata oluştu. Lütfen tekrar deneyin.");
      } else if (error.request) {
        console.error("Gönderilen veri:", formData);
        console.error("Error request:", error.request);
        setErrorMessage("Sunucuya ulaşılamadı. Lütfen daha sonra tekrar deneyin.");
      } else {
        console.error("Gönderilen veri:", formData);
        console.error("Error message:", error.message);
        setErrorMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    }
  };

  return (
    <div className="container">
      {loginData === null && (
        <div className="alert alert-danger" role="alert">
          Ev eklemek için giriş yapmalısınız.
        </div>
      )}
      {loginData && (
        <>
          <h2>Ev Oluştur</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="address">Adres:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="rooms">Oda Sayısı:</label>
              <input
                type="number"
                id="rooms"
                name="rooms"
                value={formData.rooms}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price">Fiyat:</label>
              <input
                type="number"
                step="0.01"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                id="availability"
                name="availability"
                checked={formData.availability}
                onChange={handleChange}
                className="form-check-input"
              />
              <label htmlFor="availability" className="form-check-label">
                Müsaitlik
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="image">Ev Görseli:</label>
              <input
                type="file"
                id="image"
                name="image"
                className="form-control"
                onChange={onSelectImage}
                accept="image/*"
              />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">
                Ev Oluştur
              </button>
            </div>
          </form>
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          {addedHome && (
            <div className="mt-3">
              <h3>Eklenen Ev</h3>
              <p><strong>Adres:</strong> {addedHome.address}</p>
              <p><strong>Oda Sayısı:</strong> {addedHome.rooms}</p>
              <p><strong>Fiyat:</strong> {addedHome.price}</p>
              <p><strong>Müsaitlik:</strong> {addedHome.availability ? "Evet" : "Hayır"}</p>
              {addedHome.image && (
                <div>
                  <img src={`data:image/jpeg;base64,${addedHome.image}`} alt="Ev Görseli" className="img-fluid" />
                </div>
              )}
            </div>
          )}
        </>
      )}
      <h2>Mevcut Evler</h2>
      <div className="home-list">
        {homes.map((home) => (
          <div key={home.id} className="card">
            <img src={`data:image/jpeg;base64,${home.image}`} alt={home.address} className="img-fluid" />
            <h3>{home.address}</h3>
            <p>Oda Sayısı: {home.rooms}</p>
            <p>Fiyat: {home.price}</p>
            <p>Müsaitlik: {home.availability ? "Evet" : "Hayır"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}