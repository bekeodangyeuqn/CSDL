import React, { useState } from "react";
import Modal from "react-modal";
import TransactionSearchBar from "../../components/TransactionSearchBar";

Modal.setAppElement("#react-modals");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    minWidth: "300px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function index() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function toggleModal() {
    setIsOpen(!modalIsOpen);
  }
  return (
    <div className="px-8">
      <p className="text-xl font-extrabold">Transactions</p>
      <div className="flex justify-center ">
        <TransactionSearchBar></TransactionSearchBar>
      </div>
      {/* chuyển vào từng item transaction */}
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <div>
          <div className="flex justify-between">
            <p className="font-bold">Book list</p>
            <button
              className="px-2 py-1 mr-2 rounded bg-sky-500 w-20"
              onClick={() => toggleModal()}
            >
              Close
            </button>
          </div>
          <div>
            <p>Đại số tuyến tính</p>
            <p>Vật lý</p>
            <p>Cơ sở dữ liệu</p>
          </div>
        </div>
      </Modal>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Librarian</th>
            <th>Trans date</th>
            <th>Expired date</th>
            <th>Status</th>
            <th>Penalty</th>
            <th>Penalty description</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center">1</td>
            <td className="text-center">thangws</td>
            <td className="text-center">thangwsSTAFF</td>
            <td className="text-center">11/2/2022</td>
            <td className="text-center">11/4/2022</td>
            <td className="text-center">
              <span className="text-yellow-500">On going</span>/
              <span className="text-orange-500">Late</span>/
              <span className="text-green-500">Complete</span>
            </td>
            <td className="text-center">Yes/No</td>
            <td className="text-center">None/Late 2 days</td>
            <td className="text-center">
              <button
                className="px-2 py-1 mr-2 rounded bg-sky-500 w-20"
                onClick={() => toggleModal()}
              >
                View
              </button>
              <button className="px-2 py-1 rounded bg-green-500 w-20">
                Complete
              </button>
            </td>
          </tr>
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
}

export default index;
