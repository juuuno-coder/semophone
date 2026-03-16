import { HistoryEvent } from '@/types/content';

interface TimelineItemProps {
  event: HistoryEvent;
  isLast?: boolean;
}

export default function TimelineItem({ event, isLast }: TimelineItemProps) {
  return (
    <div className="relative flex gap-6 pb-12">
      {/* 세로 라인 */}
      {!isLast && (
        <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-brand/30" />
      )}

      {/* 아이콘 */}
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand flex items-center justify-center text-2xl z-10">
        {event.icon}
      </div>

      {/* 콘텐츠 */}
      <div className="flex-1 pt-1">
        <div className="flex items-baseline gap-3 mb-2">
          <h3 className="text-2xl font-bold text-gray-900">{event.year}</h3>
          {event.quarter && (
            <span className="text-sm font-medium text-gray-500">{event.quarter}</span>
          )}
        </div>
        <h4 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h4>
        <p className="text-gray-600 mb-4">{event.description}</p>

        {/* 통계 */}
        {event.stats && (
          <div className="flex flex-wrap gap-4">
            {event.stats.map((stat, i) => (
              <div key={i} className="bg-brand/10 px-4 py-2 rounded-lg">
                <div className="text-sm text-gray-600">{stat.label}</div>
                <div className="text-lg font-bold text-gray-900">{stat.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
