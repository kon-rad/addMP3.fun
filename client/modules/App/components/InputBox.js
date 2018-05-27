import React, { Component, PropTypes } from 'react';
import Col from 'awesome-possum/lib/Col'
import Row from 'awesome-possum/lib/Row'
import InputGroup from 'awesome-possum/lib/InputGroup';
import Input from 'awesome-possum/lib/Input';
import Button from 'awesome-possum/lib/Button';

// Import Style
import styles from './InputBox.scss';

class InputBox extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 'https://www.youtube.com/watch?v=Lo3769VtgHM' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.value.trim()) {
      this.props.sendUrl(this.state.value);
      this.setState({ value: '' });
    }
  }

  render() {
    return (
      <div className="inputBox_container">
        <Row>
          <Col large={8} largeOffset={2}>
            <form className={styles.input_form} onSubmit={this.handleSubmit}>
              <InputGroup>
                <InputGroup.Field>
                  <Input placeholder="Youtube URL" type="text" value={this.state.value} onChange={this.handleChange} />
                </InputGroup.Field>
                <InputGroup.Button>
                  <Button success type="submit"><span role="img" aria-label="Audio">&#128266;</span></Button>
                </InputGroup.Button>
              </InputGroup>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

InputBox.propTypes = {
  sendUrl: PropTypes.func.isRequired,
};

export default InputBox;
