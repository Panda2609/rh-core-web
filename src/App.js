import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';
import Payroll from './pages/Payroll';
import Performance from './pages/Performance';
import Training from './pages/Training';
import Users from './pages/Users';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Employees />} />
          <Route path="/rh-core-web" element={<Employees />} />
          <Route path="/rh-core-web/employees" element={<Employees />} />
          <Route path="/rh-core-web/attendance" element={<Attendance />} />
          <Route path="/rh-core-web/payroll" element={<Payroll />} />
          <Route path="/rh-core-web/performance" element={<Performance />} />
          <Route path="/rh-core-web/training" element={<Training />} />
          <Route path="/rh-core-web/users" element={<Users />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
