import React, { useState } from 'react';
import { FaCheck, FaTimes, FaClock, FaCalendarAlt } from 'react-icons/fa';
import { attendanceData, leavesData } from '../data/attendance';
import './Attendance.css';

const Attendance = () => {
  const [attendance] = useState(attendanceData);
  const [leaves] = useState(leavesData);

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

      </div>
    </div>
  );
};

export default Attendance;
