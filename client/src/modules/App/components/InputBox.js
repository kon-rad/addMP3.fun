import React, { Component } from 'react';
import Col from 'awesome-possum/lib/Col'
import Row from 'awesome-possum/lib/Row'
import Input from 'awesome-possum/lib/Input'
import Button from 'awesome-possum/lib/Button'


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
            <Button large>inside inputbox</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default InputBox;
