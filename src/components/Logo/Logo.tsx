import { MediaQuery, Text } from '@mantine/core';
import { useStyles } from './styles';

import logoImage from '../../assets/logo.png';

export function Logo() {
  const { classes } = useStyles();

  return (
    <div className={classes.logoContainer}>
      <img src={logoImage} alt="mangoes" height={30} />

      <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
        <Text fw={700}>Mangoes</Text>
      </MediaQuery>
    </div>
  );
}
