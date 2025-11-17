import React, { useState, useEffect } from 'react';
import { employeesData } from '../data/employees';
import './PerformanceForm.css';

const PerformanceForm = ({ evaluation = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    employee: '',
    department: '',
    period: '',
    observations: '',
    competencies: {
      technical: 5,
      communication: 5,
      leadership: 5,
      teamwork: 5,
    },
  });
  const [errors, setErrors] = useState({});

  // Si es edición, cargar datos de la evaluación
  useEffect(() => {
    if (evaluation) {
      setFormData(evaluation);
    }
  }, [evaluation]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.employee.trim()) {
      newErrors.employee = 'Selecciona un empleado';
    }
    if (!formData.period.trim()) {
      newErrors.period = 'El período es requerido';
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
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCompetencyChange = (competency, value) => {
    const numValue = Math.min(10, Math.max(0, parseFloat(value) || 0));
    setFormData(prev => ({
      ...prev,
      competencies: {
        ...prev.competencies,
        [competency]: numValue
      }
    }));
  };

  const handleEmployeeChange = (e) => {
    const employeeName = e.target.value;
    const employee = employeesData.find(emp => emp.name === employeeName);
    
    setFormData(prev => ({
      ...prev,
      employee: employeeName,
      department: employee?.department || ''
    }));
    
    if (errors.employee) {
      setErrors(prev => ({
        ...prev,
        employee: ''
      }));
    }
  };

  const calculateAverageScore = () => {
    const scores = Object.values(formData.competencies);
    return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const dataToSubmit = {
        ...formData,
        score: parseFloat(calculateAverageScore()),
        id: evaluation?.id || Math.random(),
      };
      onSubmit(dataToSubmit);
    }
  };

  const periods = [
    'Semestre 1 - 2025',
    'Semestre 2 - 2025',
    'Anual 2025',
    'Trimestre 1 - 2025',
    'Trimestre 2 - 2025',
    'Trimestre 3 - 2025',
    'Trimestre 4 - 2025',
  ];

  return (
    <form onSubmit={handleSubmit} className="performance-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="employee">Empleado</label>
          <select
            id="employee"
            name="employee"
            value={formData.employee}
            onChange={handleEmployeeChange}
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
          <label htmlFor="department">Departamento</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            disabled
            className="disabled-input"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="period">Período de Evaluación</label>
        <select
          id="period"
          name="period"
          value={formData.period}
          onChange={handleChange}
          className={errors.period ? 'input-error' : ''}
        >
          <option value="">Selecciona un período</option>
          {periods.map(p => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        {errors.period && <span className="error-message">{errors.period}</span>}
      </div>

      <div className="competencies-section">
        <h3>Evaluación de Competencias (0-10)</h3>
        <div className="competencies-grid">
          <div className="competency-item">
            <label htmlFor="technical">Competencia Técnica</label>
            <div className="input-with-value">
              <input
                type="range"
                id="technical"
                min="0"
                max="10"
                step="0.5"
                value={formData.competencies.technical}
                onChange={(e) => handleCompetencyChange('technical', e.target.value)}
                className="slider"
              />
              <span className="value-display">{formData.competencies.technical.toFixed(1)}</span>
            </div>
          </div>

          <div className="competency-item">
            <label htmlFor="communication">Comunicación</label>
            <div className="input-with-value">
              <input
                type="range"
                id="communication"
                min="0"
                max="10"
                step="0.5"
                value={formData.competencies.communication}
                onChange={(e) => handleCompetencyChange('communication', e.target.value)}
                className="slider"
              />
              <span className="value-display">{formData.competencies.communication.toFixed(1)}</span>
            </div>
          </div>

          <div className="competency-item">
            <label htmlFor="leadership">Liderazgo</label>
            <div className="input-with-value">
              <input
                type="range"
                id="leadership"
                min="0"
                max="10"
                step="0.5"
                value={formData.competencies.leadership}
                onChange={(e) => handleCompetencyChange('leadership', e.target.value)}
                className="slider"
              />
              <span className="value-display">{formData.competencies.leadership.toFixed(1)}</span>
            </div>
          </div>

          <div className="competency-item">
            <label htmlFor="teamwork">Trabajo en Equipo</label>
            <div className="input-with-value">
              <input
                type="range"
                id="teamwork"
                min="0"
                max="10"
                step="0.5"
                value={formData.competencies.teamwork}
                onChange={(e) => handleCompetencyChange('teamwork', e.target.value)}
                className="slider"
              />
              <span className="value-display">{formData.competencies.teamwork.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="score-summary">
        <p>Puntuación Promedio: <strong className={`score-${calculateAverageScore() >= 8 ? 'high' : calculateAverageScore() >= 7 ? 'medium' : 'low'}`}>{calculateAverageScore()}</strong>/10</p>
      </div>

      <div className="form-group">
        <label htmlFor="observations">Observaciones</label>
        <textarea
          id="observations"
          name="observations"
          value={formData.observations}
          onChange={handleChange}
          placeholder="Agregar comentarios sobre el desempeño..."
          rows="4"
        />
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
          {evaluation ? 'Guardar Cambios' : 'Crear Evaluación'}
        </button>
      </div>
    </form>
  );
};

export default PerformanceForm;
