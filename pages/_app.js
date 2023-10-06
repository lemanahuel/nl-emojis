import '../styles/globals.css'
const { NEXT_PUBLIC_URL = 'http://127.0.0.1:3000/' } = process?.env

function Page ({ Component, pageProps }) {
  return <Component {...pageProps} />
}

// This gets called on every request
Page.getInitialProps = async ({ ctx }) => {
  const { req } = ctx
  const host = NEXT_PUBLIC_URL
  let emojis = []
  if (!host.includes('/api')) {
    try {
      const res = await fetch(`${host}api/emojis`)
      emojis = await res.json()
    } catch (err) {
      console.error('err-getInitialProps', err)
    }
  }
  return { pageProps: { emojis } }
}

export default Page