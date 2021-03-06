import React from "react";
import test from "ava";
import { shallow } from "enzyme";
import InputBox from "../../InputBox";

test("renders the InputBox properly", t => {
  const wrapper = shallow(<InputBox />);

  t.is(wrapper.find("form").length, 1);
});
