import React, { Component } from 'react';
import Col from 'awesome-possum/lib/Col'
import Row from 'awesome-possum/lib/Row'
import Input from 'awesome-possum/lib/Input'

class InputBox extends Component {
  render() {
    return (
      <div className="inputBox_container">
        <Row>
          <Col large={8} largeOffset={2}>
            <Input.Stack
              placeholder="Youtube URL"
              button="Covert to Audio"
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default InputBox;
