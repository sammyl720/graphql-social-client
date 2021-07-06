import CustomLink from "./design/CustomLink"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import Context from "../context/general/Context"
import { memoryToken } from "../memory"

const Navbar = () => {
  const { logout, loadMe, me } = useContext(Context)
  useEffect(() => {
    if(memoryToken()){
      loadMe()
    }
  }, [memoryToken(), process.browser])
  const router = useRouter()
  return (
    <header className='w-screen flex items-center z-50 bg-indigo-900 p-4 px-8 lg:px-32 justify-between'>
      <CustomLink current='/' href='/' title={<img className='w-12' src="/imgs/connections.png" alt="Logo" />} />
      <nav>
        {memoryToken() ? (
          <div className='flex items-center'>
            <CustomLink href='/profile' title='Profile' {...(me?.profile_img && { img: me.profile_img.public_id})} current={router.route} />
            <span className='cursor-pointer text-blue-300' onClick={logout}>Logout</span>
          </div>
        ) : (
          <>
            <CustomLink href='/login' title='Login' current={router.route} />
          </>
        )}
      </nav>
    </header>
  )
}
export default Navbar