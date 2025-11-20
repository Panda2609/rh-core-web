import React, { useState } from 'react';
import { FaUserShield, FaEdit, FaTrash, FaPlus, FaLock } from 'react-icons/fa';
import { usersData, rolesData } from '../data/users';
import Modal from '../components/Modal';
import UserForm from '../components/UserForm';
import RoleForm from '../components/RoleForm';
import DevelopmentNotice from '../components/DevelopmentNotice';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState(usersData);
  const [roles, setRoles] = useState(rolesData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'create', 'edit', 'delete', 'edit-role', 'delete-role', 'development'
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [developmentFeature, setDevelopmentFeature] = useState('');

  const openModal = (type = 'create', user = null) => {
    setModalType(type);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleAddUser = (newUserData) => {
    const newUser = {
      ...newUserData,
      id: Math.max(...users.map(u => u.id), 0) + 1
    };
    setUsers(prev => [...prev, newUser]);
    setIsModalOpen(false);
  };

  const handleEditUser = (updatedUserData) => {
    setUsers(prev =>
      prev.map(user => user.id === updatedUserData.id ? updatedUserData : user)
    );
    setIsModalOpen(false);
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers(prev => prev.filter(user => user.id !== selectedUser.id));
      setIsModalOpen(false);
    }
  };

  const handleEditRole = (updatedRoleData) => {
    setRoles(prev =>
      prev.map(role => role.id === selectedRole.id ? { ...selectedRole, ...updatedRoleData } : role)
    );
    setIsModalOpen(false);
  };

  const handleDeleteRole = () => {
    if (selectedRole) {
      setRoles(prev => prev.filter(role => role.id !== selectedRole.id));
      setIsModalOpen(false);
    }
  };

  const getRoleBadgeColor = (role) => {
    const roleData = roles.find(r => r.name === role);
    return roleData ? roleData.color : '#999';
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Usuarios y Roles</h1>
        <button className="btn btn-primary" onClick={() => openModal('create')}>
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
                        onClick={() => openModal('edit', user)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="btn-icon btn-delete" 
                        title="Eliminar"
                        onClick={() => openModal('delete', user)}
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
                    onClick={() => {
                      setModalType('edit-role');
                      setSelectedRole(role);
                      setIsModalOpen(true);
                    }}
                  >
                    Editar Rol
                  </button>
                  <button 
                    className="btn-small btn-danger"
                    onClick={() => {
                      setModalType('delete-role');
                      setSelectedRole(role);
                      setIsModalOpen(true);
                    }}
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
                onClick={() => {
                  setModalType('development');
                  setDevelopmentFeature('Políticas de Contraseña');
                  setIsModalOpen(true);
                }}
              >
                Configurar
              </button>
            </div>
            <div className="security-item">
              <h4>Auditoría y Logs</h4>
              <p>Ver registro de accesos y cambios en el sistema</p>
              <button 
                className="btn-secondary"
                onClick={() => {
                  setModalType('development');
                  setDevelopmentFeature('Auditoría y Logs');
                  setIsModalOpen(true);
                }}
              >
                Ver Logs
              </button>
            </div>
            <div className="security-item">
              <h4>Permisos por Módulo</h4>
              <p>Asignar permisos granulares a cada módulo</p>
              <button 
                className="btn-secondary"
                onClick={() => {
                  setModalType('development');
                  setDevelopmentFeature('Permisos por Módulo');
                  setIsModalOpen(true);
                }}
              >
                Gestionar Permisos
              </button>
            </div>
            <div className="security-item">
              <h4>Backup y Recuperación</h4>
              <p>Realizar copias de seguridad del sistema</p>
              <button 
                className="btn-secondary"
                onClick={() => {
                  setModalType('development');
                  setDevelopmentFeature('Backup y Recuperación');
                  setIsModalOpen(true);
                }}
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
        title={
          modalType === 'create' ? 'Nuevo Usuario' : 
          modalType === 'edit' ? `Editar Usuario: ${selectedUser?.name}` : 
          modalType === 'delete' ? `Eliminar Usuario` :
          modalType === 'edit-role' ? `Editar Rol: ${selectedRole?.name}` :
          modalType === 'delete-role' ? `Eliminar Rol` :
          'Funcionalidad en Desarrollo'
        }
        size="medium"
      >
        {(modalType === 'create' || modalType === 'edit') && (
          <UserForm 
            user={modalType === 'edit' ? selectedUser : null}
            roles={roles}
            onSubmit={modalType === 'create' ? handleAddUser : handleEditUser}
            onCancel={() => setIsModalOpen(false)}
          />
        )}

        {modalType === 'delete' && selectedUser && (
          <div className="delete-confirmation">
            <p>¿Estás seguro de que deseas eliminar al usuario <strong>{selectedUser.name}</strong>?</p>
            <p className="warning-text">Esta acción no se puede deshacer.</p>
            <div className="form-actions">
              <button 
                className="btn btn-secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
              <button 
                className="btn btn-danger"
                onClick={handleDeleteUser}
              >
                Eliminar
              </button>
            </div>
          </div>
        )}

        {modalType === 'edit-role' && selectedRole && (
          <RoleForm 
            role={selectedRole}
            onSubmit={handleEditRole}
            onCancel={() => setIsModalOpen(false)}
            formType="edit"
          />
        )}

        {modalType === 'delete-role' && selectedRole && (
          <div className="delete-confirmation">
            <p>¿Estás seguro de que deseas eliminar el rol <strong>{selectedRole.name}</strong>?</p>
            <p className="warning-text">Esta acción no se puede deshacer.</p>
            <div className="form-actions">
              <button 
                className="btn btn-secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
              <button 
                className="btn btn-danger"
                onClick={handleDeleteRole}
              >
                Eliminar
              </button>
            </div>
          </div>
        )}

        {modalType === 'development' && (
          <DevelopmentNotice 
            feature={developmentFeature}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
};

export default Users;
