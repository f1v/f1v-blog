---
title: 'JavaScript Testing Libraries'
date: '2020-03-01'
author: 'Sophie Liu'
author_site: https://rdeyo.com/
---

I recently take charge of testing for a commercial web/mobile app, so I make a brief summary about testing framework for the later developer.

## Installation

```bash
npm i --save-dev enzyme enzyme-adapter-react-16
```

## Usage

Import:

```
import { shallow } from 'enzyme';
import { Counter } from './Counter';
```

```jsx
describe('<Counter />', () => {
  it('should increment by one when clicking button', () => {
    const wrapper = shallow(<Counter />);
    const total1 = wrapper.find('h1.total').text();
    expect(total1).toBe('The value is: 0');
    const button = wrapper.find('button.increase');
    button.simulate('click');
    const total2 = wrapper.find('h1.total').text();
    expect(total2).toBe('The value is: 1');
  });
  it('should decrement by one when clicking button', () => {
    const wrapper = shallow(<Counter />);
    const total1 = wrapper.find('h1.total').text();
    expect(total1).toBe('The value is: 0');
    const button = wrapper.find('button.decrease');
    button.simulate('click');
    const total2 = wrapper.find('h1.total').text();
    expect(total2).toBe('The value is: -1');
  });
});
```

```jsx
import puppeteer from 'puppeteer';

describe('Testing Input Fields', () => {
  it('Enter User Name', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.goto('http://localhost:3000/');
    await page.waitForSelector('#my-name');
    await page.type('#my-name', 'testing');
  });
});
```

## Comparison

| Differences     |     Puppeteer      |                                                 Jest |
| :-------------- | :----------------: | ---------------------------------------------------: |
| Category        | Browser Automation |                                         Unit Testing |
| xUnit           |         No         |                                                   No |
| Client-side     |        Yes         |                                                  Yes |
| Server-side     |         No         |                                                  Yes |
| Fixtures        |        N/A         |                                                  Yes |
| Group Firxtures |        N/A         |                                                  Yes |
| Generators      |         No         |                                                  N/A |
| License         | Apache License 2.0 |                                          MIT License |
| Mocks           |         No         | a custom resolver with the riched Mock Functions API |
| Grouping        |         No         |                                                  Yes |

## Further Reading

1. Puppeteer: https://pptr.dev
2. Jest: https://devhints.io/jest
3. Enzyme: https://enzymejs.github.io/enzyme/
