import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export default function EventsCalendar({ events }: { events: { title: string; start: Date; end: Date }[] }) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-glass animate-fade">
      <h3 className="text-lg font-semibold mb-4">Calendrier des événements</h3>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 400 }}
        popup
      />
    </div>
  );
}