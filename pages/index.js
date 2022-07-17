import { useContext } from "react"
import { userContext } from "../contexts/userProvider"

export default function Home() {
  const {user, setUser} = useContext(userContext)
  return (
    <div>
      <div className='container mx-auto'>
        home page
        {user}
      </div>
    </div>
  )
}
