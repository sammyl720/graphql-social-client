import { GetServerSideProps } from "next"
import { useContext, useEffect } from "react"
import Context from "../context/general/Context"
import Navbar from "./Navbar"
import Toast from "./design/Toast"
function Layout ({ children }) {
  const { setToken, error, message, setError, setMessage } = useContext(Context)
  return (
    <div className='backdrop'>
      <Navbar />
      {error && (
        <Toast message={error} type='error' onLeave={() => setError(null) } />
      )}
      {message && (
        <Toast message={message} type='success' onLeave={() => setMessage(null) } />
      )}
      <main className='p-4 mt-14 h-full w-screen xl:max-w-2xl mx-auto'>

        {children}
      </main>
    </div>
  )
}


export default Layout
