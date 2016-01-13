import sd from 'skin-deep';
import React from 'react';
import CollaborativeItem from './CollaborativeItem';
import { expect } from 'chai';

describe('CollaborativeItem component', () => {
  let tree;
  const props = {
    name: 'foo',
    link: '#foo'
  };

  beforeEach(() => {
    tree = sd.shallowRender(React.createElement(CollaborativeItem, props));
  });

  it('should have a prop link bind to Link subtree', () => {
    expect(tree.subTree('Link').props.to).to.equal(props.link);
  });

  it('should have a prop name as inner text', () => {
    expect(tree.subTree('div').text()).to.equal(props.name);
  });
});
