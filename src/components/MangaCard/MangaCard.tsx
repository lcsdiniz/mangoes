import { Card } from "@mantine/core"
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
    <Card className={classes.card}>
      <Link to={`manga/${id}`}>
        <img src={coverImage} width={200} height={300} />
      </Link>
  
      <Link to={`manga/${id}`} className={classes.title}>{title}</Link>
      <span className={classes.author}>{author}</span>
    </Card >
	)
}