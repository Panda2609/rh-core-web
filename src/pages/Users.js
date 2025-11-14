import React, { useState } from 'react';
import { FaUserShield, FaEdit, FaTrash, FaPlus, FaLock } from 'react-icons/fa';
import { usersData, rolesData } from '../data/users';
import Modal from '../components/Modal';
import DevelopmentNotice from '../components/DevelopmentNotice';
import './Users.css';

const Users = () => {
  const [users] = useState(usersData);
  const [roles] = useState(rolesData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const openModal = (title) => {
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const getRoleBadgeColor = (role) => {
    const roleData = roles.find(r => r.name === role);
    return roleData ? roleData.color : '#999';
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Usuarios y Roles</h1>
        <button className="btn btn-primary" onClick={() => openModal('Nuevo Usuario')}>
          <FaPlus /> Nuevo Usuario
        </button>
      </div>

      <div className="page-content">

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Usuarios Activos</h3>
            <p className="stat-value">{users.filter(u => u.status === 'Activo').length}</p>
          </div>
          <div className="stat-card">
            <h3>Usuarios Inactivos</h3>
            <p className="stat-value">{users.filter(u => u.status === 'Inactivo').length}</p>
          </div>
          <div className="stat-card">
            <h3>Roles Disponibles</h3>
            <p className="stat-value">{roles.length}</p>
          </div>
          <div className="stat-card">
            <h3>Total Usuarios</h3>
            <p className="stat-value">{users.length}</p>
          </div>
        </div>

        <div className="content-section">
          <h2>Gestión de Usuarios</h2>
          <div className="table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Último Acceso</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="user-name">
                      <FaUserShield style={{ marginRight: '8px', color: '#667eea' }} />
                      {user.name}
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span
                        className="role-badge"
                        style={{ backgroundColor: getRoleBadgeColor(user.role) + '20', color: getRoleBadgeColor(user.role) }}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={`status status-${user.status.toLowerCase()}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="last-login">{user.lastLogin}</td>
                    <td>
                      <button 
                        className="btn-icon btn-edit" 
                        title="Editar" 
                        style={{ marginRight: '8px' }}
                        onClick={() => openModal(`Editar Usuario: ${user.name}`)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="btn-icon btn-delete" 
                        title="Eliminar"
                        onClick={() => openModal(`Eliminar Usuario: ${user.name}`)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="content-section">
          <h2>Gestión de Roles y Permisos</h2>
          <div className="roles-grid">
            {roles.map((role) => (
              <div key={role.id} className="role-card" style={{ borderLeftColor: role.color }}>
                <div className="role-header">
                  <h3 style={{ color: role.color }}>{role.name}</h3>
                  <span className="users-count">{role.usersCount} usuario(s)</span>
                </div>

                <div className="permissions-list">
                  <h4>Permisos:</h4>
                  <ul>
                    {role.permissions.map((permission, index) => (
                      <li key={index}>
                        <FaLock className="permission-icon" />
                        {permission}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="role-actions">
                  <button 
                    className="btn-small"
                    onClick={() => openModal(`Editar Rol: ${role.name}`)}
                  >
                    Editar Rol
                  </button>
                  <button 
                    className="btn-small btn-danger"
                    onClick={() => openModal(`Eliminar Rol: ${role.name}`)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="security-section">
          <h2>Configuración de Seguridad</h2>
          <div className="security-options">
            <div className="security-item">
              <h4>Políticas de Contraseña</h4>
              <p>Configurar requisitos mínimos de seguridad</p>
              <button 
                className="btn-secondary"
                onClick={() => openModal('Políticas de Contraseña')}
              >
                Configurar
              </button>
            </div>
            <div className="security-item">
              <h4>Auditoría y Logs</h4>
              <p>Ver registro de accesos y cambios en el sistema</p>
              <button 
                className="btn-secondary"
                onClick={() => openModal('Auditoría y Logs')}
              >
                Ver Logs
              </button>
            </div>
            <div className="security-item">
              <h4>Permisos por Módulo</h4>
              <p>Asignar permisos granulares a cada módulo</p>
              <button 
                className="btn-secondary"
                onClick={() => openModal('Gestionar Permisos por Módulo')}
              >
                Gestionar Permisos
              </button>
            </div>
            <div className="security-item">
              <h4>Backup y Recuperación</h4>
              <p>Realizar copias de seguridad del sistema</p>
              <button 
                className="btn-secondary"
                onClick={() => openModal('Backup y Recuperación')}
              >
                Ejecutar Backup
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={modalTitle}
        size="medium"
      >
        <DevelopmentNotice feature={modalTitle} />
      </Modal>
    </div>
  );
};

export default Users;
