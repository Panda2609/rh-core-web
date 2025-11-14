import React, { useState } from 'react';
import { FaUserShield, FaEdit, FaTrash, FaPlus, FaLock } from 'react-icons/fa';
import './Users.css';

const Users = () => {
  const [users] = useState([
    {
      id: 1,
      name: 'Admin Master',
      email: 'admin@company.com',
      role: 'Administrador',
      status: 'Activo',
      lastLogin: '2025-11-13 09:30',
    },
    {
      id: 2,
      name: 'María López',
      email: 'maria.lopez@company.com',
      role: 'RRHH',
      status: 'Activo',
      lastLogin: '2025-11-13 08:45',
    },
    {
      id: 3,
      name: 'Juan Pérez',
      email: 'juan.perez@company.com',
      role: 'Jefatura',
      status: 'Activo',
      lastLogin: '2025-11-12 17:20',
    },
    {
      id: 4,
      name: 'Carlos Martínez',
      email: 'carlos.martinez@company.com',
      role: 'Funcionario',
      status: 'Activo',
      lastLogin: '2025-11-13 10:15',
    },
    {
      id: 5,
      name: 'Ana González',
      email: 'ana.gonzalez@company.com',
      role: 'Funcionario',
      status: 'Inactivo',
      lastLogin: '2025-10-20 14:30',
    },
  ]);

  const [roles] = useState([
    {
      id: 1,
      name: 'Administrador',
      permissions: [
        'Ver todos los módulos',
        'Crear usuarios',
        'Editar configuración',
        'Acceso a reportes',
        'Gestionar roles',
      ],
      usersCount: 1,
      color: '#f44336',
    },
    {
      id: 2,
      name: 'RRHH',
      permissions: [
        'Gestionar empleados',
        'Asistencia',
        'Remuneraciones',
        'Evaluaciones',
        'Capacitación',
      ],
      usersCount: 1,
      color: '#667eea',
    },
    {
      id: 3,
      name: 'Jefatura',
      permissions: [
        'Ver empleados del área',
        'Registrar asistencia',
        'Evaluaciones del área',
        'Reportes del área',
      ],
      usersCount: 1,
      color: '#ff9800',
    },
    {
      id: 4,
      name: 'Funcionario',
      permissions: [
        'Ver datos personales',
        'Solicitar permisos',
        'Ver constancias',
      ],
      usersCount: 2,
      color: '#4caf50',
    },
  ]);

  const getRoleBadgeColor = (role) => {
    const roleData = roles.find(r => r.name === role);
    return roleData ? roleData.color : '#999';
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Usuarios y Roles</h1>
        <button className="btn btn-primary">
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
                    <td className="actions">
                      <button className="btn-icon btn-edit" title="Editar">
                        <FaEdit />
                      </button>
                      <button className="btn-icon btn-delete" title="Eliminar">
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
                  <button className="btn-small">Editar Rol</button>
                  <button className="btn-small btn-danger">Eliminar</button>
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
              <button className="btn-secondary">Configurar</button>
            </div>
            <div className="security-item">
              <h4>Auditoría y Logs</h4>
              <p>Ver registro de accesos y cambios en el sistema</p>
              <button className="btn-secondary">Ver Logs</button>
            </div>
            <div className="security-item">
              <h4>Permisos por Módulo</h4>
              <p>Asignar permisos granulares a cada módulo</p>
              <button className="btn-secondary">Gestionar Permisos</button>
            </div>
            <div className="security-item">
              <h4>Backup y Recuperación</h4>
              <p>Realizar copias de seguridad del sistema</p>
              <button className="btn-secondary">Ejecutar Backup</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Users;
