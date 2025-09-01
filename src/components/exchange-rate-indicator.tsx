import { useExchangeRate } from '@/hooks/use-exchange-rate';

interface ExchangeRateIndicatorProps {
  className?: string;
  showDetails?: boolean;
}

export function ExchangeRateIndicator({ 
  className = "", 
  showDetails = false 
}: ExchangeRateIndicatorProps) {
  const { rate, isLoading, lastUpdated } = useExchangeRate();

  if (isLoading) {
    return (
      <div className={`text-xs text-gray-500 ${className}`}>
        <span className="animate-pulse">💱 Cargando tipo de cambio...</span>
      </div>
    );
  }

  if (!rate) {
    return (
      <div className={`text-xs text-gray-500 ${className}`}>
        <span>💱 Tipo de cambio no disponible</span>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'N/A';
    }
  };

  return (
    <div className={`text-xs text-gray-500 ${className}`}>
      <span className="inline-flex items-center gap-1">
        💱 1 USD = ${rate.toLocaleString('es-AR')} ARS
        {showDetails && lastUpdated && (
          <span className="opacity-70">
            ({formatDate(lastUpdated)})
          </span>
        )}
      </span>
    </div>
  );
}
