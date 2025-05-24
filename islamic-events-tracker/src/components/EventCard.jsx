import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

const EventCard = ({ event, calendarView }) => {
  const eventDate = dayjs(event.gregorianDate);
  const today = dayjs();
  const daysLeft = eventDate.diff(today, 'day');

  return (
    <div className="card">
      <h2>{event.name}</h2>
      <p>
        <strong>Date:</strong>{' '}
        {calendarView === 'gregorian' ? event.gregorianDate : event.hijriDate} ({calendarView})
      </p>
      <p className="days-left">{daysLeft} days left</p>
    </div>
  );
};

export default EventCard;
