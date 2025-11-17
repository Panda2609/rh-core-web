import React, { useState } from 'react';
import { FaCheck, FaTimes, FaClock, FaCalendarAlt } from 'react-icons/fa';
import { attendanceData, leavesData } from '../data/attendance';
import Modal from '../components/Modal';
import AttendanceForm from '../components/AttendanceForm';
import './Attendance.css';

const Attendance = () => {
  const [attendance, setAttendance] = useState(attendanceData);
  const [leaves] = useState(leavesData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'register', 'edit'
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedDate, setSelectedDate] = useState('2025-11-13');

  const openModal = (type = 'register', record = null) => {
    setModalType(type);
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

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

  const handleAddAttendance = (newAttendanceData) => {
    const newRecord = {
      ...newAttendanceData,
      id: Math.max(...attendance.map(a => a.id), 0) + 1
    };
    setAttendance(prev => [...prev, newRecord]);
    setIsModalOpen(false);
  };

  const handleEditAttendance = (updatedAttendanceData) => {
    setAttendance(prev =>
      prev.map(record => record.id === updatedAttendanceData.id ? updatedAttendanceData : record)
    );
    setIsModalOpen(false);
  };

  // Filtrar asistencia por fecha seleccionada
  const filteredAttendance = attendance.filter(a => a.date === selectedDate);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Gestión de Asistencia</h1>
        <button 
          className="btn btn-primary"
          onClick={() => openModal('register')}
        >
          Registrar Asistencia
        </button>
      </div>

        <div className="stats-grid">
            <div className="stat-card">
            <h3>Presentes Hoy</h3>
            <p className="stat-value">{filteredAttendance.filter(a => a.status === 'Presente').length}</p>
            </div>
            <div className="stat-card">
            <h3>Ausentes</h3>
            <p className="stat-value">{filteredAttendance.filter(a => a.status === 'Ausente').length}</p>
            </div>
            <div className="stat-card">
            <h3>En Permiso</h3>
            <p className="stat-value">{filteredAttendance.filter(a => a.status === 'Permiso').length}</p>
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
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
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
                {filteredAttendance.map((record) => (
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

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={modalType === 'register' ? 'Registrar Asistencia' : 'Editar Asistencia'}
        size="medium"
      >
        {(modalType === 'register' || modalType === 'edit') && (
          <AttendanceForm 
            record={modalType === 'edit' ? selectedRecord : null}
            onSubmit={modalType === 'register' ? handleAddAttendance : handleEditAttendance}
            onCancel={() => setIsModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
};

export default Attendance;
