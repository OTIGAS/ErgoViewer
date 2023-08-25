import { styled } from '..';

export const Div = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: '100vw',
  height: '100vh',

  div: {
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',

    flexDirection: 'column',

    gap: 5
  }
});

export const Form = styled('form', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',

  img: {
    position: 'absolute',
  },
});

export const Input = styled('input', {
  width: 200,
  display: 'block',
  margin: '0.5rem',
});

export const Button = styled('button', {
  width: 200,
  margin: '0 auto',
  marginTop: '0.5rem',
});

export const Label = styled('label', {
  marginTop: '0.5rem'
});

export const Img = styled('img', {});
