import React from 'react'
import { useState } from 'react';

const AddBooks = (props) => {
    const [bookName, setbookName] = useState("");
    const [author, setauthor] = useState("");
    const [bookID, setBookID] = useState("");


    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const host = "http://localhost:5000";
            const res = await fetch(`${host}/admin/addbook`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    bookName: bookName,
                    author: author,
                    bookID: bookID,
                }),
            });
            props.setProgress(30);
            let resJson = await res.json();

            props.setProgress(100);
            if (res.status === 200) {
                setbookName("");
                setauthor("");
                setBookID("");
            } else {
                console.log(resJson.error);
            }
        } catch (err) {
            console.log(err);
        }
        props.showAlert("Book added successfully!", "bg-green-200", "text-green-600", "Success")
    };



  return (
    <div>
        <div className=" flex justify-center items-center">
                <div className=" mx-4 w-full max-w-xl m-auto">
                    <div className={`${props.mode==='dark'? 'text-white' : 'text-black'} text-center text-4xl font-bold mb-4 `}>Add Book</div>
                    <form className={`${props.mode==='dark'? 'bg-[#322F3D] text-white' : 'bg-white text-gray-700'} shadow-md rounded p-3 md:p-6 mb-4`}  onSubmit={handleSubmit} autoComplete="on">
                        <div className="flex justify-between flex-wrap">
                            <div className="w-2/5 mb-5  space-y-2">
                                <label className="details">Book Name</label>
                                <input type="text" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder="Book name" name="bookName" required value={bookName} onChange={(e) => setbookName(e.target.value)} />
                            </div>
                            <div className="w-2/5 mb-5  space-y-2">
                                <label className="details">Author Name</label>
                                <input type="text" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder="Author name" name="author" required value={author} onChange={(e) => setauthor(e.target.value)} />
                            </div>
                            <div className="w-2/5 mb-5 space-y-2">
                                <label value="state" className="details">Book ID</label>
                                <input type="text" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id="state" placeholder='Enter BookID' name="BookID" value={bookID} onChange={(e) => setBookID(e.target.value)} />
                            </div>
                        </div>
                        <div className="button">
                            <input disabled={bookID.length < 3 || bookName.length < 3 ||author.length < 3  } className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-60 disabled:cursor-not-allowed" type="submit" value="Add Book" />
                        </div>
                    </form>
                </div>
            </div>
      
    </div>
  )
}

export default AddBooks
