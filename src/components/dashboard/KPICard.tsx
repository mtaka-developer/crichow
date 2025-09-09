interface KPICardProps {
  title: string;
  value: number | string;
  unit?: string;
  icon?: React.ReactNode;
  colorClass?: string;
}

export default function KPICard({ title, value, unit, icon, colorClass = "text-black" }: KPICardProps) {
  const formatValue = (val: number | string): string => {
    if (typeof val === 'string') return val;
    
    // Check if it's a whole number (no decimal part)
    const isWholeNumber = Number.isInteger(val);
    
    // Format large numbers with commas, no decimal places for thousands+
    if (val >= 1000) {
      return val.toLocaleString('en-US', { maximumFractionDigits: 0 });
    }
    
    // For smaller numbers, show no decimals if it's a whole number, otherwise 2 decimals
    if (isWholeNumber) {
      return val.toLocaleString('en-US', { maximumFractionDigits: 0 });
    } else {
      return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
  };

  const getIconColorClass = () => {
    // Map number colors to icon colors (mtaka green, practical orange, gray, teal)
    if (colorClass.includes('mtaka-green')) return 'text-mtaka-green';
    if (colorClass.includes('practical-orange')) return 'text-practical-orange';
    if (colorClass.includes('teal')) return 'text-teal-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 font-poppins mb-1">
            {title}
          </p>
          <div className="flex items-baseline">
            <p className={`text-3xl font-bold ${colorClass}`}>
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
          <div className={`flex-shrink-0 ${getIconColorClass()} opacity-80`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}