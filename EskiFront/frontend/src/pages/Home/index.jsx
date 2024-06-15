/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Slider from "react-slick";
import "./home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LoginContext } from "../state/context";
import { useNavigate } from "react-router-dom";

export function Home() {
  const [homes, setHomes] = useState([]);
  const [offers, setOffers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const { login } = useContext(LoginContext);

  const baseURL = "http://localhost:8080/images/";
  const loginState = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (login && login.id) {
      fetchNotifications(login.id);
    }
    fetchHomes();
    fetchUser();
    fetchOffers();
    console.log("LocalStorageData", loginState.login);
  }, []);

  const fetchNotifications = async (userId) => {
    try {
      const response = await axios.get(`/api/v1/notifications/user/${userId}`);
      const unreadNotifications = response.data.filter(notification => !notification.read);
      setNotifications(unreadNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const fetchHomes = async () => {
    try {
      const response = await axios.get("/api/v1/homes");
      setHomes(response.data);
      console.log("Homes data:", response.data);
    } catch (error) {
      console.error("Error fetching homes:", error);
    }
  };

  const fetchUser = async () => {
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    if (loginData && loginData.userDto) {
      const userEmail = loginData.userDto.email;
      try {
        const response = await axios.get(`/api/users/current?email=${userEmail}`);
        loginState.onLoginSuccess(response.data);
        console.log("User data:", response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
  };

  const fetchOffers = async () => {
    if (loginState && loginState.login) {
      try {
        console.log("localStorage id", loginState.login.id);
        const response = await axios.get(`/api/v1/offers/user/${loginState.login.id}`);
        const sortedOffers = response.data.sort((a, b) => b.id - a.id);
        setOffers(sortedOffers);
        console.log("Offers data:", response.data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    }
  };

  const handleAcceptOffer = async (offerId, notification) => {
    if (notification && notification.userId) {
      try {
        await axios.post(`/api/v1/notifications/offer/${offerId}/accept`);
        await axios.post(`/api/v1/notifications`, {
          userId: notification.userId,
          message: `Your offer with ID ${offerId} has been accepted.`,
          offerId: offerId,
        });
        setNotifications(notifications.filter(n => n.offerId !== offerId));
        window.location.reload();
      } catch (error) {
        console.error('Error accepting offer:', error);
      }
    } else {
      console.error('Invalid notification object:', notification);
    }
  };

  const handleRejectOffer = async (offerId, notification) => {
    if (notification && notification.userId) {
      try {
        await axios.post(`/api/v1/notifications/offer/${offerId}/reject`);
        await axios.post(`/api/v1/notifications`, {
          userId: notification.userId,
          message:` Your offer with ID ${offerId} has been rejected.`,
          offerId: offerId,
        });
        setNotifications(notifications.filter(n => n.offerId !== offerId));
        window.location.reload();
      } catch (error) {
        console.error('Error rejecting offer:', error);
      }
    } else {
      console.error('Invalid notification object:', notification);
    }
  };

  const handleOfferClick = (homeId) => {
    navigate(`/offer/${homeId}`);
  };

  const sliderSettings = {
    centerMode: true,
    centerPadding: "60px",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "40px",
        },
      },
    ],
  };

  return (
    <div className="container">
      <div className="offer-slider">
        <h2>Gelen Teklifler</h2>
        <Slider {...sliderSettings}>
          {offers.map((offer) => {
            const relatedNotification = notifications.find(n => n.offerId === offer.id);
            return (
              <div
                key={offer.id}
                className={`offer-card ${
                  offer.status === "Accepted"
                    ? "accepted"
                    : offer.status === "Rejected"
                    ? "rejected"
                    : ""
                }`}
              >
                <h3>Teklif ID: {offer.id}</h3>
                <p>Mesaj: {offer.message}</p>
                <p>Fiyat: {offer.price}</p>
                <p>Durum: {offer.status}</p>
                {offer.status===null && (
                  <div className="offer-actions">
                    <button onClick={() => handleAcceptOffer(offer.id, relatedNotification)}>Onayla</button>
                    <button onClick={() => handleRejectOffer(offer.id, relatedNotification)}>Reddet</button>
                  </div>
                )}
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="home-list">
        {homes.map((home) => (
          <div key={home.id} className="card">
            <img src={`data:image/jpeg;base64,${home.image}`} alt={home.address} className="img-fluid" />
            <h3>{home.address}</h3>
            <p>Oda Sayısı: {home.rooms}</p>
            <p>Fiyat: {home.price}</p>
            <p>Müsaitlik: {home.availability ? "Evet" : "Hayır"}</p>
            <div className="card-buttons">
              <button
                onClick={() => handleOfferClick(home.id)}
                className="btn btn-primary"
              >
                Teklif Yap
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}