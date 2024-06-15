import  { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { LoginContext } from '../state/context';

function Notifications() {
  const { login } = useContext(LoginContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (login && login.id) {
      axios.get(`/api/v1/notifications/user/${login.id}`)
        .then(response => {
          setNotifications(response.data);
          axios.put(`/api/v1/notifications/user/${login.id}/mark-all-read`)
            .catch(error => console.error('Error marking notifications as read:', error));
        })
        .catch(error => console.error('Error fetching notifications:', error));
    }
  }, [login]);

  return (
    <div className="container">
      <h3>Bildirimler</h3>
      <ul className="list-group">
        {notifications.map(notification => (
          <li key={notification.id} className="list-group-item">
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
