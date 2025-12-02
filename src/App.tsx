import React, { useMemo, useState } from 'react';
import './App.scss';
import { peopleFromServer } from './data/people';
import Autocomplete from './commponents/Autocomplete';
import { Person } from './types/Person';

export const App: React.FC = () => {
  // const { name, born, died } = peopleFromServer[0];
  const [peoples] = useState(peopleFromServer);
  const [selectedPerson, SetSelectedPerson] = useState<Person | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, SetQuery] = useState('');

  const handleSelect = (person: Person) => {
    SetSelectedPerson(person);
    setIsOpen(false);
    SetQuery(person.name);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    SetSelectedPerson(null);
    SetQuery(event.target.value);
  };

  const fillteredPeoples = useMemo(() => {
    return peoples.filter(man =>
      man.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, peoples]);

  return (
    <div className="container">
      <main className="section is-flex is-flex-direction-column">
        <h1 className="title" data-cy="title">
          {selectedPerson
            ? `${selectedPerson.name} (${selectedPerson.born} - ${selectedPerson.died})`
            : 'No selected person'}
        </h1>

        <div className={isOpen ? 'dropdown is-active' : 'dropdown'}>
          <div className="dropdown-trigger">
            <input
              type="text"
              placeholder="Enter a part of the name"
              className="input"
              data-cy="search-input"
              value={query}
              onChange={handleInput}
              onFocus={() => setIsOpen(true)}
            />
          </div>

          <div className="dropdown-menu" role="menu" data-cy="suggestions-list">
            <Autocomplete people={fillteredPeoples} onSelected={handleSelect} />
          </div>
        </div>

        {fillteredPeoples.length === 0 && query !== '' && (
          <div
            className="
            notification
            is-danger
            is-light
            mt-3
            is-align-self-flex-start
          "
            role="alert"
            data-cy="no-suggestions-message"
          >
            <p className="has-text-danger">No matching suggestions</p>
          </div>
        )}
      </main>
    </div>
  );
};
