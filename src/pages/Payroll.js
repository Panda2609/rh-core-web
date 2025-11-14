import React, { useState } from 'react';
import { FaFileDownload, FaCalculator } from 'react-icons/fa';
import { payrollsData, liquidationData } from '../data/payroll';
import './Payroll.css';

const Payroll = () => {
  const [payrolls] = useState(payrollsData);
  const [liquidation] = useState(liquidationData);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Gestión de Remuneraciones</h1>
        <div className="header-actions">
          <button className="btn btn-primary">
            <FaCalculator /> Calcular Nómina
          </button>
          <button className="btn btn-secondary">
            <FaFileDownload /> Generar Liquidaciones
          </button>
        </div>
      </div>

      <div className="page-content">

        <div className="liquidation-section">
          <h2>Resumen de Liquidación General</h2>
          <div className="liquidation-grid">
            <div className="liquidation-card">
              <h3>Sueldo Base Total</h3>
              <p className="value">{formatCurrency(liquidation.totalPayroll)}</p>
            </div>
            <div className="liquidation-card">
              <h3>Horas Extra</h3>
              <p className="value">{formatCurrency(liquidation.totalOvertime)}</p>
            </div>
            <div className="liquidation-card">
              <h3>Bonos</h3>
              <p className="value positive">{formatCurrency(liquidation.totalBonuses)}</p>
            </div>
            <div className="liquidation-card">
              <h3>Descuentos</h3>
              <p className="value negative">{formatCurrency(liquidation.totalDiscounts)}</p>
            </div>
            <div className="liquidation-card">
              <h3>Retenciones Fiscales</h3>
              <p className="value negative">{formatCurrency(liquidation.totalTaxes)}</p>
            </div>
            <div className="liquidation-card highlight">
              <h3>Total a Pagar (Neto)</h3>
              <p className="value large">{formatCurrency(liquidation.netTotal)}</p>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h2>Cálculo de Sueldos - Noviembre 2025</h2>
          <div className="table-container">
            <table className="payroll-table">
              <thead>
                <tr>
                  <th>Empleado</th>
                  <th>Sueldo Base</th>
                  <th>Horas Extra</th>
                  <th>Bonos</th>
                  <th>Descuentos</th>
                  <th>Retención Fiscal</th>
                  <th>Sueldo Neto</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {payrolls.map((payroll) => (
                  <tr key={payroll.id}>
                    <td className="employee-name">{payroll.employee}</td>
                    <td>{formatCurrency(payroll.baseSalary)}</td>
                    <td>
                      <span className="overtime">
                        {payroll.overtimeHours}h
                        <br />
                        {formatCurrency(payroll.overtimeValue)}
                      </span>
                    </td>
                    <td className="bonus">{formatCurrency(payroll.bonuses)}</td>
                    <td className="discount">{formatCurrency(payroll.discounts)}</td>
                    <td className="tax">{formatCurrency(payroll.taxRetention)}</td>
                    <td className="net-salary">{formatCurrency(payroll.netSalary)}</td>
                    <td>
                      <button className="btn-icon btn-download">
                        <FaFileDownload />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="content-section">
          <h2>Reportes para Contabilidad</h2>
          <div className="reports-buttons">
            <button className="btn-report">
              <FaFileDownload /> Reporte Mensual Excel
            </button>
            <button className="btn-report">
              <FaFileDownload /> Reporte Anual
            </button>
            <button className="btn-report">
              <FaFileDownload /> Registro de Impuestos
            </button>
            <button className="btn-report">
              <FaFileDownload /> Resumen AFP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
