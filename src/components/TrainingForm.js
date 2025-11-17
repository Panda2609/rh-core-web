import React, { useState, useEffect } from 'react';
import './TrainingForm.css';

const TrainingForm = ({ training = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Interna',
    startDate: '',
    endDate: '',
    hours: '',
    participants: '',
    status: 'Programada',
    instructors: '',
  });
  const [errors, setErrors] = useState({});

  // Si es edición, cargar datos de la capacitación
  useEffect(() => {
    if (training) {
      setFormData(training);
    }
  }, [training]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre de la capacitación es requerido';
    }
    if (!formData.startDate) {
      newErrors.startDate = 'La fecha de inicio es requerida';
    }
    if (!formData.endDate) {
      newErrors.endDate = 'La fecha de fin es requerida';
    }
    if (formData.startDate && formData.endDate && formData.startDate >= formData.endDate) {
      newErrors.endDate = 'La fecha de fin debe ser posterior a la de inicio';
    }
    if (!formData.hours || formData.hours <= 0) {
      newErrors.hours = 'Las horas deben ser mayor a 0';
    }
    if (!formData.participants || formData.participants <= 0) {
      newErrors.participants = 'Los participantes deben ser mayor a 0';
    }
    if (!formData.instructors.trim()) {
      newErrors.instructors = 'El nombre del instructor es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'hours' || name === 'participants' ? parseInt(value) || '' : value
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
        id: training?.id || Math.random(),
      };
      onSubmit(dataToSubmit);
    }
  };

  const calculateDuration = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      return days;
    }
    return 0;
  };

  return (
    <form onSubmit={handleSubmit} className="training-form">
      <div className="form-group">
        <label htmlFor="name">Nombre de la Capacitación</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'input-error' : ''}
          placeholder="Ej: React Avanzado"
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="type">Tipo de Capacitación</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="Interna">Interna</option>
            <option value="Externa">Externa</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">Estado</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Programada">Programada</option>
            <option value="En Progreso">En Progreso</option>
            <option value="Completada">Completada</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="startDate">Fecha de Inicio</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className={errors.startDate ? 'input-error' : ''}
          />
          {errors.startDate && <span className="error-message">{errors.startDate}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="endDate">Fecha de Fin</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className={errors.endDate ? 'input-error' : ''}
          />
          {errors.endDate && <span className="error-message">{errors.endDate}</span>}
        </div>
      </div>

      {calculateDuration() > 0 && (
        <div className="duration-info">
          <p>Duración: <strong>{calculateDuration()} días</strong></p>
        </div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="hours">Horas de Capacitación</label>
          <input
            type="number"
            id="hours"
            name="hours"
            value={formData.hours}
            onChange={handleChange}
            className={errors.hours ? 'input-error' : ''}
            placeholder="Ej: 20"
            min="1"
          />
          {errors.hours && <span className="error-message">{errors.hours}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="participants">Número de Participantes</label>
          <input
            type="number"
            id="participants"
            name="participants"
            value={formData.participants}
            onChange={handleChange}
            className={errors.participants ? 'input-error' : ''}
            placeholder="Ej: 8"
            min="1"
          />
          {errors.participants && <span className="error-message">{errors.participants}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="instructors">Instructor/es</label>
        <input
          type="text"
          id="instructors"
          name="instructors"
          value={formData.instructors}
          onChange={handleChange}
          className={errors.instructors ? 'input-error' : ''}
          placeholder="Ej: Juan Gómez o Instituto XYZ"
        />
        {errors.instructors && <span className="error-message">{errors.instructors}</span>}
      </div>

      <div className="form-summary">
        <div className="summary-item">
          <span>Tipo:</span>
          <strong>{formData.type}</strong>
        </div>
        <div className="summary-item">
          <span>Estado:</span>
          <strong>{formData.status}</strong>
        </div>
        {formData.hours && (
          <div className="summary-item">
            <span>Total horas:</span>
            <strong>{formData.hours}h</strong>
          </div>
        )}
      </div>

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
          {training ? 'Guardar Cambios' : 'Registrar Capacitación'}
        </button>
      </div>
    </form>
  );
};

export default TrainingForm;
