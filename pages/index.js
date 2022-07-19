import { useContext } from "react"
import { userContext } from "../contexts/userProvider"

export default function Home() {
  const { user } = useContext(userContext)
  return (
    <div className='container mx-auto px-8'>
      <p className='text-xl my-4 ml-2'>Hello, {user ? user : 'Guess'}</p>
      <div className="flex flex-wrap">
        <div className="basis-1/2 p-2 rounded bg-green-100">
          <p className="text-center">Top Book</p>
          <div>
            <div className="flex justify-between">
              <p>Đại số tuyến tính</p>
              <p className="font-bold">12 times</p>
            </div>
            <div className="flex justify-between">
              <p>Đại số tuyến tính</p>
              <p className="font-bold">12 times</p>
            </div>
            <div className="flex justify-between">
              <p>Đại số tuyến tính</p>
              <p className="font-bold">12 times</p>
            </div>
            <div className="flex justify-between">
              <p>Đại số tuyến tính</p>
              <p className="font-bold">12 times</p>
            </div>
            <div className="flex justify-between">
              <p>Đại số tuyến tính</p>
              <p className="font-bold">12 times</p>
            </div>
          </div>
        </div>
        <div className="basis-1/2 p-2 rounded bg-orange-100">
          <p className="text-center">Top User</p>
          <div>
            <div className="flex justify-between">
              <p>Hà Quốc Thắng</p>
              <p className="font-bold">12 times</p>
            </div>
            <div className="flex justify-between">
              <p>Hà Quốc Thắng</p>
              <p className="font-bold">12 times</p>
            </div>
            <div className="flex justify-between">
              <p>Hà Quốc Thắng</p>
              <p className="font-bold">12 times</p>
            </div>
            <div className="flex justify-between">
              <p>Hà Quốc Thắng</p>
              <p className="font-bold">12 times</p>
            </div>
            <div className="flex justify-between">
              <p>Hà Quốc Thắng</p>
              <p className="font-bold">12 times</p>
            </div>
          </div>
        </div>

        <div className="basis-1/2 p-2 rounded bg-sky-100">
          <p>Thông tin về thư viện</p>
          <div>
            <p>
              Tổng số sách trong thư viện: <span className="font-bold">100</span>
            </p>
            <p>
              Tổng số sách đang được mượn: <span className="font-bold">50</span>
            </p>
          </div>
        </div>
        <div className="basis-1/2 p-2 rounded bg-violet-100">
          <p>Thông tin về giao dịch mượn sách</p>
          <div>
            <p>
              Tổng số người đang mượn sách: <span className="font-bold">100</span>
            </p>
            <p>
              Tổng số giao dịch mượn sách đã thực hiện: <span className="font-bold">50</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
