import { Component, createRef } from "react";
import "./App.css";
import "./index.scss";
import Form from "./ContactComponents/Form/Form";
import Contacts from "./ContactComponents/Contacts/Contacts";
import Find from "./ContactComponents/Find/Find";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.childRef = createRef();
    this.state = {
      contacts: [],
      contactsIds: [0],
      filteredContacts: [],
      inputsValues: {
        name: "",
        surname: "",
        phone: "",
        filter: "",
      },
    };
  }

  handleAddContact = () => {
    this.setState(
      (prev) => ({
        contacts: [
          ...prev.contacts,
          {
            name: prev.inputsValues.name,
            surname: prev.inputsValues.surname,
            phone: prev.inputsValues.phone,
            id: prev.contactsIds[prev.contactsIds.length - 1],
          },
        ],

        contactsIds: [
          ...prev.contactsIds,
          prev.contactsIds[prev.contactsIds.length - 1] + 1,
        ],

        inputsValues: {
          name: "",
          surname: "",
          phone: "",
          filter: "",
        },
      }),
      () => {
        this.checkFilterContacts(this.state.inputsValues.filter);
      }
    );
  };

  componentDidMount() {
    localStorage.setItem("filteredContacts", JSON.stringify([]));
  }

  handleDeleteContact = (id) => {
    this.setState((prev) => ({
      contacts: prev.contacts.filter((item) => item.id !== id),
    }));

    this.checkFilterContacts(this.state.inputsValues.filter);
  };

  handleOnChange = {
    name: (e) => {
      this.setState((prev) => ({
        inputsValues: {
          ...prev.inputsValues,
          name: e.target.value,
        },
      }));
    },
    surname: (e) => {
      this.setState((prev) => ({
        inputsValues: {
          ...prev.inputsValues,
          surname: e.target.value,
        },
      }));
    },
    phone: (e) => {
      this.setState((prev) => ({
        inputsValues: {
          ...prev.inputsValues,
          phone: e.target.value,
        },
      }));
    },
    filter: (e) => {
      this.checkFilterContacts(e.target.value);
      this.setState((prev) => ({
        inputsValues: {
          ...prev.inputsValues,
          filter: e.target.value,
        },
      }));
    },
  };

  handleFindContact = () => {
    return (
      (this.state.contacts.find((item) =>
        item.name
          .toLowerCase()
          .includes(this.state.inputsValues.name.toLowerCase())
      ) !== undefined &&
        this.state.contacts.find((item) =>
          item.surname
            .toLowerCase()
            .includes(this.state.inputsValues.surname.toLowerCase())
        ) !== undefined) ||
      this.state.contacts.find((item) =>
        item.phone.includes(this.state.inputsValues.phone)
      ) !== undefined
    );
  };

  checkFilterContacts = (value) => {
    this.setState(
      (prev) => ({
        filteredContacts: prev.contacts.filter(
          (item) =>
            item.name.toLowerCase().includes(value.toLowerCase()) ||
            item.surname.toLowerCase().includes(value.toLowerCase()) ||
            item.phone.toLowerCase().includes(value.toLowerCase())
        ),
      }),
      () => {
        localStorage.setItem(
          "filteredContacts",
          JSON.stringify(this.state.filteredContacts)
        );
        this.childRef.current.checkUpdate();
      }
    );
  };

  render() {
    return (
      <>
        <Form
          onChange={this.handleOnChange}
          inputValues={this.state.inputsValues}
          onSubmit={this.handleAddContact}
          onError={this.errorSubmit}
          onAlready={this.handleFindContact}
        />
        <Find
          value={this.state.inputsValues.filter}
          onChange={this.handleOnChange.filter}
        />
        <Contacts onClick={this.handleDeleteContact} ref={this.childRef} />
      </>
    );
  }
}
