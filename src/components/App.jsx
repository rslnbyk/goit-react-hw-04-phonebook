import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactsList';
import { save, load } from './storage';
import { useState } from 'react';
import { useEffect } from 'react';

const CONTACTS_KEY = 'contacts';

export const App = () => {
  const [contacts, setContacts] = useState(load(CONTACTS_KEY));
  const [filter, setFilter] = useState('');

  useEffect(() => {
    save(CONTACTS_KEY, contacts);
  }, [contacts]);

  const changeContacts = ({ name, number }) => {
    for (const cont of contacts) {
      if (cont.name.toLowerCase() === name.toLowerCase()) {
        alert(`${name} is already in contacts`);
        return;
      }
    }
    setContacts(prev => [...prev, { id: nanoid(), name, number }]);
  };

  const deleteContact = id => {
    setContacts(contacts.filter(cont => cont.id !== id));
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmitForm={changeContacts} />
      {contacts.length > 0 && (
        <>
          <h2>Contacts</h2>
          <Filter onChangeFilter={setFilter} />
          <ContactsList
            contacts={filteredContacts}
            onDeleteContact={deleteContact}
          />
        </>
      )}
    </>
  );
};
