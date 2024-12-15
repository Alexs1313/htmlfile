import { nanoid } from "nanoid";
import { useState } from "react";

export const Form = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        setName(value);
        break;

      case "telephone":
        setTelephone(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name, telephone);
    resetForm();
  };
  const resetForm = () => {
    setName("");
    setTelephone("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={nameInputId}>
        Name
        <input
          type="text"
          name="name"
          id={nameInputId}
          value={name}
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
      </label>

      <label htmlFor={numberInputId}>
        Number
        <input
          type="tel"
          name="telephone"
          id={numberInputId}
          value={telephone}
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />
      </label>

      <button type="submit">Add contact</button>
    </form>
  );
};
