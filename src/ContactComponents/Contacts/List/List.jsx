import { Component } from "react";
import Item from "./Item/Item";

export default class List extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="wrapper__list">
        {this.props.contacts.length > 0 ?
          this.props.contacts.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              surname={item.surname}
              phone={item.phone}
              onClick={this.props.onClick}
            />
          )): ""}
      </ul>
    );
  }
}
