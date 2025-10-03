import { ExoplanetData } from '@/types/exoplanet';

export const mockExoplanets: ExoplanetData[] = [
  {
    id: "kepler-452b",
    name: "Kepler-452b",
    discovery_method: "Transit",
    discovery_year: 2015,
    // AI-detected fields with confidence scores
    radius: 1.63,
    radius_confidence: 0.92,
    mass: 5.0,
    mass_confidence: 0.88,
    distance: 1400,
    distance_confidence: 0.95,
    orbital_period: 384.8,
    temperature: 265,
    host_star: "Kepler-452",
    description: "Earth's older, bigger cousin in the habitable zone of a Sun-like star.",
    graph_data: [
      { time: 0, brightness: 1.000 },
      { time: 0.5, brightness: 0.999 },
      { time: 1.0, brightness: 0.998 },
      { time: 1.5, brightness: 0.996 },
      { time: 2.0, brightness: 0.994 },
      { time: 2.5, brightness: 0.992 },
      { time: 3.0, brightness: 0.994 },
      { time: 3.5, brightness: 0.996 },
      { time: 4.0, brightness: 0.998 },
      { time: 4.5, brightness: 0.999 },
      { time: 5.0, brightness: 1.000 }
    ],
    // AI model metadata
    ai_model_version: "1.0.0",
    detection_confidence: 0.90,
    last_updated: "2024-01-15T10:30:00Z"
  },
  {
    id: "proxima-centauri-b",
    name: "Proxima Centauri b",
    discovery_method: "Radial Velocity",
    discovery_year: 2016,
    // Example of partial AI detection - some fields missing
    radius: 1.17,
    radius_confidence: 0.85,
    // mass: undefined, // AI couldn't detect mass
    distance: 4.24,
    distance_confidence: 0.98,
    orbital_period: 11.2,
    temperature: 234,
    host_star: "Proxima Centauri",
    description: "The closest known exoplanet to Earth, potentially habitable.",
    graph_data: [
      { time: 0, velocity: 5.2 },
      { time: 1, velocity: 3.1 },
      { time: 2, velocity: -2.4 },
      { time: 3, velocity: -5.8 },
      { time: 4, velocity: -3.2 },
      { time: 5, velocity: 1.9 },
      { time: 6, velocity: 5.2 }
    ],
    // AI model metadata
    ai_model_version: "1.0.0",
    detection_confidence: 0.75,
    last_updated: "2024-01-15T10:30:00Z"
  },
  {
    id: "trappist-1e",
    name: "TRAPPIST-1e",
    radius: 0.92,
    mass: 0.69,
    discovery_method: "Transit",
    discovery_year: 2017,
    distance: 39.5,
    orbital_period: 6.1,
    temperature: 251,
    host_star: "TRAPPIST-1",
    description: "One of seven Earth-sized planets in the TRAPPIST-1 system.",
    graph_data: [
      { time: 0, brightness: 1.000 },
      { time: 1, brightness: 0.999 },
      { time: 2, brightness: 0.997 },
      { time: 3, brightness: 0.995 },
      { time: 4, brightness: 0.997 },
      { time: 5, brightness: 0.999 },
      { time: 6, brightness: 1.000 }
    ]
  },
  {
    id: "k2-18b",
    name: "K2-18b",
    radius: 2.23,
    mass: 8.63,
    discovery_method: "Transit",
    discovery_year: 2015,
    distance: 124,
    orbital_period: 33.0,
    temperature: 265,
    host_star: "K2-18",
    description: "A sub-Neptune with water vapor detected in its atmosphere.",
    graph_data: [
      { time: 0, brightness: 1.000 },
      { time: 2, brightness: 0.999 },
      { time: 4, brightness: 0.997 },
      { time: 6, brightness: 0.994 },
      { time: 8, brightness: 0.991 },
      { time: 10, brightness: 0.994 },
      { time: 12, brightness: 0.997 },
      { time: 14, brightness: 0.999 },
      { time: 16, brightness: 1.000 }
    ]
  },
  {
    id: "hd-209458b",
    name: "HD 209458b",
    radius: 1.38,
    mass: 0.69,
    discovery_method: "Transit",
    discovery_year: 1999,
    distance: 159,
    orbital_period: 3.5,
    temperature: 1130,
    host_star: "HD 209458",
    description: "First exoplanet discovered transiting its star, nicknamed 'Osiris'.",
    graph_data: [
      { time: 0, brightness: 1.000 },
      { time: 0.5, brightness: 0.998 },
      { time: 1.0, brightness: 0.995 },
      { time: 1.5, brightness: 0.992 },
      { time: 2.0, brightness: 0.995 },
      { time: 2.5, brightness: 0.998 },
      { time: 3.0, brightness: 1.000 }
    ]
  },
  {
    id: "gliese-667cc",
    name: "Gliese 667Cc",
    radius: 1.54,
    mass: 3.8,
    discovery_method: "Radial Velocity",
    discovery_year: 2011,
    distance: 23.6,
    orbital_period: 28.1,
    temperature: 277,
    host_star: "Gliese 667C",
    description: "A super-Earth in the habitable zone of a red dwarf star.",
    graph_data: [
      { time: 0, velocity: 2.1 },
      { time: 3, velocity: 4.2 },
      { time: 6, velocity: 1.8 },
      { time: 9, velocity: -2.5 },
      { time: 12, velocity: -4.1 },
      { time: 15, velocity: -1.9 },
      { time: 18, velocity: 2.1 }
    ]
  },
  {
    id: "toi-715b",
    name: "TOI-715b",
    radius: 1.55,
    mass: 3.02,
    discovery_method: "Transit",
    discovery_year: 2024,
    distance: 137,
    orbital_period: 19.3,
    temperature: 280,
    host_star: "TOI-715",
    description: "A recently discovered super-Earth in the habitable zone.",
    graph_data: [
      { time: 0, brightness: 1.000 },
      { time: 3, brightness: 0.999 },
      { time: 6, brightness: 0.997 },
      { time: 9, brightness: 0.994 },
      { time: 12, brightness: 0.991 },
      { time: 15, brightness: 0.994 },
      { time: 18, brightness: 0.997 },
      { time: 21, brightness: 0.999 },
      { time: 24, brightness: 1.000 }
    ]
  },
  {
    id: "wasp-96b",
    name: "WASP-96b",
    radius: 1.2,
    mass: 0.48,
    discovery_method: "Transit",
    discovery_year: 2013,
    distance: 1150,
    orbital_period: 3.4,
    temperature: 1300,
    host_star: "WASP-96",
    description: "A hot gas giant with a clear atmosphere, studied by JWST.",
    graph_data: [
      { time: 0, brightness: 1.000 },
      { time: 0.8, brightness: 0.999 },
      { time: 1.6, brightness: 0.996 },
      { time: 2.4, brightness: 0.992 },
      { time: 3.2, brightness: 0.996 },
      { time: 4.0, brightness: 0.999 },
      { time: 4.8, brightness: 1.000 }
    ]
  }
];