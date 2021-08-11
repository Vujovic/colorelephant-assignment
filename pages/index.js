import { useState } from 'react'
import useSWR from 'swr'

import Page from '../components/Page'

import styles from '../styles/Home.module.css'

const fetcher = url => fetch(url).then(r => r.json())

export default function Home() {
  const [count, setCount] = useState(1)
  const [order, setOrder] = useState('desc')

  const handleAscending = () => {
    setOrder('asc')
  }

  const handleDescending = () => {
    setOrder('desc')
  }

  const pages = []

  for (let i = 1; i <= count; i++) {
    pages.push(<Page index={i} key={i} order={order} />)
  }

  return (
    <div>
      <h1 className={styles.title}>Color Elephant - TMDB</h1>
      <div className={styles.buttons}>
        <p>Sort by:</p>
        <button onClick={handleDescending}>Descending</button>
        <button onClick={handleAscending}>Ascending</button>
      </div>
      {pages}
      <button className={styles.loadMore} onClick={() => setCount(count + 1)}>
        Load More
      </button>
    </div>
  )
}
