import React from 'react';
import { css } from 'glamor';
import glamorous from 'glamorous';

const commonStyle = ({ size }) => {
  return {
    position: 'absolute',
    width: `${size + 1}px`,
    height: `${size + 1}px`,
  };
};

const Cube = glamorous.div(({ size }) => {
  return {
    width: `${size + 1}px`,
    height: `${size + 1}px`,
  };
});

const getAnimation = (offset: number = 0) => {
  return css.keyframes({
    '0%': {
      transform: `rotateY(${45 + offset}deg) rotateX(${-37.5 + offset}deg)`,
    },
    '100%': {
      transform: `rotateY(${45 + offset + 360}deg) rotateX(${-37.5 +
        offset +
        360}deg)`,
    },
  });
};

const Sides = ({ children, color, size, ...rest }) => {
  const alteredChildren = React.Children.map(children, child => {
    return React.cloneElement(child, { color, size });
  });

  return (
    <SidesDiv size={size} {...rest}>
      {alteredChildren}
    </SidesDiv>
  );
};

const SidesDiv = glamorous.div(
  {
    transformStyle: 'preserve-3d',
    willChange: 'transform',
  },
  ({ size }) => commonStyle({ size }),
  ({ noAnimation, offset, speed }) => {
    return noAnimation
      ? {}
      : {
          animation: `${getAnimation(offset)} ${speed}s linear infinite`,
        };
  }
);

const Side = glamorous.div(
  ({ color, rotate, size }) => {
    return {
      boxSizing: 'border-box',
      backgroundColor: `${color.clearer(0.2)}`,
      border: `${size / 70}px solid rgba(255, 255, 255, 0.4)`,
      transformOrigin: '50% 50%',
      willChange: 'transform',
      transform: `${rotate} translateZ(${size / 2}px)`,
      boxShadow: `0px 0px ${SHADOW_SIZE}px ${color()}`,
    };
  },
  ({ size }) => commonStyle({ size })
);

type Props = {
  size: number,
  className: string,
  noAnimation: ?boolean,
  speed: number,
  color: string,
  offset: number,
};

const isSafari =
  typeof navigator !== 'undefined' &&
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const SHADOW_SIZE = isSafari ? 100 : 150;

export default class GlowCube extends React.PureComponent<Props> {
  render() {
    const {
      size = 150,
      color = 'rgba(242,119,119,0.5)',
      speed = 1,
      offset = 0,
      noAnimation,
      className,
      ref,
      id,
    } = this.props;
    return (
      <Cube id={id} innerRef={ref} className={className} size={size}>
        <Sides
          color={color}
          offset={offset}
          speed={speed}
          noAnimation={noAnimation}
          size={size}
        >
          <Side rotate="rotateX(90deg)" />
          <Side rotate="rotateX(-90deg)" />
          <Side rotate="rotateY(0deg)" />
          <Side rotate="rotateY(-180deg)" />
          <Side rotate="rotateY(-90deg)" />
          <Side rotate="rotateY(90deg)" />
        </Sides>
      </Cube>
    );
  }
}
