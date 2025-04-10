import { Property } from '../types';

interface Stats {
  averagePrice: number;
  pricePerSqft: number;
  averageSqft: number;
  bedroomDistribution: { [key: string]: number };
  priceRangeDistribution: { [key: string]: number };
}

export const calculateStats = (properties: Property[]): Stats => {
  if (properties.length === 0) {
    return {
      averagePrice: 0,
      pricePerSqft: 0,
      averageSqft: 0,
      bedroomDistribution: {},
      priceRangeDistribution: {},
    };
  }

  const totalPrice = properties.reduce((sum, prop) => sum + prop.price, 0);
  const totalSqft = properties.reduce((sum, prop) => sum + prop.sqft, 0);

  // Calculate bedroom distribution
  const bedroomDistribution = properties.reduce((dist, prop) => {
    const beds = prop.bedrooms.toString();
    dist[beds] = (dist[beds] || 0) + 1;
    return dist;
  }, {} as { [key: string]: number });

  // Calculate price range distribution
  const priceRanges = {
    '< $200k': 0,
    '$200k - $400k': 0,
    '$400k - $600k': 0,
    '$600k - $800k': 0,
    '$800k - $1M': 0,
    '> $1M': 0,
  };

  properties.forEach((prop) => {
    if (prop.price < 200000) priceRanges['< $200k']++;
    else if (prop.price < 400000) priceRanges['$200k - $400k']++;
    else if (prop.price < 600000) priceRanges['$400k - $600k']++;
    else if (prop.price < 800000) priceRanges['$600k - $800k']++;
    else if (prop.price < 1000000) priceRanges['$800k - $1M']++;
    else priceRanges['> $1M']++;
  });

  return {
    averagePrice: totalPrice / properties.length,
    pricePerSqft: totalPrice / totalSqft,
    averageSqft: totalSqft / properties.length,
    bedroomDistribution,
    priceRangeDistribution: priceRanges,
  };
};