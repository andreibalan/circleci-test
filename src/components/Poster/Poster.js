import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';

import css from './Poster.css';

export default class Card extends Component {
  static defaultProps = {
    prespectiveAmount: 800,
    maxRotation: 8,
    maxTranslation: 4,
    natural: false,
  };

  static propTypes = {
    prespectiveAmount: PropTypes.number.isRequired,
    maxRotation: PropTypes.number.isRequired,
    maxTranslation: PropTypes.number.isRequired,
    natural: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,

      xRotationPercentage: 0,
      yRotationPercentage: 0,

      xTranslationPercentage: 0,
      yTranslationPercentage: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.computeTransformStyle = this.computeTransformStyle.bind(this);
  }

  calculateRotationPercentage(offset, dimension) {
    return ((-2 / dimension) * offset) + 1;
  }

  calculateTranslationPercentage(offset, dimension) {
    return ((-2 / dimension) * offset) + 1;
  }

  handleClick(e) {

  }

  handleMouseOut() {
    this.setState({
      isFocused: false,

      xRotationPercentage: 0,
      yRotationPercentage: 0,

      xTranslationPercentage: 0,
      yTranslationPercentage: 0,
    });
  }

  handleMouseEnter() {
    this.setState({ isFocused: true });
  }

  handleMouseMove(e) {
    if (this.cardRef) {
      const bounds = this.cardRef.getBoundingClientRect();

      const mouseOffsetInside = {
        x: e.pageX - this.cardRef.offsetLeft,
        y: e.pageY - this.cardRef.offsetTop,
      };

      const xRotationPercentage = this.calculateRotationPercentage(mouseOffsetInside.y, bounds.height);
      const yRotationPercentage = this.calculateRotationPercentage(mouseOffsetInside.x, bounds.width) * -1;

      const xTranslationPercentage = this.calculateTranslationPercentage(mouseOffsetInside.x, bounds.width);
      const yTranslationPercentage = this.calculateTranslationPercentage(mouseOffsetInside.y, bounds.height);

      this.setState({
        isFocused: true,

        xRotationPercentage,
        yRotationPercentage,

        xTranslationPercentage,
        yTranslationPercentage,
      });
    }
  }

  computeTransformStyle({
    stackingFactor = 1,
    xRotationPercentage = 0,
    yRotationPercentage = 0,

    xTranslationPercentage = 0,
    yTranslationPercentage = 0,
  }) {
    const {
      prespectiveAmount,
      maxRotation,
      maxTranslation,
      natural,
    } = this.props;

    const f = natural ? 1 : -1;

    const xRotationPercentageR = xRotationPercentage * f;
    const yRotationPercentageR = yRotationPercentage * f;

    const xTranslationPercentageR = xTranslationPercentage * f;
    const yTranslationPercentageR = yTranslationPercentage * f;

    const rotate = `perspective(${prespectiveAmount}px) rotateX(${xRotationPercentageR * maxRotation}deg) rotateY(${yRotationPercentageR * maxRotation}deg)`;
    const translate = ` translate3d(${xTranslationPercentageR * stackingFactor * maxTranslation}px,${yTranslationPercentageR * stackingFactor * maxTranslation}px, 0px)`;

    return { transform: rotate + translate };
  }

  render() {
    const { isFocused } = this.state;

    const {
      xRotationPercentage,
      yRotationPercentage,

      xTranslationPercentage,
      yTranslationPercentage,
    } = this.state;

    return (
      <Motion style={{
        scale: spring(isFocused ? 1.1 : 1, { stiffness: 120, damping: 17 }),
        xRotationPercentage: spring(xRotationPercentage),
        yRotationPercentage: spring(yRotationPercentage),
        xTranslationPercentage: spring(xTranslationPercentage),
        yTranslationPercentage: spring(yTranslationPercentage),
      }}
      >
        {(value) => {
          const transformConfig = {
            xRotationPercentage: value.xRotationPercentage,
            yRotationPercentage: value.yRotationPercentage,
            xTranslationPercentage: value.xTranslationPercentage,
            yTranslationPercentage: value.yTranslationPercentage,
          };

          // style={{
          //   transform: `scale(${value.scale})`,
          // }}

          return (
            <div
              className={css.poster}
              onMouseMove={this.handleMouseMove}
              onMouseOut={this.handleMouseOut}
              onMouseEnter={this.handleMouseEnter}
              ref={(ref) => { this.cardRef = ref; }}
              style={this.computeTransformStyle({ ...transformConfig, stackingFactor: 1 })}
            >
              <div className={css.shine} />
              <div className={css.layer1} style={this.computeTransformStyle({ ...transformConfig, stackingFactor: -0.5 })} />
              <div className={css.layer2} />
              <div className={css.layer3} style={this.computeTransformStyle({ ...transformConfig, stackingFactor: 1 })} />
              <div className={css.layer4} style={this.computeTransformStyle({ ...transformConfig, stackingFactor: 1.25 })} />
              <div className={css.layer5} style={this.computeTransformStyle({ ...transformConfig, stackingFactor: 1.5 })} />
            </div>
          );
        }}
      </Motion>
    );
  }
}
