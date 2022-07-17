import React from 'react'
import UserSearachBar from '../../components/UserSearchBar'

function index() {
  return (
    <div className='px-8'>
      <p className='text-xl font-extrabold'>Users</p>
      <div className='flex justify-center '>
        <UserSearachBar></UserSearachBar>
      </div>
      <div>
        <table class="table-auto w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Username</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='py-2 text-center w-14 h-14'  >
                <img src='https://i1.sndcdn.com/artworks-IMgb2nBVhF2LjT2Z-0Eb15A-t500x500.jpg'></img>
              </td>
              <td className='text-center'>Hà Quốc Thắng</td>
              <td className='text-center'>thangws</td>
              <td className='text-center'>Male</td>
              <td className='text-center'>Trương Định, Hai Bà Trưng, Hà Nội</td>
              <td className='text-center'>0123456789</td>
              <td className='text-center'>thangws@mail.com</td>
              <td className='text-center'>
                <button className='px-2 py-1 mr-2 rounded bg-green-500 w-20'>Edit</button>
                <button className='px-2 py-1 rounded bg-red-400 w-20'>Delete</button>
              </td>
            </tr>
            <tr>
              <td className='py-2 text-center w-14 h-14'  >
                <img src='https://i1.sndcdn.com/artworks-IMgb2nBVhF2LjT2Z-0Eb15A-t500x500.jpg'></img>
              </td>
              <td className='text-center'>Hà Quốc Thắng</td>
              <td className='text-center'>thangws</td>
              <td className='text-center'>Male</td>
              <td className='text-center'>Trương Định, Hai Bà Trưng, Hà Nội</td>
              <td className='text-center'>0123456789</td>
              <td className='text-center'>thangws@mail.com</td>
              <td className='text-center'>
                <button className='px-2 py-1 mr-2 rounded bg-green-500 w-20'>Edit</button>
                <button className='px-2 py-1 rounded bg-red-400 w-20'>Delete</button>
              </td>
            </tr>
            <tr>
              <td className='py-2 text-center w-14 h-14'  >
                <img src='https://i1.sndcdn.com/artworks-IMgb2nBVhF2LjT2Z-0Eb15A-t500x500.jpg'></img>
              </td>
              <td className='text-center'>Hà Quốc Thắng</td>
              <td className='text-center'>thangws</td>
              <td className='text-center'>Male</td>
              <td className='text-center'>Trương Định, Hai Bà Trưng, Hà Nội</td>
              <td className='text-center'>0123456789</td>
              <td className='text-center'>thangws@mail.com</td>
              <td className='text-center'>
                <button className='px-2 py-1 mr-2 rounded bg-green-500 w-20'>Edit</button>
                <button className='px-2 py-1 rounded bg-red-400 w-20'>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default index