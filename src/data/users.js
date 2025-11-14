export const usersData = [
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
];

export const rolesData = [
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
];
