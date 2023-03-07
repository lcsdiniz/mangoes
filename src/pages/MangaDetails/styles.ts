import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme, _params, getRef) => ({
  detailsContainer: {
    display: 'flex',
    gap: 16
  },

  leftColumn: {
    display: 'flex',
    justifyContent: 'start',
    flexDirection: 'column',
    gap: 16
  },

  genreContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap'
  },

  badgesContainer: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap'
  },

  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 8
  },

  descriptionContainer: {
    marginTop: 16
  },

  volumesContainer: {
    marginTop: 32
  },

  volumeCover: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto' 
  }
}))