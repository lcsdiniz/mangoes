import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme, _params, getRef) => ({
  link: {
    color: 'orange',
    textDecoration: 'none'
  },
  
  header: {
    padding: '0 30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  select: {
    flex: 0.4,
  }
}))