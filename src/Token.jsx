import React from 'react';
import PropTypes from 'prop-types';

class Token extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const cell = this.node;
    const textContent = cell.querySelector('.rt-cell__content').textContent;
    this.props.removeToken(textContent);
  }

  render() {
    const textContent = this.props.textContent;

    if (!textContent || !textContent.trim()) { return null; }

    return (
      <div className="rt-cell" ref={(node) => { this.node = node; }}>
        <p className="rt-cell__content">{textContent.trim()}</p>
        <button className="rt-cell__delete" onClick={this.handleClick}>x</button>
      </div>
    );
  }
}

Token.propTypes = {
  textContent: PropTypes.string.isRequired,
  removeToken: PropTypes.func.isRequired,
};

export default Token;
