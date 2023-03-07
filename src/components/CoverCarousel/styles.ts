import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme, _params, getRef) => ({
  container: {
    maxWidth: '100vw',
    padding: 0
  },

  carouselSlide: {
    position: 'relative',
  },

  carouselBackground: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: 400,
    backgroundPosition: 'center',
  },

  mangaInformation: {
    position: 'absolute',
    width: '50%',
    padding: '0 24px',
    left: 50,
    top: 0,
    bottom: 0,
    margin: 'auto 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },

  mangaTitle: {
    fontSize: 48,
    color: '#FFFFFF'
  },

  mangaDescription: {
    fontSize: 24,
    color: '#FFFFFF'
  },
}))