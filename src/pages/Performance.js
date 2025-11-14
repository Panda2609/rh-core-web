import React, { useState } from 'react';
import { FaStar, FaPlusCircle } from 'react-icons/fa';
import { evaluationsData, performanceByArea } from '../data/performance';
import './Performance.css';

const Performance = () => {
  const [evaluations] = useState(evaluationsData);
  const [performanceAreaData] = useState(performanceByArea);

  const getScoreColor = (score) => {
    if (score >= 9) return '#4caf50';
    if (score >= 8) return '#667eea';
    if (score >= 7) return '#ff9800';
    return '#f44336';
  };

  const renderStars = (score) => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={i < Math.floor(score / 2) ? 'star-filled' : 'star-empty'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Evaluaciones de Desempeño</h1>
        <button className="btn btn-primary">
          <FaPlusCircle /> Nueva Evaluación
        </button>
      </div>

      <div className="page-content">

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Evaluaciones</h3>
            <p className="stat-value">{evaluations.length}</p>
          </div>
          <div className="stat-card">
            <h3>Promedio General</h3>
            <p className="stat-value">
              {(
                evaluations.reduce((sum, e) => sum + e.score, 0) /
                evaluations.length
              ).toFixed(1)}
            </p>
          </div>
          <div className="stat-card">
            <h3>Desempeño Máximo</h3>
            <p className="stat-value">
              {Math.max(...evaluations.map((e) => e.score)).toFixed(1)}
            </p>
          </div>
          <div className="stat-card">
            <h3>Desempeño Mínimo</h3>
            <p className="stat-value">
              {Math.min(...evaluations.map((e) => e.score)).toFixed(1)}
            </p>
          </div>
        </div>

        <div className="content-section">
          <h2>Evaluaciones Semestrales</h2>
          <div className="evaluations-grid">
            {evaluations.map((evaluation) => (
              <div key={evaluation.id} className="evaluation-card">
                <div className="eval-header">
                  <h3>{evaluation.employee}</h3>
                  <div
                    className="score-badge"
                    style={{ backgroundColor: getScoreColor(evaluation.score) }}
                  >
                    {evaluation.score.toFixed(1)}
                  </div>
                </div>
                <p className="department">{evaluation.department}</p>
                <p className="period">{evaluation.period}</p>

                <div className="stars-section">
                  {renderStars(evaluation.score)}
                </div>

                <div className="competencies">
                  <h4>Competencias</h4>
                  <div className="competency-grid">
                    <div className="competency">
                      <label>Técnica</label>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${(evaluation.competencies.technical / 10) * 100}%`,
                          }}
                        />
                      </div>
                      <span>{evaluation.competencies.technical}</span>
                    </div>
                    <div className="competency">
                      <label>Comunicación</label>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${(evaluation.competencies.communication / 10) * 100}%`,
                          }}
                        />
                      </div>
                      <span>{evaluation.competencies.communication}</span>
                    </div>
                    <div className="competency">
                      <label>Liderazgo</label>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${(evaluation.competencies.leadership / 10) * 100}%`,
                          }}
                        />
                      </div>
                      <span>{evaluation.competencies.leadership}</span>
                    </div>
                    <div className="competency">
                      <label>Trabajo en Equipo</label>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${(evaluation.competencies.teamwork / 10) * 100}%`,
                          }}
                        />
                      </div>
                      <span>{evaluation.competencies.teamwork}</span>
                    </div>
                  </div>
                </div>

                <div className="observations">
                  <h4>Observaciones</h4>
                  <p>{evaluation.observations}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="content-section">
          <h2>Promedio de Desempeño por Área</h2>
          <div className="performance-chart">
            {performanceAreaData.map((item, index) => (
              <div key={index} className="chart-item">
                <div className="chart-label">
                  <span>{item.area}</span>
                  <span className="chart-value">{item.average.toFixed(1)}</span>
                </div>
                <div className="chart-bar-container">
                  <div
                    className="chart-bar"
                    style={{
                      width: `${(item.average / 10) * 100}%`,
                      backgroundColor: getScoreColor(item.average * 2),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Performance;
