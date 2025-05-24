import React, { useEffect, useState } from 'react';
import eventsData from '../data/events.json';
import EventCard from '../components/EventCard';
import ToggleCalendar from '../components/ToggleCalendar';

const HomePage = () => {
  const [calendarView, setCalendarView] = useState('gregorian');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(eventsData);
  }, []);

  return (
    <div className="container">
      <h1>Islamic Events Tracker</h1>
      <ToggleCalendar view={calendarView} setView={setCalendarView} />
      <div className="grid">
        {events.map((event) => (
          <EventCard key={event.id} event={event} calendarView={calendarView} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
