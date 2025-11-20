import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaClipboardList, FaMoneyBillWave, FaStar, FaBook, FaLock } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { id: 1, label: 'Empleados', path: '/rh-core-web/employees', icon: FaUsers },
    { id: 2, label: 'Asistencia', path: '/rh-core-web/attendance', icon: FaClipboardList },
    { id: 3, label: 'Remuneraciones', path: '/rh-core-web/payroll', icon: FaMoneyBillWave },
    { id: 4, label: 'Evaluaciones', path: '/rh-core-web/performance', icon: FaStar },
    { id: 5, label: 'Capacitación', path: '/rh-core-web/training', icon: FaBook },
    { id: 6, label: 'Usuarios y Roles', path: '/rh-core-web/users', icon: FaLock },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>RH Core</h1>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.id} to={item.path} className="nav-link">
              <Icon className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
