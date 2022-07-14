import React from 'react';
import renderer from 'react-test-renderer';
import Overview from '../../client/src/Components/ProductOverview/Overview.jsx';

it('changes the Main Image and thumbnails displayed when a different style is clicked', () => {
  // Render the Product Overview widget
  const Widget = renderer
    .create(<Overview />);
  new Promise(process.nextTick);
  let tree = Widget.toJSON();
  expect(tree).toMatchSnapshot();

  // Click on the second style thumbnail in the style selector
  renderer.act(() => {
    Widget.getInstance().findAllByType(StyleThumbnail)[1].props.onClick();
  });
  // Re-rendering
  tree = Widget.toJSON();
  expect(tree).toMatchSnapshot();

});