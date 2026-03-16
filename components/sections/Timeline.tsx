import { HistoryEvent } from '@/types/content';
import TimelineItem from '@/components/ui/TimelineItem';

interface TimelineProps {
  events: HistoryEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  return (
    <div className="max-w-3xl mx-auto">
      {events.map((event, i) => (
        <TimelineItem
          key={i}
          event={event}
          isLast={i === events.length - 1}
        />
      ))}
    </div>
  );
}
