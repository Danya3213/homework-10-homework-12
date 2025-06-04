import { Component } from "react";
import List from "./List/List";

export default class Contacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: JSON.parse(localStorage.getItem("filteredContacts")),
    };
  }

  componentDidMount() {
    this.checkUpdate();
  }

  checkUpdate = () => {
    this.setState({
      contacts: JSON.parse(localStorage.getItem("filteredContacts")),
    });
  };

  render() {
    return (
      <article className="wrapper__article">
        <h1 className="wrapper__title">Contacts</h1>
        <List onClick={this.props.onClick} contacts={this.state.contacts} />
      </article>
    );
  }
}
