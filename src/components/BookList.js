import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from './global'
import axios from 'axios'

export function BookList() {
    const [bookList, setBookList] = useState([])
    const navigate = useNavigate()

    const getBooks = () => {
        axios.get(`${API}/books`)
            .then((res) => setBookList(res.data))
            .catch(err => console.error("error fetching Books:", err))
    }

    useEffect(() => getBooks(), [])

    // console.log(bookList)
    
    return (
        <div>
            <h1>Books</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>ISBN</th>
                        <th>Publication Date (YYYY-MM-DD)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookList.map((bk) => (
                        <tr key={bk.id}>
                            <td>{bk.title}</td>
                            <td>{bk.author}</td>
                            <td>{bk.isbn}</td>
                            <td>{bk.publicationDate}</td>
                            <td className="action-cell">
                                <button className="btn-edit" onClick={() => navigate(`/books/edit/${bk.id}`)}>EDIT</button>
                                <button className="btn-del" onClick={() => {
                                    axios.delete(`${API}/books/${bk.id}`)
                                        .then(() => getBooks())
                                        .catch(err => console.error("error deleting Book:", err))
                                }}>DEL</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}