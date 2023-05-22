import React from 'react'
import { useState , useEffect} from 'react';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import {Add} from '@mui/icons-material';

const IssuedBooks = (props) => {
    const [loading, setLoading] = useState(true)
    const [issuedBooks, setIssuedBooks] = useState([]);
    const host = "http://localhost:5000";
    
    const getIssuedBooks = async () => {
        const response = await fetch(`${host}/books/issuedBooks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response);
        const json = await response.json();
        setIssuedBooks(json);
        setLoading(false);
    }

    let navigate = useNavigate();

    useEffect(() => {
        if ((localStorage.getItem('token') || localStorage.getItem('admin-token'))) {
            getIssuedBooks();
        }
        else {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, [])



  return (
    <div>
        
        <h1 className={`${props.mode === 'dark' ? 'text-white' : 'text-black'} text-center text-2xl md:text-4xl font-serif mb-4`}>Issued Books</h1>
            <div className="relative overflow-x-auto mx-2">
                <table className={`${props.mode === 'dark' ? 'text-gray-400' : "text-gray-500"} w-full text-xs md:text-sm text-center `}>
                    <thead className={`${props.mode === 'dark' ? 'text-gray-400 bg-gray-700' : "text-gray-700  bg-gray-200"} uppercase md:text-sm text-xs `}>
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                S NO.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name of book
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Author
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Book ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Issued Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Return Date
                            </th>   
                            <th scope="col" className="px-6 py-3">
                                Fine
                            </th>   



                            
                        </tr>
                    </thead>
                    <tbody>
                        {issuedBooks.map((book, index) => {
                            return (
                                <tr key={book._id} className={`${props.mode === 'dark' ? 'border-gray-700 bg-gray-800' : "bg-white"} border-b`}>
                                    <td  className="px-6 py-4">
                                        {index + 1}
                                    </td>
                                    <th scope="row" className={`${props.mode === 'dark' ? 'text-white ' : "text-gray-900"} px-6 py-4 font-medium whitespace-nowrap`}>
                                        {book.bookName}
                                    </th>
                                    <td className="px-6 py-4">
                                        {book.author}
                                    </td>
                                    <td className="px-6 py-4">
                                        {book._id}
                                    </td >
                                    <td className="px-6 py-4">
                                        {book.issuedDate}
                                    </td >
                                    <td className="px-6 py-4">
                                        {book.returnDate}
                                    </td >
                                    <td className="px-6 py-4">
                                        {book.fine}
                                    </td >




                                    <td className="px-6 py-4">
                                        <button className="bg-green-500 hover:bg-green-700 mx-auto text-white text-center py-2 px-2 rounded flex items-center"  >
                                            <span>Add </span>  <Add fontSize='small' />
                                        </button>
                                    </td >
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {loading && <Spinner/>}
            </div>
        
    </div>
  )
}

export default IssuedBooks
