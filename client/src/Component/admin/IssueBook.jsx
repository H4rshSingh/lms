import React from 'react'
import { useState } from 'react';

const IssueBook = (props) => {

    const [bookID, setBookID] = useState("");
    const [issuedDate, setIssuedDate] = useState("");
    const [name, setname] = useState("");
    const [email, setemail] = useState("");


    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const host = "http://localhost:5000";
            const res = await fetch(`${host}/admin/addbook`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    issuedDate: issuedDate,
                    name: name,
                    email: email,
                    available: false
                }),
            });
            props.setProgress(30);
            let resJson = await res.json();

            props.setProgress(100);
            if (res.status === 200) {
                setIssuedDate("");
                setname("");
                setemail("");
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
                    <div className={`${props.mode === 'dark' ? 'text-white' : 'text-black'} text-center text-4xl font-bold mb-4 `}>Issue new Book</div>
                    <form className={`${props.mode === 'dark' ? 'bg-[#322F3D] text-white' : 'bg-white text-gray-700'} shadow-md rounded p-3 md:p-6 mb-4`} onSubmit={handleSubmit} autoComplete="on">
                        <div className="flex justify-between flex-wrap">
                            <div className="w-2/5 mb-5  space-y-2">
                                <label className="details">BookID</label>
                                <input type="text" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder="Book ID" name="email" required value={bookID} onChange={(e) => setBookID(e.target.value)} />
                            </div>
                            <div className="w-2/5 mb-5  space-y-2">
                                <label className="details">Issue Date</label>
                                <input type="date" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder="Issue Date" name="issueDate" required value={issuedDate} onChange={(e) => setIssuedDate(e.target.value)} />
                            </div>
                            <div className="w-2/5 mb-5  space-y-2">
                                <label className="details">Student Name</label>
                                <input type="text" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder="Student name" name="name" required value={name} onChange={(e) => setname(e.target.value)} />
                            </div>
                            <div className="w-2/5 mb-5 space-y-2">
                                <label value="state" className="details">Student Email</label>
                                <input type="text" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id="state" placeholder='Student email' name="email" value={email} onChange={(e) => setemail(e.target.value)} />
                            </div>
                        </div>
                        <div className="button">
                            <input disabled={email.length < 3 || name.length < 3} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-60 disabled:cursor-not-allowed" type="submit" value="Issue Book" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default IssueBook
