import React from 'react';
import './App.css';
import { Calendar, Appointments } from './components'
function App() {
  return (
    <div className="App">
      <Calendar />
      <Appointments />
    </div>
  );
}

export default App;
