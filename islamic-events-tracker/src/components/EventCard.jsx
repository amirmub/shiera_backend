import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const EventCard = ({ event, calendarView }) => {
  const today = dayjs();
  let eventDate = dayjs(event.gregorianDate);

  // If the event date has passed this year, add 1 year
  if (eventDate.isBefore(today, 'day')) {
    eventDate = eventDate.add(1, 'year');
  }

  const daysLeft = eventDate.diff(today, 'day');

  return (
    <div className="card">
      <h2>{event.name}</h2>
      <p>
        <strong>Date:</strong>{' '}
        {calendarView === 'gregorian' ? eventDate.format('YYYY-MM-DD') : event.hijriDate} ({calendarView})
      </p>
      <p className="days-left">{daysLeft} day{daysLeft !== 1 ? 's' : ''} left</p>
    </div>
  );
};

export default EventCard;
