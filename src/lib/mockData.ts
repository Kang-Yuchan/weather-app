import { LocationResponse } from '@/types/weather';

export const mockSearchLocationData: LocationResponse[] = [
  {
    id: 3125553,
    name: 'Tokyo',
    region: 'Tokyo',
    country: 'Japan',
    lat: 35.69,
    lon: 139.69,
    url: 'tokyo-tokyo-japan',
  },
  {
    id: 317748,
    name: 'Toronto',
    region: 'Ontario',
    country: 'Canada',
    lat: 43.67,
    lon: -79.42,
    url: 'toronto-ontario-canada',
  },
  {
    id: 2206621,
    name: 'Tolyatti',
    region: 'Samara',
    country: 'Russia',
    lat: 53.52,
    lon: 49.41,
    url: 'tolyatti-samara-russia',
  },
  {
    id: 2314683,
    name: 'Touba',
    region: 'Diourbel',
    country: 'Senegal',
    lat: 15.86,
    lon: -16.39,
    url: 'touba-diourbel-senegal',
  },
  {
    id: 3200683,
    name: 'Toluca',
    region: 'México',
    country: 'Mexico',
    lat: 19.29,
    lon: -99.65,
    url: 'toluca-mxico-mexico',
  },
];

export const mockSuggestions = ['Tokyo', 'Toronto', 'Tolyatti', 'Touba', 'Toluca'];
