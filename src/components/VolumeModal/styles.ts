import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme, _params, getRef) => ({
  volumeContainer: {
    display: 'flex',
    gap: 24,

    [`@media (max-width: 50em)`]: {
      gap: 0,
      flexDirection: 'column'
    },
  },

  volumeData: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },

  volumeTitle: {
    [`@media (max-width: 50em)`]: {
      textAlign: 'center'
    },
  },

  volumeLastUpdate: {
    [`@media (max-width: 50em)`]: {
      textAlign: 'center'
    },
  },

  chapters: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginTop: 16,
  },
}))