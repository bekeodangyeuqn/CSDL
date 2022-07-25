import React, { useEffect, useState } from 'react';
import { getUser, updateUser } from '../../axios_api/user';
import { toast } from 'react-toastify';

const UserForm = ({ user, onCancel }) => {
    const [values, setValues] = useState({});
    const getUserDetail = async () => {
        try {
            const response = await getUser(user.userId);
            setValues(response[0])
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUserDetail();
    }, [])
    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log({ values })
            const res = await updateUser(values);
            toast.success('Update successFully!');
            console.log(res)
        } catch (error) {
            toast.error('Update failed!');

        }
        onCancel();
    }
    const setField = (fieldName, value) => {
        values[fieldName] = value;
        setValues(values);
    }
    return (
        <div className="user-form relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">

                    <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <form onSubmit={onSubmit} >
                                <div className="shadow overflow-hidden sm:rounded-md">
                                    <div className="px-4 py-5 bg-white sm:p-6">
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First name</label>
                                                <input value={values.firstName} onChange={event => setField('firstName', event.target.value)} type="text" name="first-name" id="first-name" autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last name</label>
                                                <input value={values.lastName} onChange={event => setField('lastName', event.target.value)} type="text" name="last-name" id="last-name" autoComplete="family-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                            </div>

                                        </div>
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">Email</label>
                                                <input value={values.email} onChange={event => setField('email', event.target.value)} type="text" name="first-name" id="first-name" autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Address</label>
                                                <input value={values.address} onChange={event => setField('address', event.target.value)} type="text" name="last-name" id="last-name" autoComplete="family-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                            </div>

                                        </div>
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                                <input value={values.tel} onChange={event => setField('tel', event.target.value)} type="text" name="first-name" id="first-name" autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                            </div>

                                        </div>
                                    </div>
                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                                        <button onClick={onCancel} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserForm;