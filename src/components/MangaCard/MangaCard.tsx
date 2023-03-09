import { Card, Text } from "@mantine/core"
import { useStyles } from "./styles"
import { Link } from "react-router-dom"

interface MangaCardProps {
  id: number
  coverImage: string
  title: string
  author: string
}

export function MangaCard({ id, coverImage, title, author }: MangaCardProps) {
  const { classes } = useStyles();

	return (
    <Card withBorder className={classes.card}>
      <Link to={`manga/${id}`}>
        <img src={coverImage} width={200} height={300} />
      </Link>
  
      <Link to={`manga/${id}`} style={{ textDecoration: 'none' }}>
        <Text color="orange" size={16} mt={8} className={classes.title}>{title}</Text>
      </Link>
      
      <Text size={14}>{author}</Text>
    </Card>
	)
}