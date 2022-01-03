import type {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import DeletedVods from '~/components/screens/DeletedVods/[streamer]'
import revalidate from '~/constants/revalidate'
import { getDeletedVods } from '~/lib/getDeletedVods'

export async function getStaticPaths() {
  return {
    paths: [{ params: { streamer: 'xqcow' } }],
    fallback: true,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const streamer = context.params?.streamer as string

  const range = 30

  const streamerVideos = await getDeletedVods(streamer, range)
  console.log('scraped')

  if (!streamerVideos.length) {
    return { notFound: true } as const
  }

  return {
    props: {
      videos: streamerVideos,
    },
    revalidate: revalidate.deletedVideos,
  }
}

const DeletedVodsPage: NextPage = ({
  videos,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <DeletedVods videos={videos} />
}

export default DeletedVodsPage
