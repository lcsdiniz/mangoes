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

  chapters: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginTop: 16,
  },
}))