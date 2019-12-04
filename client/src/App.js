import React from 'react';
import './App.css';
import WorkerDropdown from './workerDropdown'
import ShiftCalendar from './shiftCalendar'

function App() {
  return (
    <div className="App">
            <WorkerDropdown />
            <ShiftCalendar />
    </div>
  );
}

export default App;
