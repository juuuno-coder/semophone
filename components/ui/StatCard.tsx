interface StatCardProps {
  value: string | number;
  unit?: string;
  label: string;
  highlight?: boolean;
  className?: string;
}

export default function StatCard({ value, unit, label, highlight = false, className = '' }: StatCardProps) {
  return (
    <div className={`p-5 bg-white rounded-2xl text-center hover:shadow-lg transition-shadow ${className}`}>
      <div className="text-[28px] font-black">
        <span className={highlight ? 'text-brand' : ''}>{value}</span>
        {unit}
      </div>
      <div className="text-[13px] text-gray-500 font-medium">{label}</div>
    </div>
  );
}
