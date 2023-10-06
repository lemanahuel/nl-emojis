import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react'

export default function Home (params) {
  const [list, setList] = React.useState(params.emojis || [])
  const listMap = new Map()
  list.forEach(e => listMap.set(e.group, [].concat(listMap.get(e.group) || [], [e])))
  let EMOJI_FONT_SIZE = 1

  function onClickFilterBy (e, modality) {
    e.preventDefault()
    const newList = list.map(emoji => {
      let hasMatchs = []
      if (modality === emoji.modality) hasMatchs.push(true)
      // if (filterBy.institution === emoji.institution) hasMatchs.push(true)
      emoji.hide = !hasMatchs.length
      return emoji
    })
    setList(newList)
  }

  async function onClickFontSize (e, sign) {
    e.preventDefault()
    try {
      EMOJI_FONT_SIZE += sign === '+' ? .1 : -.1
      styles.emojiItem.fontSize = `${EMOJI_FONT_SIZE}em`
    } catch (err) {
    }
  }

  async function onClickCopy (e, emoji) {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(emoji)
      console.log('Content copied to clipboard')
      /* Resolved - text copied to clipboard successfully */
    } catch (err) {
      console.error('Failed to copy: ', err)
      /* Rejected - text failed to copy to the clipboard */
    }
  }

  const EmojisList = ({ list }) => (
    <div className={styles.emojiContainer}>
      {
        list.map(([g, list]) => {
          return (
            <div className={styles.emojiGroupContainer} key={g}>
              <h2>{g}</h2>
              <ul className={styles.grid}>
                {list.map(emoji => {
                  return (
                    <li className={[styles.card].join(' ')} key={emoji.slug}>
                      <a href="#" target="_blank" rel="noreferrer" className={styles.emojiItem} onClick={e => onClickCopy(e, emoji.character)} >
                        {emoji.character}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })
      }
    </div>
  )

  return (
    <div className={styles.container}>
      <Head>
        <title>Emojity</title>
        <meta name="description" content="Emojis" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <nav className={styles.nav}>
          <h1 className={styles.title}>Emojity</h1>
          <ul>
            <li><a href="#" onClick={e => onClickFontSize(e, '+')}>+</a></li>
            <li><a href="#" onClick={e => onClickFontSize(e, '-')}>-</a></li>
          </ul>
        </nav>
        {/* <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p> */}

        <EmojisList list={Array.from(listMap)} />
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}
