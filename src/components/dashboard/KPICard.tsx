interface KPICardProps {
  title: string;
  value: number | string;
  unit?: string;
  icon?: React.ReactNode;
  colorClass?: string;
}

export default function KPICard({ title, value, unit, icon, colorClass = "text-mtaka-green" }: KPICardProps) {
  const formatValue = (val: number | string): string => {
    if (typeof val === 'string') return val;
    
    // Format large numbers with commas
    if (val >= 1000) {
      return val.toLocaleString('en-US', { maximumFractionDigits: 1 });
    }
    
    // Show up to 1 decimal place for smaller numbers
    return val.toLocaleString('en-US', { maximumFractionDigits: 1 });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 font-poppins mb-1">
            {title}
          </p>
          <div className="flex items-baseline">
            <p className={`text-3xl font-bold ${colorClass} font-anton`}>
              {formatValue(value)}
            </p>
            {unit && (
              <span className="ml-2 text-sm font-medium text-gray-500 font-poppins">
                {unit}
              </span>
            )}
          </div>
        </div>
        {icon && (
          <div className={`flex-shrink-0 ${colorClass} opacity-80`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}