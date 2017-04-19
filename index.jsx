import React from 'react';
import ReactDOM from 'react-dom';
import Tokenizer from '../src/Tokenizer';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.tokenize = this.tokenize.bind(this);
    this.removeToken = this.removeToken.bind(this);

    this.state = {
      tokens: [],
    };
  }
  tokenize(data) {
    let tokens = this.state.tokens;

    if (Array.isArray(data)) {
      tokens = tokens.concat(data);
    } else {
      tokens.push(data);
    }

    this.setState({ tokens });
  }

  removeToken(token) {
    const tokens = this.state.tokens;
    const index = tokens.indexOf(token);

    if (index !== -1) {
      tokens.splice(index, 1);
    }

    this.setState({ tokens });
  }
  render() {
    return (
      <Tokenizer placeholder="Email angeben" tokens={this.state.tokens} tokenize={this.tokenize} removeToken={this.removeToken} />
    );
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
