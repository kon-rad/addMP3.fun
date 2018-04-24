import React, { Component } from 'react';
import Col from 'awesome-possum/lib/Col'
import Row from 'awesome-possum/lib/Row'
import InputGroup from 'awesome-possum/lib/InputGroup';
import Input from 'awesome-possum/lib/Input';
import Button from 'awesome-possum/lib/Button';

// Import Style
// import styles from './InputBox.scss';

class InputBox extends Component {
  render() {
    return (
      <div className="inputBox_container">
        <Row>
          <Col large={8} largeOffset={2}>
            <InputGroup>
              <InputGroup.Field>
                <Input placeholder="Youtube URL" type="text" />
              </InputGroup.Field>
              <InputGroup.Button>
                <Button success type="submit"><span role="img" aria-label="Audio">&#128266;</span></Button>
              </InputGroup.Button>
            </InputGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

export default InputBox;
