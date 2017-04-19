import React from 'react';
import PropTypes from 'prop-types';
import Token from './Token';

const KEYS = {
  BACKSPACE: 8,
  TAB: 9,
  COMMA: 188,
  ENTER: 13,
  SPACE: 32,
};

const SEPERATORS = [KEYS.TAB, KEYS.COMMA, KEYS.ENTER, KEYS.SPACE];

class Tokenizer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handlePaste = this.handlePaste.bind(this);

    this.state = {
      userInput: '',
    };
  }

  handleChange(evt) {
    this.setState({ userInput: evt.target.value });
  }

  handleKeyDown(evt) {
    const userInput = this.state.userInput;

    if (SEPERATORS.indexOf(evt.which) !== -1) {
      evt.preventDefault();

      if (userInput.trim()) {
        this.props.tokenize(userInput);
        this.setState({ userInput: '' });
      }
    } else if (evt.which === KEYS.BACKSPACE) {
      if (userInput.trim()) { return; }

      const parent = this.node;
      const cells = parent.querySelectorAll('.rt-cell');
      let lastChild;
      let textContent;

      if (cells.length > 0) {
        lastChild = cells[cells.length - 1];
        textContent = lastChild.querySelector('.rt-cell__content').textContent;

        this.props.removeToken(textContent);
      }
    }
  }

  handlePaste(evt) {
    evt.preventDefault();
    const clipboard = evt.clipboardData;
    const data = clipboard.getData('text/plain');
    const tokens = data.split('\n');
    this.props.tokenize(tokens);
  }

  render() {
    const self = this;
    const tokens = self.props.tokens.map((token, index) => (<Token
      key={index} textContent={token}
      removeToken={self.props.removeToken}
    />));

    return (
      <div className="rt-tokenizer">
        {tokens}

        <textarea
          className="rt-tokenizer__user-input"
          value={this.state.userInput}
          onKeyDown={this.handleKeyDown}
          onPaste={this.handlePaste}
          onChange={this.handleChange}
        />
      </div>
    );
  }

}

Tokenizer.propTypes = {
  tokenize: PropTypes.func.isRequired,
  removeToken: PropTypes.func.isRequired,
};

export default Tokenizer;
