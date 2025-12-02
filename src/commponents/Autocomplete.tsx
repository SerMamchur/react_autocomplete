// import classNames from "classnames";
// import { useState } from 'react';
import { Person } from '../types/Person';

type Props = {
  people: Person[];
  onSelected: (person: Person) => void;
};

export const Autocomplete: React.FC<Props> = ({ people, onSelected }) => {
  return (
    <div className="dropdown-content">
      {people.map(person => (
        <div
          className="dropdown-item"
          data-cy="suggestion-item"
          key={person.slug}
          onMouseDown={() => onSelected(person)}
        >
          <p className="has-text-link">{person.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Autocomplete;
