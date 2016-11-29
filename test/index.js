/* eslint-disable no-consolezz */
const assert = require('assert');
const path = require('path');

const plugin = require(path.join(__dirname, '../lib/plugin'));

describe('Title length plugin', () => {
  it('shoud process HTML with the title "Hello World"', () =>
    assert.equal(plugin.process('<!DOCTYPE html><html>  <head>    <title>Hello World</title>  </head>  <body></body></html>'), 11));

  it('shoud process HTML with the title "123"', () =>
    assert.equal(plugin.process('<!DOCTYPE html><html>  <head>    <title>123</title>  </head>  <body></body></html>'), 3));

  it('shoud process HTML with the title ""', () =>
    assert.equal(plugin.process('<!DOCTYPE html><html>  <head>    <title></title>  </head>  <body></body></html>'), 0));

  it('shoud process HTML with a 1000-character title', () =>
    assert.equal(plugin.process('<!DOCTYPE html><html>  <head>    <title>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec ullamcorper nullaa non metus auctor fringilla. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere consectetura est at lobortis. Nulla vitae elit libero, a pharetra augue. Integer posuere erata a ante venenatis dapibus posuere velit aliquet. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibha, ut fermentum massa justo sit amet risus. Aenean lacinia bibendum nulla sed consectetur. Maecenas faucibus mollis interdum. Donec sed odio dui. Curabitur blandit tempus porttitor. Maecenas sed diam eget risus varius blandit sit amet non magna. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur. Maecenas faucibus mollis interdum. Etiam porta sem malesuada magna mollis euismod. Quam Ligula Fusce Magna Sem.</title>  </head>  <body></body></html>'), 1000));

  it('shoud process HTML with a greater-than-1000-character title', () =>
    assert.equal(plugin.process('<!DOCTYPE html><html>  <head>    <title>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec ullamcorper nullaa non metus auctor fringilla. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere consectetura est at lobortis. Nulla vitae elit libero, a pharetra augue. Integer posuere erata a ante venenatis dapibus posuere velit aliquet. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibha, ut fermentum massa justo sit amet risus. Aenean lacinia bibendum nulla sed consectetur. Maecenas faucibus mollis interdum. Donec sed odio dui. Curabitur blandit tempus porttitor. Maecenas sed diam eget risus varius blandit sit amet non magna. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur. Maecenas faucibus mollis interdum. Etiam porta sem malesuada magna mollis euismod. Quam Ligula Fusce Magna Sema.</title>  </head>  <body></body></html>'), false));

  it('shoud process HTML with a 500-character title', () =>
    assert.equal(plugin.process('<!DOCTYPE html><html>  <head>    <title>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Doneca ullamcorper nullaa non metus auctor fringilla. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere consectetura est at lobortis. Nulla vitae elit libero, a pharetra augue. Integer posuere erata a ante venenatis dapibus posuere velit aliquet. Fusce dapibus, tellus ac</title>  </head>  <body></body></html>'), 500));

  it('shoud process the string "Hello"', () =>
    assert.equal(plugin.process('Hello'), false));

  it('shoud process the string ""', () =>
    assert.equal(plugin.process(''), false));

  it('shoud process the number 100', () =>
    assert.equal(plugin.process(100), false));

  it('shoud process the number 0', () =>
    assert.equal(plugin.process(0), false));

  it('shoud process an object', () =>
    assert.equal(plugin.process({}), false));

  it('shoud process <null>', () =>
    assert.equal(plugin.process(null), false));

  const example1 = { a: 2, b: 5 };
  it(`shoud compare "${JSON.stringify(example1)}`, () =>
    assert.equal(plugin.compare(example1), 3));

  const example2 = { a: 0, b: 0 };
  it(`shoud compare "${JSON.stringify(example2)}`, () =>
    assert.equal(plugin.compare(example2), 0));

  const example3 = { a: 500, b: 1000 };
  it(`shoud compare "${JSON.stringify(example3)}`, () =>
    assert.equal(plugin.compare(example3), 500));

  const example4 = { a: 1000, b: 500 };
  it(`shoud compare "${JSON.stringify(example4)}`, () =>
    assert.equal(plugin.compare(example4), -500));

  const example5 = {
    a: '<!DOCTYPE html><html>  <head>    <title>Hello</title>  </head>  <body></body></html>',
    b: '<!DOCTYPE html><html>  <head>    <title>Hello World</title>  </head>  <body></body></html>',
  };
  it('shoud run a full example', () =>
    assert.deepEqual(plugin.run(example5), { a: 5, b: 11, compare: 6 }));
});
