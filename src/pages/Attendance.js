import React, { useState } from 'react';
import { FaCheck, FaTimes, FaClock, FaCalendarAlt } from 'react-icons/fa';
import './Attendance.css';

const Attendance = () => {
  const [attendance] = useState([
    {
      id: 1,
      employee: 'Juan Pérez García',
      date: '2025-11-13',
      entryTime: '08:00',
      exitTime: '17:30',
      status: 'Presente',
      hoursWorked: 9.5,
    },
    {
      id: 2,
      employee: 'María López Rodríguez',
      date: '2025-11-13',
      entryTime: '08:15',
      exitTime: '17:45',
      status: 'Presente',
      hoursWorked: 9.5,
    },
    {
      id: 3,
      employee: 'Carlos Martínez Silva',
      date: '2025-11-13',
      entryTime: null,
      exitTime: null,
      status: 'Ausente',
      hoursWorked: 0,
    },
    {
      id: 4,
      employee: 'Ana González Torres',
      date: '2025-11-13',
      entryTime: '09:00',
      exitTime: '17:00',
      status: 'Presente',
      hoursWorked: 8,
    },
    {
      id: 5,
      employee: 'Roberto Fernández Díaz',
      date: '2025-11-13',
      entryTime: '08:30',
      exitTime: '12:00',
      status: 'Permiso',
      hoursWorked: 3.5,
    },
  ]);

  const [leaves] = useState([
    {
      id: 1,
      employee: 'Pedro González',
      type: 'Vacaciones',
      startDate: '2025-11-20',
      endDate: '2025-11-30',
      days: 10,
      status: 'Aprobado',
    },
    {
      id: 2,
      employee: 'Laura Martínez',
      type: 'Licencia Médica',
      startDate: '2025-11-15',
      endDate: '2025-11-17',
      days: 3,
      status: 'Pendiente',
    },
    {
      id: 3,
      employee: 'David López',
      type: 'Permisos',
      startDate: '2025-11-14',
      endDate: '2025-11-14',
      days: 1,
      status: 'Aprobado',
    },
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Presente':
        return <FaCheck className="icon-check" />;
      case 'Ausente':
        return <FaTimes className="icon-times" />;
      case 'Permiso':
        return <FaClock className="icon-clock" />;
      default:
        return null;
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Gestión de Asistencia</h1>
        <button className="btn btn-primary">Registrar Asistencia</button>
      </div>

      <div className="page-content">
        <div className="content-section">
          <h2>Registro de Asistencia Diaria</h2>
          <div className="date-filter">
            <FaCalendarAlt />
            <input type="date" defaultValue="2025-11-13" />
          </div>

          <div className="table-container">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Empleado</th>
                  <th>Entrada</th>
                  <th>Salida</th>
                  <th>Horas Trabajadas</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((record) => (
                  <tr key={record.id}>
                    <td>{record.employee}</td>
                    <td>{record.entryTime || '-'}</td>
                    <td>{record.exitTime || '-'}</td>
                    <td>{record.hoursWorked}h</td>
                    <td className="status-cell">
                      <div className={`status-badge status-${record.status.toLowerCase()}`}>
                        {getStatusIcon(record.status)}
                        {record.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="content-section">
          <h2>Permisos, Licencias y Vacaciones</h2>
          <div className="leaves-grid">
            {leaves.map((leave) => (
              <div key={leave.id} className="leave-card">
                <div className="leave-header">
                  <h3>{leave.employee}</h3>
                  <span className={`leave-status leave-${leave.status.toLowerCase()}`}>
                    {leave.status}
                  </span>
                </div>
                <div className="leave-info">
                  <p><strong>Tipo:</strong> {leave.type}</p>
                  <p><strong>Desde:</strong> {new Date(leave.startDate).toLocaleDateString('es-ES')}</p>
                  <p><strong>Hasta:</strong> {new Date(leave.endDate).toLocaleDateString('es-ES')}</p>
                  <p><strong>Días:</strong> {leave.days}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Presentes Hoy</h3>
            <p className="stat-value">{attendance.filter(a => a.status === 'Presente').length}</p>
          </div>
          <div className="stat-card">
            <h3>Ausentes</h3>
            <p className="stat-value">{attendance.filter(a => a.status === 'Ausente').length}</p>
          </div>
          <div className="stat-card">
            <h3>En Permiso</h3>
            <p className="stat-value">{attendance.filter(a => a.status === 'Permiso').length}</p>
          </div>
          <div className="stat-card">
            <h3>Solicitudes Pendientes</h3>
            <p className="stat-value">{leaves.filter(l => l.status === 'Pendiente').length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
