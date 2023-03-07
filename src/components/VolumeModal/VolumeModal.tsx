import { Button, Modal, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom"
import { formatChapterName, formatLastUpdate } from "../../utils/format";
import { Volume } from "../../types/volume";
import { useStyles } from "./styles";
import { useMediaQuery } from "@mantine/hooks";

interface VolumeModalProps {
  opened: boolean
  close: () => void
  volume: Volume
}

export function VolumeModal({ volume, opened, close }: VolumeModalProps) {
  const { classes } = useStyles()
	const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 50em)");
  
  function navigateToChapterPage(chapter: string) {
    navigate(`${chapter}`)
  }

  return (
    <Modal
      opened={opened}
      onClose={close}
      centered
      size="lg"
      withCloseButton={isMobile}
      fullScreen={isMobile}
    >
      <div className={classes.volumeContainer}>
        <img width={250} src={volume.coverUrl} alt="cover" style={{ margin: "0 auto" }} />

        <div className={classes.volumeData}>
          <Title order={2} m={0} lh="normal" ta="center">Volume #{volume.number}</Title>
          <small style={{ textAlign: 'center' }}>Last update: {formatLastUpdate(volume.lastUpdate)}</small>
          
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