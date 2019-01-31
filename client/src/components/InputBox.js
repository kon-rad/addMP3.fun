import React, { Component, PropTypes } from "react";

// user error messages. e.g. when an incorrect url is entered
const USER_MESSAGES = {
  INVALID_URL: (
    <div>
      <i className="fa fa-exclamation-circle" aria-hidden="true" />
      &nbsp; Invalid youtube URL, please try again
    </div>
  )
};

class InputBox extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", error: false, errorType: null };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.value.trim()) {
      return;
    }

    let ytid = this.state.value.match(
      /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
    );
    if (!ytid || !(ytid.length >= 5)) {
      this.setState({ error: true, errorType: "INVALID_URL" });

      return;
    }

    this.props.sendUrl(ytid[5]);
    this.setState({ value: "" });
  };

  clearError = () => {
    this.setState({ error: false, errorType: null });
  };

  renderUserMessage = () => {
    if (this.state.error) {
      setTimeout(this.clearError, 7000);
      return (
        <div className="error_message">
          {USER_MESSAGES[this.state.errorType]}
        </div>
      );
    }

    return null;
  };

  render() {
    return (
      <div className="inputBox_container">
        <div className="col">
          <form onSubmit={this.handleSubmit}>
            <div className="inputWrapper">
              <input
                placeholder="Youtube URL"
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
              <button className="submitButton" type="submit">
                GO
              </button>
            </div>
            {this.renderUserMessage()}
          </form>
        </div>
      </div>
    );
  }
}

export default InputBox;
