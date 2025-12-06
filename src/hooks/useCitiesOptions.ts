import { useEffect, useMemo, useState } from 'react';
import { COUNTRIES_NOW_SUPPORTED_COUNTRIES, getCountriesNowCities } from '../utils/api';

export const useCitiesOptions = (countries: readonly string[] = COUNTRIES_NOW_SUPPORTED_COUNTRIES) => {
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const countriesKey = useMemo(() => countries.join('|'), [countries]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getCountriesNowCities(countries)
      .then((list) => {
        if (!cancelled) {
          setCities(list);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('Failed to load cities', err);
          setError('Не удалось загрузить города. Попробуйте позже.');
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [countries, countriesKey]);

  return { cities, loading, error };
};
