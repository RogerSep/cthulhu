import React from 'react';
import ReactDom from 'react-dom';
import css from './main.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showEven: false
    };

    this.toggle = this.toggle.bind(this);
  }

  render() {
    const showEven = this.state.showEven;
    const arr = [1, 2, 3, 4, 5, 6, 0].filter(x => {
      if (showEven) {
        return x % 2 === 0
      } else {
        return x % 2 !== 0;
      }
    });
    const renderNum = (num, index) => <li key={num.toString() + index.toString()}>{num}</li>;

    return (
      <ul onClick={this.toggle} className={showEven ? css.example : css.shouldBeWorking}>
        {arr.map(renderNum)}
      </ul>
    );
  }

  toggle() {
    this.setState({
      showEven: !(this.state.showEven || false)
    });
  }

  renderNum(num) {
    return <li key={num}>{num}</li>;
  }
}

function main() {
  const app = document.createElement('div');
  document.body.appendChild(app);

  ReactDom.render(<App />, app)
}

main();