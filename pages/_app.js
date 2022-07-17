import '../styles/globals.css'
import Layout from '../components/Layout'
import UserProvider from '../contexts/userProvider'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>

  )
}

export default MyApp
