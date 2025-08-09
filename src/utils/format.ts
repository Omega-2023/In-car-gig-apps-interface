export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDistance = (miles: number): string => {
  if (miles < 0.1) {
    return '< 0.1 mi';
  }
  return `${miles.toFixed(1)} mi`;
};

export const formatTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
};

export const formatScore = (payout: number, distance: number): string => {
  const score = payout / distance;
  return `$${score.toFixed(2)}/mi`;
};

export const formatBattery = (percentage: number): string => {
  return `${percentage}%`;
};

export const formatTemperature = (celsius: number, unit: 'C' | 'F' = 'F'): string => {
  if (unit === 'F') {
    const fahrenheit = (celsius * 9/5) + 32;
    return `${Math.round(fahrenheit)}°F`;
  }
  return `${Math.round(celsius)}°C`;
};

export const formatSpeed = (kph: number, unit: 'mph' | 'kph' = 'mph'): string => {
  if (unit === 'mph') {
    const mph = kph * 0.621371;
    return `${Math.round(mph)} mph`;
  }
  return `${Math.round(kph)} kph`;
};

export const formatProviderName = (provider: string): string => {
  switch (provider.toLowerCase()) {
    case 'doordash':
      return 'DoorDash';
    case 'ubereats':
      return 'Uber Eats';
    case 'instacart':
      return 'Instacart';
    default:
      return provider;
  }
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength - 3) + '...';
};
