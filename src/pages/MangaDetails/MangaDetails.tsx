import { useQuery } from "@apollo/client"
import { useDisclosure } from '@mantine/hooks';
import { Badge, Button, Card, Container, Grid, Rating, Text, Tabs, TypographyStylesProvider, createStyles, Title, MantineColor, Box, Paper, SegmentedControl, Image, MediaQuery } from "@mantine/core";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VolumeModal } from "../../components/VolumeModal/VolumeModal";
import { GET_MANGA_DETAILS } from "../../graphql/queries/getMangaDetails";
import { GET_VOLUMES } from "../../graphql/queries/getVolumes";
import { ContentLoader } from "../../components/ContentLoader/ContentLoader";
import { Volume } from "../../types/volume";
import { useStyles } from "./styles";

const API_SCORE_SCALE = 100

export function MangaDetails() {
	const [orderBy, setOrderBy] = useState('number')
	const [selectedVolume, setSelectedVolume] = useState<Volume >({
		chapters: [],
		coverUrl: '',
		lastUpdate: '0000-01-01',
		number: 0
	})

	const [opened, { open, close }] = useDisclosure(false)
	const navigate = useNavigate();
	const { id } = useParams();

  const { classes } = useStyles();

	const { loading: mangaDetailsLoading, error: mangaDetailsError, data: mangaDetailsData } = useQuery(
		GET_MANGA_DETAILS,
		{
			variables: {
				mediaId: Number(id)
			}
		}
	);

	const { loading: volumesLoading, error: volumesError, data: volumesData } = useQuery(
		GET_VOLUMES,
		{
			variables: {
				mangaId: Number(id)
			},
			context: {clientName: 'hygraph'}
		}
	);

	function calculatesScore(score: number) {
		const scaleFiveScore = (score * 5) / API_SCORE_SCALE
		return scaleFiveScore
	}

	function badgeColor(status: string): MantineColor {
		switch (status) {
			case "CANCELLED":
				return "red"
			case "FINISHED":
				return "green"
			case "RELEASING":
				return "indigo"
			default:
				return "gray"
		}
	}
	
	if (mangaDetailsLoading || volumesLoading) {
		return <div>
			<ContentLoader />
		</div>
	};

  if (mangaDetailsError || volumesError) return <p>Error</p>;

	return (
		<>
			<Container mt={48} mb={48}>
			<MediaQuery smallerThan="md" styles={{ flexDirection: 'column' }}>
				<Card className={classes.detailsContainer}>
					<MediaQuery smallerThan="md" styles={{ alignItems: 'center' }}>
						<div className={classes.leftColumn}>
							<img src={mangaDetailsData.Media.coverImage.large} alt="cover"/>
							<Button onClick={() => navigate(`1`)} disabled={volumesData.volumes.length === 0}>{volumesData.volumes.length === 0 ? 'AVAILABLE SOON' : 'START READING'}</Button>
						</div>
					</MediaQuery>

					<div>
						<Title order={1}>{mangaDetailsData.Media.title.english ? mangaDetailsData.Media.title.english : mangaDetailsData.Media.title.romaji}</Title>
						
						<div className={classes.genreContainer}>
							<strong>Status: </strong>
							<div className={classes.badgesContainer}>
								<Badge color={badgeColor(mangaDetailsData.Media.status)} size="sm">{mangaDetailsData.Media.status}</Badge>
							</div>
						</div>

						<div className={classes.genreContainer}>
							<strong>Genres: </strong>
							<div className={classes.badgesContainer}>
								{mangaDetailsData.Media.genres.map((genre: string) => (
									<Badge key={genre} color="orange" size="sm">{genre}</Badge>
								))}
							</div>
						</div>

						<Text>
							<strong>Author: </strong>
							{mangaDetailsData.Media.staff.nodes[0].name.full}
						</Text>

						<div className={classes.ratingContainer}>
							<strong>Rating:</strong>
							<Rating defaultValue={calculatesScore(mangaDetailsData.Media.meanScore)} readOnly fractions={2}></Rating>
						</div>

						<TypographyStylesProvider className={classes.descriptionContainer}>
							<div dangerouslySetInnerHTML={{ __html: `${mangaDetailsData.Media.description}` }} />
						</TypographyStylesProvider>
					</div>

				</Card>
			</MediaQuery>
				
				<Card className={classes.volumesContainer}>
					<Tabs defaultValue="volumes">
						<Tabs.List>
							<Tabs.Tab value="volumes">Volumes</Tabs.Tab>
							{/* <Tabs.Tab value="second">Chapters</Tabs.Tab> */}

							<SegmentedControl
								value={orderBy}
								onChange={(value) => setOrderBy(value!)}
								data={[
									{ value: 'number', label: 'Number #' },
									{ value: 'recently', label: 'Recently updated' },
								]}
								ml="auto"
								disabled={volumesData.volumes.length === 0 }
							/>
						</Tabs.List>

						<Tabs.Panel value="volumes" pt="xs">
							{volumesData.volumes.length === 0 
								? (
									<Paper shadow="xs" p="md">
										This manga will be available soon.
									</Paper>
								)
								: (
									<Grid mt={16}>
										{volumesData.volumes.map((volume: Volume) => (
											<Grid.Col
												key={volume.number} 
												xs={6} sm={4} md={3} 
												onClick={() => {
													setSelectedVolume(volume)
													open()
												}}
											>
												<img src={volume.coverUrl} alt="cover" className={classes.volumeCover}/>
												<Text align="center" fw={700} mt={8}>Volume {volume.number}</Text>
											</Grid.Col>
										))}
									</Grid>
								)
							}
							
						</Tabs.Panel>
					</Tabs>
				</Card>
			</Container>
			
			{selectedVolume
				? (
					<VolumeModal
						opened={opened}
						close={close}
						volume={selectedVolume}
					/>
				) : null
			}
		</>
	)
		
}