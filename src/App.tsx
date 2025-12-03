import React, { useCallback, useMemo, useState } from 'react';
import './App.scss';
import { peopleFromServer } from './data/people';
import Autocomplete from './components/Autocomplete';
import { Person } from './types/Person';
import debounce from 'lodash.debounce';

export const App: React.FC = () => {
  // const { name, born, died } = peopleFromServer[0];
  const [peoples] = useState(peopleFromServer);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [apliedQuery, setApliedQuery] = useState('');

  const apllyQuery = useCallback(debounce(setApliedQuery, 1000), []);

  const handleSelect = (person: Person) => {
    setSelectedPerson(person);
    setIsOpen(false);
    setQuery(person.name);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPerson(null);
    setQuery(event.target.value);
    apllyQuery(event.target.value);
  };

  const filteredPeoples = useMemo(() => {
    return peoples.filter(man =>
      man.name.toLowerCase().includes(apliedQuery.trimStart().toLowerCase()),
    );
  }, [apliedQuery, peoples]);

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
            <Autocomplete people={filteredPeoples} onSelected={handleSelect} />
          </div>
        </div>

        {filteredPeoples.length === 0 && query !== '' && (
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
