import { useEffect, useState, useContext } from 'react';
import { FaBell } from 'react-icons/fa';
import axios from 'axios';
import { LoginContext } from '../pages/state/context';
import { useNavigate } from 'react-router-dom';
import './NotificationIcon.css';

function NotificationIcon() {
  const { login } = useContext(LoginContext);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (login && login.id) {
      axios.get(`/api/v1/notifications/user/${login.id}`)
        .then(response => {
          const unreadNotifications = response.data.filter(notification => !notification.read);
          setUnreadCount(unreadNotifications.length);
        })
        .catch(error => console.error('Error fetching notifications:', error));
    }
  }, [login]);

  const handleIconClick = () => {
    axios.put(`/api/v1/notifications/user/${login.id}/mark-all-read`)
      .then(() => {
        setUnreadCount(0);
        navigate('/');
        setTimeout(() => {
          window.location.reload(); // Sayfayı yenile
        }, 100); // Yenileme işlemi için kısa bir gecikme ekleyin
      })
      .catch(error => console.error('Error marking notifications as read:', error));
  };

  return (
    <div className="notification-icon-container">
      <div className="notification-icon" onClick={handleIconClick}>
        <FaBell size={24} />
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </div>
    </div>
  );
}

export default NotificationIcon;
