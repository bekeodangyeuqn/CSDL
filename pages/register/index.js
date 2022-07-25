import React, { useState } from 'react'
import { useRouter } from 'next/router';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

import formatDate from '../../utils/date'
import {createOneUser} from '../../axios_api/user'

function Register() {

    const router = useRouter();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastname] = useState('');
    const [dob, setDob] = useState(null);
    const [gender, setGender] = useState('M');
    const [tel, setTel] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = async () => {
        const formattedDob = dob ? formatDate(dob) : null
        const userData = { firstName, lastName, dob: formattedDob, gender, tel, address, email, password }

        try {
            const result = await axios.post('http://localhost:3000/api/user', userData)
            console.log(result)
            alert(result.data)
            router.push('/login')
        } catch (error) {
            console.log(error)
            alert(error.response.data)
        }
    }

    return (
        <div className='container mx-auto'>
            <div className='text-center text-xl bold' onClick={()=> dob ? console.log(formatDate(dob)) : ''}>Create New Account</div>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First name</label>
                    <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="First name" required 
                    value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div>
                    <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last name</label>
                    <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="Last name" required 
                    value={lastName} onChange={(e) => setLastname(e.target.value)}/>
                </div>
                <div>
                    <label for="dob" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Date of birth</label>
                    <DatePicker
                        selected={dob}
                        onChange={(date) => setDob(date)}
                        dateFromat='YYYY-MM-dd'
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        placeholder="Date of birth"
                        required
                    />
                </div>
                <div>
                    <label for="gender" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Gender</label>
                    <select type="text" id="gender" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="Gender" required 
                    value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option disabled>Select gender</option>
                        <option value='M'>Male</option>
                        <option value='F'>Female</option>
                    </select>
                </div>
                <div>
                    <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone number</label>
                    <input type="text" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="Phone" required 
                    value={tel} onChange={(e) => setTel(e.target.value)}/>
                </div>
                <div>
                    <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Address</label>
                    <input type="text" id="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="Address" required 
                    value={address} onChange={(e) => setAddress(e.target.value)}/>
                </div>
            </div>
            <div class="mb-6">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="name@lib.com" required 
                    value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div class="mb-6">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="•••••••••" required
                value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className='flex justify-center'>
                <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleClick}>Submit</button>
            </div>
        </div>
    )
}

export default Register