import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './ContactSectionTop.css';
import facebookIcon from '../../img/Facebook.png';
import twitterIcon from '../../img/Twitter.png';
import youtubeIcon from '../../img/YouTube.png';
import instagramIcon from '../../img/Instagram.png';
import linkedinIcon from '../../img/Linked-In.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const ContactSection = () => {
  return (
    <section className="contact-section">
      <div className="contact-info">
        <h2 className="contact-title">Контактная информация</h2>
        <p className="contact-subtitle">Свяжитесь с нами</p>
        <p><strong>Email:</strong> hello@createx.com</p>
        <p><strong>Телефон:</strong> (44) 730-04-86</p>
        <p><strong>Адрес:</strong> 2464 Royal Ln. Mesa, New Jersey 45463, USA</p>
        <div className='bottom-info'>
        <h2 className="contact-title">Подписывайтесь на нас:</h2>
        <div className="social-icons">
          <img src={facebookIcon} alt="Facebook" />
          <img src={twitterIcon} alt="Twitter" />
          <img src={youtubeIcon} alt="YouTube" />
          <img src={instagramIcon} alt="Instagram" />
          <img src={linkedinIcon} alt="LinkedIn" />
        </div>
        </div>
      </div>
      <div className="map-container">
        <MapContainer center={[40.092978, -74.214721]} zoom={13} className="map">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[40.092978, -74.214721]}>
            <Popup>
              2464 Royal Ln. Mesa, New Jersey 45463, USA
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </section>
  );
};

export default ContactSection;
