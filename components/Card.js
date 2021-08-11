import Image from 'next/image'
import { useEffect, useState } from 'react'

import styles from '../styles/Card.module.css'

export default function Card({ id, image, title, rating, date }) {
  const initialState = () => window.localStorage.getItem('starred') || false

  const [starred, setStarred] = useState(false)
  const [starredItems, setStarredItems] = useState([])

  useEffect(() => {
    return window.localStorage.setItem(
      'starredItems',
      JSON.stringify(starredItems)
    )
  }, [starredItems])

  const handleStarred = () => {
    setStarred(!starred)
  }

  return (
    <div className={styles.card} key={id}>
      <Image
        src={`https://image.tmdb.org/t/p/w400/${image}`}
        alt={`${title} poster`}
        width={400}
        height={600}
        layout='intrinsic'
      />
      <div className={starred ? styles.textStarred : styles.text}>
        <h2>{title}</h2>
        <a
          href={`https://www.themoviedb.org/movie/${id}`}
          target='_blank'
          rel='noreferrer'
        >
          View on TMDB &gt;
        </a>
        <p>Rating: {rating}</p>
        <p>Release data: {date.slice(0, 4)}</p>
        <button className={styles.star} onClick={handleStarred}>
          {starred ? '★' : '☆'}
        </button>
      </div>
    </div>
  )
}
