import useSWR from 'swr'
import Head from 'next/head'
import Image from 'next/image'
import Card from './Card'

import styles from '../styles/Page.module.css'

const fetcher = url => fetch(url).then(r => r.json())

export default function Page({ index, order }) {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/discover/movie?api_key=567e5daa22b7cda90ab12ee130a50a4f&vote_count.gte=1000&sort_by=vote_average.${order}&include_adult=false&page=${index}`,
    fetcher
  )

  if (!data) return <p>Loading...</p>

  return (
    <div>
      <Head>
        <title>ColorElephant Assignment</title>
        <meta name='description' content='TMDB api presentation' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <div className={styles.grid}>
          {data.results.map(movie => (
            <Card
              key={movie.id}
              id={movie.id}
              image={movie.poster_path}
              title={movie.title}
              rating={movie.vote_average}
              date={movie.release_date}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
