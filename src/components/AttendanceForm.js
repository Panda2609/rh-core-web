import React, { useState, useEffect } from 'react';
import { employeesData } from '../data/employees';
import './AttendanceForm.css';

const AttendanceForm = ({ record = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    employee: '',
    date: new Date().toISOString().split('T')[0],
    entryTime: '',
    exitTime: '',
    status: 'Presente',
  });
  const [errors, setErrors] = useState({});
  const [hoursWorked, setHoursWorked] = useState(0);

  // Si es edición, cargar datos del registro
  useEffect(() => {
    if (record) {
      setFormData(record);
      calculateHours(record.entryTime, record.exitTime);
    }
  }, [record]);

  // Calcular horas trabajadas cuando cambien entrada o salida
  useEffect(() => {
    if (formData.entryTime && formData.exitTime) {
      calculateHours(formData.entryTime, formData.exitTime);
    }
  }, [formData.entryTime, formData.exitTime]);

  const calculateHours = (entry, exit) => {
    if (!entry || !exit) {
      setHoursWorked(0);
      return;
    }

    const [entryH, entryM] = entry.split(':').map(Number);
    const [exitH, exitM] = exit.split(':').map(Number);

    const entryMinutes = entryH * 60 + entryM;
    const exitMinutes = exitH * 60 + exitM;

    const diffMinutes = exitMinutes - entryMinutes;
    const hours = diffMinutes / 60;

    setHoursWorked(Math.max(0, hours));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.employee.trim()) {
      newErrors.employee = 'Selecciona un empleado';
    }
    if (!formData.date) {
      newErrors.date = 'La fecha es requerida';
    }

    if (formData.status === 'Presente') {
      if (!formData.entryTime) {
        newErrors.entryTime = 'La hora de entrada es requerida';
      }
      if (!formData.exitTime) {
        newErrors.exitTime = 'La hora de salida es requerida';
      }
      if (formData.entryTime && formData.exitTime && formData.entryTime >= formData.exitTime) {
        newErrors.exitTime = 'La hora de salida debe ser posterior a la de entrada';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo cuando el usuario interactúa
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const dataToSubmit = {
        ...formData,
        hoursWorked: formData.status === 'Presente' ? hoursWorked : 0,
        id: record?.id || Math.random(),
      };
      onSubmit(dataToSubmit);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="attendance-form">
      <div className="form-group">
        <label htmlFor="employee">Empleado</label>
        <select
          id="employee"
          name="employee"
          value={formData.employee}
          onChange={handleChange}
          className={errors.employee ? 'input-error' : ''}
        >
          <option value="">Selecciona un empleado</option>
          {employeesData.map(emp => (
            <option key={emp.id} value={emp.name}>
              {emp.name}
            </option>
          ))}
        </select>
        {errors.employee && <span className="error-message">{errors.employee}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="date">Fecha</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={errors.date ? 'input-error' : ''}
        />
        {errors.date && <span className="error-message">{errors.date}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="status">Estado</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Presente">Presente</option>
          <option value="Ausente">Ausente</option>
          <option value="Permiso">Permiso</option>
        </select>
      </div>

      {formData.status === 'Presente' && (
        <>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="entryTime">Hora de Entrada</label>
              <input
                type="time"
                id="entryTime"
                name="entryTime"
                value={formData.entryTime}
                onChange={handleChange}
                className={errors.entryTime ? 'input-error' : ''}
              />
              {errors.entryTime && <span className="error-message">{errors.entryTime}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="exitTime">Hora de Salida</label>
              <input
                type="time"
                id="exitTime"
                name="exitTime"
                value={formData.exitTime}
                onChange={handleChange}
                className={errors.exitTime ? 'input-error' : ''}
              />
              {errors.exitTime && <span className="error-message">{errors.exitTime}</span>}
            </div>
          </div>

          <div className="hours-display">
            <p>Horas trabajadas: <strong>{hoursWorked.toFixed(2)}h</strong></p>
          </div>
        </>
      )}

      <div className="form-actions">
        <button 
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button 
          type="submit"
          className="btn btn-primary"
        >
          {record ? 'Guardar Cambios' : 'Registrar Asistencia'}
        </button>
      </div>
    </form>
  );
};

export default AttendanceForm;
