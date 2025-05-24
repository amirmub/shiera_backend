import React from 'react';

const ToggleCalendar = ({ view, setView }) => {
  return (
    <div className="toggle-wrapper">
      <button
        onClick={() => setView('gregorian')}
        className={`toggle-btn ${view === 'gregorian' ? 'active' : ''}`}
      >
        Gregorian
      </button>
      <button
        onClick={() => setView('hijri')}
        className={`toggle-btn ${view === 'hijri' ? 'active' : ''}`}
      >
        Hijri
      </button>
    </div>
  );
};

export default ToggleCalendar;
