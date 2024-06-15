import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../state/context";
import "./offer.css";

export function Offer() {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [price, setPrice] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState('');
  const [homeOwner, setHomeOwner] = useState(null);

  useEffect(() => {
    // Ev sahibi bilgisini almak için API çağrısı
    const fetchHomeDetails = async () => {
      try {
        const response = await axios.get(`/api/v1/homes/${id}`);
        console.log("home içindeki kullanıcı id",response.data.userId);
        setHomeOwner(response.data.userId); // userId yanıtın içinde olduğunu varsayıyoruz
      } catch (error) {
        console.error("Error fetching home details:", error);
      }
    };
    fetchHomeDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!login || !login.id) {
      console.error("User is not logged in or user ID is missing");
      return;
    }

    try {
      const offer = {
        homeId: id,
        userId: homeOwner,
        message,
        price,
        checkInDate,
        checkOutDate
      };
      await axios.post("/api/v1/offers", offer);

      if (homeOwner) {
        await axios.post("/api/v1/notifications", {
          userId: homeOwner,
          message: `Yeni bir teklif aldınız: ${message}`,
          offerId: id,
        });
      }

      setFeedback('Teklif başarıyla gönderildi!');
      setTimeout(() => {
        navigate("/"); 
      }, 2000);
    } catch (error) {
      console.error("Error creating offer:", error);
      setFeedback('Teklif gönderilirken bir hata oluştu.');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h3>Teklif Yap</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Teklif Mesajı:</label>
                  <textarea
                    className="form-control"
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Fiyat Teklifi:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="checkInDate" className="form-label">Giriş Tarihi:</label>
                  <input
                    type="date"
                    className="form-control"
                    id="checkInDate"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="checkOutDate" className="form-label">Çıkış Tarihi:</label>
                  <input
                    type="date"
                    className="form-control"
                    id="checkOutDate"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    required
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Gönder</button>
                </div>
              </form>
              {feedback && <div className="mt-3 text-center">{feedback}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
