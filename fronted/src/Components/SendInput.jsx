import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import Messages from './Messages';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import store from '../redux/store';
import { setMessages } from '../redux/messageSlice';

function SendInput() {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.user);
    const { messages } = useSelector(store => store.message);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:3000/api/v1/message/send/${selectedUser?._id}`, { message }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            dispatch(setMessages([...messages, res?.data?.newMessage]));
            console.log(res);
        } catch (error) {
            console.log(error);
        }
        setMessage("");
    }

    return (
        <form onSubmit={onSubmitHandler} className='px-4 mb-3 w-full'>
            <div className='relative w-full'>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder='Send a message...'
                    className='border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white'
                />
                <button type='submit' className='absolute inset-y-0 end-0 flex items-center pr-4'>
                    <IoSend />
                </button>
            </div>
        </form>
    )
}

export default SendInput;