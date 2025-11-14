import React from 'react';
import { FaTools } from 'react-icons/fa';
import './DevelopmentNotice.css';

const DevelopmentNotice = ({ feature = 'Esta funcionalidad' }) => {
  return (
    <div className="development-notice">
      <div className="development-icon">
        <FaTools />
      </div>
      <h3>En Desarrollo</h3>
      <p>{feature} está en desarrollo y estará disponible próximamente.</p>
      <p className="development-subtitle">Gracias por tu paciencia.</p>
    </div>
  );
};

export default DevelopmentNotice;
