import { Component } from "react";

export default class Item extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <li className="wrapper__list-item">
          <button
            onClick={() => this.props.onClick(this.props.id)}
            className="wrapper__item-button"
          />
          <span className="wrapper__item-span">{this.props.name}</span>{" "}
          <span className="wrapper__item-span">{this.props.surname}</span>{" "}
          <span className="wrapper__item-span">{this.props.phone}</span>
        </li>
      </>
    );
  }
}
