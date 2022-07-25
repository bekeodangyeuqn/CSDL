import React, { useEffect, useState } from "react";
import UserSearachBar from "../../components/UserSearchBar";
import Modal from "../../components/ModalConfirm";
import UserForm from "../../components/UserForm";
import { getAllUser, deleteUser } from "../../axios_api/user";
import { toast } from 'react-toastify';

function User({ users }) {
  const [userList, setUserList] = useState([]);
  const [modal, setModal] = useState({ show: false });
  const [modalEdit, setModalEdit] = useState({ show: false });
  const queryAllAccount = async () => {
    try {
      const users = await getAllUser();
      console.log({ users });
      setUserList(users);

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    queryAllAccount();
    toast()
  }, []);

  const onEditUser = (user) => {
    console.log(user)
    setModalEdit({
      show: true,
      user: user,
    })
  }

  const onDeleteUser = async (id) => {
    try {
      const res = await deleteUser(id);
      queryAllAccount();
      toast.success(`Delete User ${id} Successfully!`)
    } catch (error) {
      toast.error('Delete User Failed');

    }
    hideModal();

  }

  const hideEdit = () => {
    setModalEdit({ show: false })
  }

  const hideModal = () => {
    setModal({ show: false });
  }
  const onShowDeleteModal = (id) => {
    setModal({
      show: true,
      content: `Are you sure to delete user ${id}`,
      onConfirm: () => onDeleteUser(id),
    })
  }
  return (
    <div className="px-8">
      <p className="text-xl font-extrabold">Users</p>
      <div className="flex justify-center ">
        <UserSearachBar></UserSearachBar>
      </div>
      <div>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              userList.map(item => (
                <tr key={item.userId}>
                  <td className="text-center">{item.userId}</td>
                  <td className="py-2 text-center w-14 h-14">
                    <img src={item.imgUrl}></img>
                  </td>
                  <td className="text-center">{item.firstName + ' ' + item.lastName}</td>
                  <td className="text-center">{item.gender}</td>
                  <td className="text-center">{item.address}</td>
                  <td className="text-center">{item.tel}</td>
                  <td className="text-center">{item.email}</td>
                  <td className="text-center">
                    <button onClick={() => onEditUser(item)} className="px-2 py-1 mr-2 rounded bg-green-500 w-20">
                      Edit
                    </button>
                    <button onClick={() => onShowDeleteModal(item.userId)} className="px-2 py-1 rounded bg-red-400 w-20">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      {modal.show && <Modal onCancel={hideModal} title="Delete User" onConfirm={modal.onConfirm} content={modal.content} />}
      {modalEdit.show && <UserForm user={modalEdit.user} onCancel={hideEdit} />}
    </div>
  );
}

export default User;
