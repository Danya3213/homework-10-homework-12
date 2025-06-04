import { Component } from "react";

export default class Find extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: "",
    };
  }

  render() {
    return (
      <article className="wrapper__article">
        <h3 className="wrapper__title--middle">Find contacts by name</h3>
        <input
          className="wrapper__input"
          value={this.props.value}
          onChange={(e) => this.props.onChange(e)}
          type="text"
        />
      </article>
    );
  }
}
