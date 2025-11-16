import React, { useState, useEffect } from 'react';
import './EmployeeForm.css';

const EmployeeForm = ({ employee = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    email: '',
    phone: '',
    hireDate: '',
    status: 'Activo',
  });
  const [errors, setErrors] = useState({});

  // Si es edición, cargar datos del empleado
  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    if (!formData.position.trim()) {
      newErrors.position = 'El cargo es requerido';
    }
    if (!formData.department.trim()) {
      newErrors.department = 'El departamento es requerido';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    }
    if (!formData.hireDate) {
      newErrors.hireDate = 'La fecha de ingreso es requerida';
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
    // Limpiar error del campo cuando el usuario empieza a escribir
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
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <div className="form-group">
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'input-error' : ''}
          placeholder="Ej: Juan Pérez García"
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="position">Cargo</label>
        <input
          type="text"
          id="position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          className={errors.position ? 'input-error' : ''}
          placeholder="Ej: Desarrollador Senior"
        />
        {errors.position && <span className="error-message">{errors.position}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="department">Departamento</label>
        <select
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className={errors.department ? 'input-error' : ''}
        >
          <option value="">Seleccionar departamento</option>
          <option value="Tecnología">Tecnología</option>
          <option value="Recursos Humanos">Recursos Humanos</option>
          <option value="Finanzas">Finanzas</option>
          <option value="Marketing">Marketing</option>
          <option value="Ventas">Ventas</option>
          <option value="Operaciones">Operaciones</option>
        </select>
        {errors.department && <span className="error-message">{errors.department}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'input-error' : ''}
          placeholder="Ej: juan.perez@company.com"
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Teléfono</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? 'input-error' : ''}
          placeholder="Ej: +56912345678"
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="hireDate">Fecha de Ingreso</label>
        <input
          type="date"
          id="hireDate"
          name="hireDate"
          value={formData.hireDate}
          onChange={handleChange}
          className={errors.hireDate ? 'input-error' : ''}
        />
        {errors.hireDate && <span className="error-message">{errors.hireDate}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="status">Estado</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
          <option value="Licencia">Licencia</option>
        </select>
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
          {employee ? 'Guardar Cambios' : 'Crear Empleado'}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
