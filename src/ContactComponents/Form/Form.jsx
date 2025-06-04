import { Component } from "react";

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputActive: {
        name: false,
        surname: false,
        phone: false,
      },
      inputErrors: {
        name: true,
        surname: true,
        phone: true,
      },
      inputBlocked: {
        name: false,
        surname: false,
        phone: false,
      },
      alreadyInContact: false,
    };
  }

  handleSumitForm = () => {
    if (this.props.onAlready()) {
      this.setState({ alreadyInContact: true });

      setTimeout(() => {
        this.setState({
          alreadyInContact: false,
        });
      }, 1700);
    }
    if (
      !Object.values(this.state.inputErrors).includes(true) &&
      Object.values(this.state.inputActive).length === 3 &&
      !this.props.onAlready()
    ) {
      this.props.onSubmit();

      this.setState({
        inputActive: {
          name: false,
          surname: false,
          phone: false,
        },
        inputErrors: {
          name: true,
          surname: true,
          phone: true,
        },
        alreadyInContact: false,
      });
    } else {
      this.setState({
        inputActive: {
          name: true,
          surname: true,
          phone: true,
        },
        inputBlocked: {
          name: false,
          surname: false,
          phone: false,
        },
      });

      this.setState((prev) => ({
        inputBlocked: {
          ...prev.inputBlocked,
          ...Object.entries(this.state.inputErrors)
            .filter(([key, value]) => value === true)
            .map(([key]) => key)
            .reduce((acc, key) => {
              acc[key] = true;
              return acc;
            }, {}),
        },
      }));

      setTimeout(() => {
        this.setState({
          inputBlocked: {
            name: false,
            surname: false,
            phone: false,
          },
        });
      }, 1700);
    }
  };

  render() {
    return (
      <article className="wrapper__article">
        <h1 className="wrapper__title">Phonebook</h1>
        <form
          className={`wrapper__form${this.state.alreadyInContact ? " already" : ""}`}
          onSubmit={(e) => {
            e.preventDefault();
            this.handleSumitForm();
          }}
        >
          <label
            className={`wrapper__form-label  ${
              this.state.inputBlocked.name ? " blocked" : ""
            }`}
          >
            <h3 className="wrapper__form-title">Name</h3>
            <input
              className={`wrapper__form-input${
                this.props.inputValues.name.length <= 2 &&
                this.state.inputActive.name
                  ? " error"
                  : ""
              }`}
              type="text"
              value={this.props.inputValues.name}
              onChange={(e) => {
                !this.state.inputBlocked.name
                  ? this.props.onChange.name(e)
                  : "";
                if (e.target.value.length <= 2) {
                  this.setState((prev) => ({
                    inputErrors: {
                      ...prev.inputErrors,
                      name: true,
                    },
                  }));
                } else {
                  this.setState((prev) => ({
                    inputErrors: {
                      ...prev.inputErrors,
                      name: false,
                    },
                  }));
                }
              }}
              onClick={() => {
                this.setState((prev) => ({
                  inputActive: {
                    ...prev.inputActive,
                    name: true,
                  },
                }));
              }}
            />
          </label>
          <label
            className={`wrapper__form-label  ${
              this.state.inputBlocked.surname ? " blocked" : ""
            }`}
          >
            <h3 className="wrapper__form-title">Surname</h3>
            <input
              className={`wrapper__form-input${
                this.props.inputValues.surname.length <= 2 &&
                this.state.inputActive.surname
                  ? " error"
                  : ""
              }`}
              type="text"
              value={this.props.inputValues.surname}
              onChange={(e) => {
                !this.state.inputBlocked.surname
                  ? this.props.onChange.surname(e)
                  : "";
                if (e.target.value.length <= 2) {
                  this.setState((prev) => ({
                    inputErrors: {
                      ...prev.inputErrors,
                      surname: true,
                    },
                  }));
                } else {
                  this.setState((prev) => ({
                    inputErrors: {
                      ...prev.inputErrors,
                      surname: false,
                    },
                  }));
                }
              }}
              onClick={() => {
                this.setState((prev) => ({
                  inputActive: {
                    ...prev.inputActive,
                    surname: true,
                  },
                }));
              }}
            />
          </label>
          <label
            className={`wrapper__form-label  ${
              this.state.inputBlocked.phone ? " blocked" : ""
            }`}
          >
            <h3 className="wrapper__form-title">Phone</h3>
            <input
              className={`wrapper__form-input${
                (this.props.inputValues.phone.length !== 10 ||
                  !Number(this.props.inputValues.phone)) &&
                this.state.inputActive.phone
                  ? " error"
                  : ""
              }`}
              type="tel"
              value={this.props.inputValues.phone}
              onChange={(e) => {
                !this.state.inputBlocked.phone
                  ? this.props.onChange.phone(e)
                  : "";
                if (e.target.value.length !== 10 || !Number(e.target.value)) {
                  this.setState((prev) => ({
                    inputErrors: {
                      ...prev.inputErrors,
                      phone: true,
                    },
                  }));
                } else {
                  this.setState((prev) => ({
                    inputErrors: {
                      ...prev.inputErrors,
                      phone: false,
                    },
                  }));
                }
              }}
              onClick={() => {
                this.setState((prev) => ({
                  inputActive: {
                    ...prev.inputActive,
                    phone: true,
                  },
                }));
              }}
            />
          </label>
          <button className="wrapper__form-button" type="submit">
            Add contact
          </button>
        </form>
      </article>
    );
  }
}
