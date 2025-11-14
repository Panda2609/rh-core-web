import React, { useState } from 'react';
import { FaGraduationCap, FaCheckCircle, FaClock, FaUsers } from 'react-icons/fa';
import './Training.css';

const Training = () => {
  const [trainings] = useState([
    {
      id: 1,
      name: 'React Avanzado',
      type: 'Interna',
      startDate: '2025-11-01',
      endDate: '2025-11-15',
      hours: 20,
      participants: 8,
      status: 'En Progreso',
      instructors: 'Juan Gómez',
    },
    {
      id: 2,
      name: 'Liderazgo y Gestión',
      type: 'Externa',
      startDate: '2025-10-15',
      endDate: '2025-10-30',
      hours: 15,
      participants: 12,
      status: 'Completada',
      instructors: 'María Fernández (Capacitadora Externa)',
    },
    {
      id: 3,
      name: 'Seguridad en Datos',
      type: 'Interna',
      startDate: '2025-11-20',
      endDate: '2025-11-25',
      hours: 12,
      participants: 5,
      status: 'Programada',
      instructors: 'Carlos López',
    },
    {
      id: 4,
      name: 'Comunicación Efectiva',
      type: 'Externa',
      startDate: '2025-12-01',
      endDate: '2025-12-05',
      hours: 10,
      participants: 15,
      status: 'Programada',
      instructors: 'Instituto de Capacitación ABC',
    },
  ]);

  const [attendanceByEmployee] = useState([
    { employee: 'Juan Pérez García', courses: 5, totalHours: 45 },
    { employee: 'María López Rodríguez', courses: 8, totalHours: 72 },
    { employee: 'Carlos Martínez Silva', courses: 3, totalHours: 28 },
    { employee: 'Ana González Torres', courses: 6, totalHours: 54 },
    { employee: 'Roberto Fernández Díaz', courses: 2, totalHours: 18 },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completada':
        return '#4caf50';
      case 'En Progreso':
        return '#ff9800';
      case 'Programada':
        return '#667eea';
      default:
        return '#999';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completada':
        return <FaCheckCircle />;
      case 'En Progreso':
        return <FaClock />;
      case 'Programada':
        return <FaGraduationCap />;
      default:
        return null;
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Gestión de Capacitación</h1>
        <button className="btn btn-primary">
          <FaGraduationCap /> Registrar Capacitación
        </button>
      </div>

      <div className="page-content">

        <div className="stats-grid">
          <div className="stat-card">
            <FaGraduationCap className="stat-icon" />
            <h3>Capacitaciones Activas</h3>
            <p className="stat-value">{trainings.filter(t => t.status === 'En Progreso').length}</p>
          </div>
          <div className="stat-card">
            <FaCheckCircle className="stat-icon" />
            <h3>Completadas</h3>
            <p className="stat-value">{trainings.filter(t => t.status === 'Completada').length}</p>
          </div>
          <div className="stat-card">
            <FaUsers className="stat-icon" />
            <h3>Participantes Totales</h3>
            <p className="stat-value">{trainings.reduce((sum, t) => sum + t.participants, 0)}</p>
          </div>
          <div className="stat-card">
            <h3>Total Horas Invertidas</h3>
            <p className="stat-value">{trainings.reduce((sum, t) => sum + t.hours, 0)}h</p>
          </div>
        </div>

        <div className="content-section">
          <h2>Registro de Capacitaciones</h2>
          <div className="trainings-grid">
            {trainings.map((training) => (
              <div key={training.id} className="training-card">
                <div className="training-header">
                  <h3>{training.name}</h3>
                  <div
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(training.status) }}
                  >
                    {getStatusIcon(training.status)}
                    {training.status}
                  </div>
                </div>

                <div className="training-info">
                  <p>
                    <strong>Tipo:</strong>{' '}
                    <span className={`type-badge type-${training.type.toLowerCase()}`}>
                      {training.type}
                    </span>
                  </p>
                  <p>
                    <strong>Instructor:</strong> {training.instructors}
                  </p>
                  <p>
                    <strong>Fechas:</strong>{' '}
                    {new Date(training.startDate).toLocaleDateString('es-ES')} -{' '}
                    {new Date(training.endDate).toLocaleDateString('es-ES')}
                  </p>
                  <p>
                    <strong>Duración:</strong> {training.hours} horas
                  </p>
                  <p>
                    <strong>Participantes:</strong> {training.participants}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="content-section">
          <h2>Control de Asistencia y Horas por Funcionario</h2>
          <div className="table-container">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Funcionario</th>
                  <th>Cursos Asistidos</th>
                  <th>Total Horas</th>
                  <th>Promedio</th>
                </tr>
              </thead>
              <tbody>
                {attendanceByEmployee.map((item, index) => (
                  <tr key={index}>
                    <td className="employee-name">{item.employee}</td>
                    <td className="centered">
                      <span className="badge">{item.courses}</span>
                    </td>
                    <td className="centered">
                      <span className="hours-badge">{item.totalHours}h</span>
                    </td>
                    <td className="centered">
                      <span className="average">
                        {(item.totalHours / item.courses).toFixed(1)}h
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Training;
