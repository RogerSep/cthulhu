import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <span>It is working!</span>
    );
  }
}

function main() {
  const app = document.createElement('div');
  document.body.appendChild(app);

  ReactDom.render(<App />, app)
} 