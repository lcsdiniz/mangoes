import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  section: {
    padding: '16px 64px',

    [`@media (max-width: 50em)`]: {
      padding: '16px',
    },
  },
}));
