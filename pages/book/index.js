import React from "react";

import BookSeachbar from "../../components/BookSeachbar";

function index() {
  return (
    <div className="px-8">
      <p className="text-xl font-extrabold">Books</p>
      <div className="flex justify-center ">
        <BookSeachbar></BookSeachbar>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Book name</th>
            <th>Genre</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Publish date</th>
            <th>Import date</th>
            <th>Borrowed times</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center">1</td>
            <td className="py-2 text-center w-14 h-14">
              <img src="https://cf.shopee.vn/file/7413a5737b1f8867950437c69921ad67"></img>
            </td>
            <td className="text-center">Đại số tuyến tính</td>
            <td className="text-center">Giáo trình</td>
            <td className="text-center">Unknown</td>
            <td className="text-center">NXB Giáo dục</td>
            <td className="text-center">1/1/2015</td>
            <td className="text-center">3/4/2021</td>
            <td className="text-center">14</td>
            <td className="text-center">21</td>
            <td className="text-center">
              <button className="px-2 py-1 mr-2 rounded bg-green-500 w-20">
                Edit
              </button>
              <button className="px-2 py-1 rounded bg-red-400 w-20">
                Delete
              </button>
            </td>
          </tr>
          <tr>
            <td className="text-center">1</td>
            <td className="py-2 text-center w-14 h-14">
              <img src="https://cf.shopee.vn/file/7413a5737b1f8867950437c69921ad67"></img>
            </td>
            <td className="text-center">Đại số tuyến tính</td>
            <td className="text-center">Giáo trình</td>
            <td className="text-center">Unknown</td>
            <td className="text-center">NXB Giáo dục</td>
            <td className="text-center">1/1/2015</td>
            <td className="text-center">3/4/2021</td>
            <td className="text-center">14</td>
            <td className="text-center">21</td>
            <td className="text-center">
              <button className="px-2 py-1 mr-2 rounded bg-green-500 w-20">
                Edit
              </button>
              <button className="px-2 py-1 rounded bg-red-400 w-20">
                Delete
              </button>
            </td>
          </tr>
          <tr>
            <td className="text-center">1</td>
            <td className="py-2 text-center w-14 h-14">
              <img src="https://cf.shopee.vn/file/7413a5737b1f8867950437c69921ad67"></img>
            </td>
            <td className="text-center">Đại số tuyến tính</td>
            <td className="text-center">Giáo trình</td>
            <td className="text-center">Unknown</td>
            <td className="text-center">NXB Giáo dục</td>
            <td className="text-center">1/1/2015</td>
            <td className="text-center">3/4/2021</td>
            <td className="text-center">14</td>
            <td className="text-center">21</td>
            <td className="text-center">
              <button className="px-2 py-1 mr-2 rounded bg-green-500 w-20">
                Edit
              </button>
              <button className="px-2 py-1 rounded bg-red-400 w-20">
                Delete
              </button>
            </td>
          </tr>
          <tr>
            <td className="text-center">1</td>
            <td className="py-2 text-center w-14 h-14">
              <img src="https://cf.shopee.vn/file/7413a5737b1f8867950437c69921ad67"></img>
            </td>
            <td className="text-center">Đại số tuyến tính</td>
            <td className="text-center">Giáo trình</td>
            <td className="text-center">Unknown</td>
            <td className="text-center">NXB Giáo dục</td>
            <td className="text-center">1/1/2015</td>
            <td className="text-center">3/4/2021</td>
            <td className="text-center">14</td>
            <td className="text-center">21</td>
            <td className="text-center">
              <button className="px-2 py-1 mr-2 rounded bg-green-500 w-20">
                Edit
              </button>
              <button className="px-2 py-1 rounded bg-red-400 w-20">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default index;
