import React, { useEffect } from 'react';
import { messaging } from '../../config/firebase';
import { getToken } from 'firebase/messaging';
import { useNavigate } from 'react-router-dom';

function Home1() {
  const navigate = useNavigate();

  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      alert('You accepted for the notifications');
      // Generate Token
      const token = await getToken(messaging, {
        vapidKey:
          'BNH7qrNuLaEZzpO--zixAvwwa7BgTHiJfKh_YSKikom_7XF8mk_LhJ2zuLZnyWLpzA9ZLzIJx19K9xYptTN4fCs',
      });
      console.log('Token Gen', token);
      // Send this token to server (db)
    } else if (permission === 'denied') {
      alert('You denied for the notification');
    }
  }

  const handleButtonClick = async () => {
    // Request user for notification permission
    await requestPermission();

    // Simulate a message payload
    const payload = {
      notification: {
        title: 'Button Clicked',
        body: 'This is a notification triggered by a button click!',
        image: 'path/to/icon.png',
      },
    };

    // Handle the notification
    console.log('[Home1] Received foreground message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image,
    };

    // Display the notification in the browser
    const notification = new Notification(notificationTitle, notificationOptions);

    // Open a new page when the notification is clicked
    notification.onclick = () => {
      navigate('/new-page'); // Replace '/new-page' with the desired route
    };
  };

  return (
    <div className="">
      <button onClick={handleButtonClick}>Trigger Notification</button>
      <div>Welcome to homepage</div>
    </div>
  );
}

export default Home1;
