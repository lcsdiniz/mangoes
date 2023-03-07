import { Loader } from '@mantine/core';
import { useStyles } from "./styles";

export function ContentLoader() {
  const { classes } = useStyles();

  return (
    <div className={classes.loaderContainer}>
      <Loader size={80} />
    </div>
  )
}