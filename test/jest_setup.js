import { shallow, render, mount } from 'enzyme';
global.shallow = shallow;
global.render = render;
global.mount = mount;
// Fail tests on any warning
console.error = message => {
  throw new Error(message);
};

jest.mock("../src/assets/images/langkilde.png", () => jest.fn());
jest.mock("../src/assets/images/favicon.ico", () => jest.fn());