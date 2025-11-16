import React, { useState } from 'react';
import { FaEdit, FaTrash, FaPlus, FaDownload } from 'react-icons/fa';
import { employeesData } from '../data/employees';
import Modal from '../components/Modal';
import EmployeeForm from '../components/EmployeeForm';
import DevelopmentNotice from '../components/DevelopmentNotice';
import './Employees.css';

const Employees = () => {
  const [employees, setEmployees] = useState(employeesData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'create', 'edit', 'delete', 'export'
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const openModal = (type = '', employee = null) => {
    setModalType(type);
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleAddEmployee = (newEmployeeData) => {
    const newEmployee = {
      ...newEmployeeData,
      id: Math.max(...employees.map(e => e.id), 0) + 1
    };
    setEmployees(prev => [...prev, newEmployee]);
    setIsModalOpen(false);
  };

  const handleEditEmployee = (updatedEmployeeData) => {
    setEmployees(prev => 
      prev.map(emp => emp.id === updatedEmployeeData.id ? updatedEmployeeData : emp)
    );
    setIsModalOpen(false);
  };

  const handleDeleteEmployee = () => {
    if (selectedEmployee) {
      setEmployees(prev => prev.filter(emp => emp.id !== selectedEmployee.id));
      setIsModalOpen(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Gestión de Empleados</h1>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={() => openModal('create')}
          >
            <FaPlus /> Nuevo Empleado
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => openModal('export')}
          >
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
                  <td>
                    <button 
                      className="btn-icon btn-edit" 
                      title="Editar" 
                      style={{ marginRight: '8px' }}
                      onClick={() => openModal('edit', employee)}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="btn-icon btn-delete" 
                      title="Eliminar"
                      onClick={() => openModal('delete', employee)}
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

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={modalType === 'create' ? 'Nuevo Empleado' : modalType === 'edit' ? `Editar Empleado: ${selectedEmployee?.name}` : modalType === 'delete' ? `Eliminar Empleado` : 'Exportar Empleados'}
        size="medium"
      >
        {(modalType === 'create' || modalType === 'edit') && (
          <EmployeeForm 
            employee={modalType === 'edit' ? selectedEmployee : null}
            onSubmit={modalType === 'create' ? handleAddEmployee : handleEditEmployee}
            onCancel={() => setIsModalOpen(false)}
          />
        )}

        {modalType === 'delete' && selectedEmployee && (
          <div className="delete-confirmation">
            <p>¿Estás seguro de que deseas eliminar al empleado <strong>{selectedEmployee.name}</strong>?</p>
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
                onClick={handleDeleteEmployee}
              >
                Eliminar
              </button>
            </div>
          </div>
        )}

        {modalType === 'export' && (
          <DevelopmentNotice feature="Exportar Empleados" />
        )}
      </Modal>
    </div>
  );
};

export default Employees;
