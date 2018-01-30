import glamorous from 'glamorous';

const getGradient = color => `linear-gradient(
  45deg,
  ${color()},
  ${color.darken(0.2)}
)`;

const Button = glamorous.a(({ color, secondary }) => {
  const primaryStyle = {
    position: 'relative',
    background: secondary ? '' : getGradient(color),
    border: 'none',
    outline: 'none',
    padding: '0.75em 1.5em',
    fontWeight: 400,
    borderRadius: '4px',
    color: 'white',
    textAlign: 'center',
    boxShadow: `0 0 100px ${color.clearer(0.3)}`,
    textTransform: 'uppercase',
    textDecoration: 'none',
  };

  const secondaryStyle = {
    color: `${color()}`,
    textShadow: `0 0 50px ${color.clearer(0.3)}`,
    boxShadow: 'none',
  };

  return secondary ? { ...primaryStyle, ...secondaryStyle } : primaryStyle;
});

export default Button;
