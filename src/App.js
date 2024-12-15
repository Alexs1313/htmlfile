import { useState } from "react";
import { Form } from "./components/Form";
import { nanoid } from "nanoid";
import { ContactList } from "./components/ContactsList";
import { Filter } from "./components/Filter";
import Notiflix from "notiflix";

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem("contacts")) || []
  );
  const [filter, setFilter] = useState("");

  const addContact = (name, telephone) => {
    const existingName = contacts.find((contact) => contact.name === name);
    existingName !== undefined
      ? Notiflix.Notify.warning(`${name} is already in contacts.`, {
          width: "500px",
          height: "40px",
          backOverlay: true,
          clickToClose: true,
          closeButton: true,
        })
      : setContacts([...contacts, { id: nanoid(), name, telephone }]);
  };

  const deleteContact = (contactId) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId));
  };

  const handleChangeFilter = (e) => {
    setFilter(e.target.value);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Form onSubmit={addContact} />
      <h1>Contacts</h1>
      {contacts.length > 0 ? (
        <ContactList contacts={filteredContacts} onDelete={deleteContact} />
      ) : (
        Notiflix.Notify.info("Your phonebook is empty. Please add contact.", {
          position: "center-bottom",
          backOverlay: true,
          clickToClose: false,
          closeButton: true,
          timeout: 3000,

          info: {
            background: "#26c0d3",
            textColor: "#fff",
            childClassName: "notiflix-notify-info",
            notiflixIconColor: "rgba(0,0,0,0.2)",
            fontAwesomeClassName: "fas fa-info-circle",
            fontAwesomeIconColor: "rgba(0,0,0,0.2)",
            backOverlayColor: "rgba(38,192,211,0.2)",
          },
        })
      )}

      <Filter onChange={handleChangeFilter} value={filter} />
    </div>
  );
};
