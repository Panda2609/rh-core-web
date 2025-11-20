import React, { useState } from 'react';
import './RoleForm.css';

const RoleForm = ({ role, onSubmit, onCancel, formType = 'edit' }) => {
  const [formData, setFormData] = useState({
    name: role?.name || '',
    color: role?.color || '#667eea',
    permissions: role?.permissions || [],
    usersCount: role?.usersCount || 0
  });

  const [newPermission, setNewPermission] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddPermission = () => {
    if (newPermission.trim() && !formData.permissions.includes(newPermission)) {
      setFormData(prev => ({
        ...prev,
        permissions: [...prev.permissions, newPermission]
      }));
      setNewPermission('');
    }
  };

  const handleRemovePermission = (permissionToRemove) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.filter(p => p !== permissionToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('El nombre del rol es requerido');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="role-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre del Rol *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Ej: Administrador, Gerente, Empleado"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="color">Color del Rol</label>
          <div className="color-picker-wrapper">
            <input
              type="color"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
            />
            <span className="color-value">{formData.color}</span>
          </div>
        </div>

        <div className="form-group">
          <label>Permisos</label>
          <div className="permissions-input">
            <input
              type="text"
              value={newPermission}
              onChange={(e) => setNewPermission(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddPermission();
                }
              }}
              placeholder="Escribe un permiso y presiona Enter"
            />
            <button 
              type="button"
              className="btn-add-permission"
              onClick={handleAddPermission}
            >
              Agregar
            </button>
          </div>

          {formData.permissions.length > 0 && (
            <div className="permissions-list">
              {formData.permissions.map((permission, index) => (
                <div key={index} className="permission-item">
                  <span>{permission}</span>
                  <button
                    type="button"
                    className="btn-remove-permission"
                    onClick={() => handleRemovePermission(permission)}
                    title="Eliminar permiso"
                  >
                    ✕
                  </button>
                </div>
              ))}
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
            {formType === 'edit' ? 'Guardar Cambios' : 'Crear Rol'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoleForm;
