import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaDownload } from 'react-icons/fa';
import { employeesData } from '../data/employees';
import './Employees.css';

const Employees = () => {
  const [employees] = useState(employeesData);

  return (
    <div className="page-container">

      <div className="page-header">
        <h1>Gestión de Empleados</h1>
        <div className="header-actions">
          <button className="btn btn-primary">
            <FaPlus /> Nuevo Empleado
          </button>
          <button className="btn btn-secondary">
            <FaDownload /> Exportar
          </button>
        </div>
      </div>

      <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Empleados</h3>
            <p className="stat-value">{employees.length}</p>
          </div>
          <div className="stat-card">
            <h3>Activos</h3>
            <p className="stat-value">{employees.filter(e => e.status === 'Activo').length}</p>
          </div>
          <div className="stat-card">
            <h3>Departamentos</h3>
            <p className="stat-value">{new Set(employees.map(e => e.department)).size}</p>
          </div>
        </div>

      <div className="page-content">
        <div className="table-container">
          <table className="employees-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cargo</th>
                <th>Departamento</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Fecha Ingreso</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="employee-name">{employee.name}</td>
                  <td>{employee.position}</td>
                  <td>{employee.department}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>{new Date(employee.hireDate).toLocaleDateString('es-ES')}</td>
                  <td>
                    <span className={`status status-${employee.status.toLowerCase()}`}>
                      {employee.status}
                    </span>
                  </td>
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
    </div>
  );
};

export default Employees;
