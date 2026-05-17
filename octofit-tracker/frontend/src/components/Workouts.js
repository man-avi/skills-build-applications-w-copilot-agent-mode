import React, { useEffect, useState } from 'react';

const API_HOST = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';
const endpoint = 'workouts';
const apiUrl = `${API_HOST}/api/${endpoint}/`;

function truncate(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

function getHeaders(items) {
  if (!items.length) return [];
  const first = items[0];
  const preferred = ['id', 'name', 'duration', 'type', 'difficulty', 'created_at'];
  const keys = [...new Set([
    ...preferred.filter((key) => key in first),
    ...Object.keys(first).filter((key) => typeof first[key] !== 'object').slice(0, 5),
  ])];
  return keys.length ? keys : Object.keys(first);
}

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterTerm, setFilterTerm] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  const loadData = () => {
    setLoading(true);
    setError(null);
    console.log('Workouts endpoint:', apiUrl);

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch ${apiUrl}: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Workouts fetched data:', data);
        const payload = data?.results ?? data;
        setWorkouts(Array.isArray(payload) ? payload : []);
      })
      .catch((fetchError) => {
        console.error('Workouts fetch error:', fetchError);
        setError(fetchError.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredWorkouts = workouts.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(filterTerm.toLowerCase())
  );

  const headers = getHeaders(filteredWorkouts.length ? filteredWorkouts : workouts);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
        <div>
          <h2 className="card-title mb-1">Workouts</h2>
          <p className="card-text text-muted mb-0">Workout plans loaded from the REST API.</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary" onClick={loadData} disabled={loading}>
            Refresh
          </button>
          <button className="btn btn-outline-secondary" onClick={() => setShowInfo(true)}>
            API Info
          </button>
        </div>
      </div>
      <div className="card-body">
        <form className="row g-3 mb-3" onSubmit={(e) => e.preventDefault()}>
          <div className="col-12 col-md-8">
            <label htmlFor="workoutFilter" className="form-label">
              Filter workouts
            </label>
            <input
              id="workoutFilter"
              type="search"
              className="form-control"
              placeholder="Search workouts..."
              value={filterTerm}
              onChange={(e) => setFilterTerm(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-4 d-flex align-items-end justify-content-md-end">
            <a href={apiUrl} target="_blank" rel="noreferrer" className="btn btn-link">
              Open API endpoint
            </a>
          </div>
        </form>

        {loading && <p>Loading workouts...</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-hover table-striped align-middle mb-0">
              <thead>
                <tr>
                  {headers.map((header) => (
                    <th key={header} scope="col">
                      {header.replace(/_/g, ' ').toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredWorkouts.length > 0 ? (
                  filteredWorkouts.map((workout, index) => (
                    <tr key={workout.id || index}>
                      {headers.map((header) => (
                        <td key={header}>{truncate(workout[header])}</td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={headers.length}>No workouts found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showInfo && (
        <>
          <div className="modal fade show" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Workouts API Info</h5>
                  <button type="button" className="btn-close" onClick={() => setShowInfo(false)} aria-label="Close" />
                </div>
                <div className="modal-body">
                  <p>
                    Endpoint: <code>{apiUrl}</code>
                  </p>
                  <pre className="bg-light p-3 rounded small">{JSON.stringify({ endpoint, apiUrl }, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowInfo(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </>
      )}
    </div>
  );
}

export default Workouts;
