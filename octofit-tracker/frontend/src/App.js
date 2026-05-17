import './App.css';
import { Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import logo from './octofitapp-small.svg';

function App() {
  const navItems = [
    { path: '/', label: 'Activities', end: true },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/teams', label: 'Teams' },
    { path: '/users', label: 'Users' },
    { path: '/workouts', label: 'Workouts' },
  ];

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container">
          <NavLink to="/" className="navbar-brand d-flex align-items-center gap-2">
            <img src={logo} alt="OctoFit Logo" className="brand-logo" />
            <span>OctoFit Tracker</span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {navItems.map((item) => (
                <li key={item.path} className="nav-item">
                  <NavLink
                    to={item.path}
                    end={item.end}
                    className={({ isActive }) =>
                      `nav-link${isActive ? ' active' : ''}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h1 className="card-title">OctoFit Tracker Dashboard</h1>
            <p className="card-text text-muted">
              Browse activities, leaderboard standings, teams, users, and workouts pulled from the Django REST API.
            </p>
            <p className="mb-0">
              Use the navigation menu to switch between endpoints and inspect API-driven data.
            </p>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Activities />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
