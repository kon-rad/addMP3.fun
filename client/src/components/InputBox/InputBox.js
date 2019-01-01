import React, { Component, PropTypes } from "react";

import styles from "./InputBox.css";

class InputBox extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.value.trim()) {
      let ytid = this.state.value.match(
        /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
      );
      if (!ytid[5]) {
        return;
      }

      this.props.sendUrl(ytid[5]);
      this.setState({ value: "" });
    }
  };

  render() {
    return (
      <div className="inputBox_container">
        <div className={styles.col}>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="Youtube URL"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <Button className={styles.submitButton} type="submit">
              addMP3
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

InputBox.propTypes = {
  sendUrl: PropTypes.func.isRequired
};

export default InputBox;
