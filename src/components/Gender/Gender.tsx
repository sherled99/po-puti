import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenders } from '../../services/actions/gender';
import { RootState, AppDispatch } from '../../services/types';

const Gender: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.gender);

  useEffect(() => {
    dispatch(getGenders() as any);
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>All genders</h1>
      <ul>
        {data.map((gender) => (
          <li key={gender.id}>
            {gender.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Gender;
