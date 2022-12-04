import { Form, FormInput, FormSubmit } from './ContactForm.styled';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const ContactForm = ({ onSubmitForm }) => {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');

  const handleChange = e => {
    switch (e.target.name) {
      case 'number':
        setNumber(e.target.value);
        break;
      case 'name':
        setName(e.target.value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmitForm({ name, number });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label>
        Name
        <br />
        <FormInput
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <br />
      <label>
        Number
        <br />
        <FormInput
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <br />
      <FormSubmit type="submit">Add contact</FormSubmit>
    </Form>
  );
};

ContactForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};
