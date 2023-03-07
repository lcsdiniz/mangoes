import { Button, Modal, createStyles } from "@mantine/core";
import { useNavigate } from "react-router-dom"
import { formatChapterName, formatLastUpdate } from "../../utils/format";
import { Volume } from "../../types/volume";

interface VolumeModalProps {
  opened: boolean
  close: () => void
  volume: Volume
}

export function VolumeModal({ volume, opened, close }: VolumeModalProps) {
  const useStyles = createStyles((theme, _params, getRef) => ({
    volumeContainer: {
      display: 'flex',
      gap: 24
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
      marginTop: 16
    },

    volumeNumber: {
      margin: 0,
      lineHeight: 'normal',
    }
  }))

  const { classes } = useStyles()
	const navigate = useNavigate();

  function navigateToChapterPage(chapter: string) {
    navigate(`${chapter}`)
  }

  return (
    <Modal opened={opened} onClose={close} centered size="lg"  withCloseButton={false}>
      <div className={classes.volumeContainer}>
        <img width={250} src={volume.coverUrl} alt="cover" />

        <div className={classes.volumeData}>
          <h2 className={classes.volumeNumber}>Volume #{volume.number}</h2>
          <small>Last update: {formatLastUpdate(volume.lastUpdate)}</small>
          
          <div className={classes.chapters}>
            {volume.chapters.map(chapter => (
              <Button display="block" fullWidth onClick={() => navigateToChapterPage(chapter)}>
                {formatChapterName(chapter)}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}