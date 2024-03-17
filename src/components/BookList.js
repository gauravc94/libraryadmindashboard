import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from './global'

export function BookList() {
    const [bookList, setBookList] = useState([])
    const navigate = useNavigate()

    const getBooks = () => {
        fetch(`${API}/books`, {
            method: "GET"
        })
            .then((res) => res.json())
            .then((bks) => setBookList(bks))
    }

    useEffect(() => getBooks(), [])
    
    return (
        <div>
            <h1>BookList</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>ISBN</th>
                        <th>Publication Date</th>
                    </tr>
                </thead>
                <tbody>
                    {bookList.map((bk) => (
                        <tr key={bk.id}>
                            <td>{bk.title}</td>
                            <td>{bk.author}</td>
                            <td>{bk.isbn}</td>
                            <td>{bk.publicationDate}</td>
                            <td>
                                <button onClick={() => navigate(`/books/edit/${bk.id}`)}>Edit</button>
                                <button onClick={() => {
                                    fetch(`${API}/books/${bk.id}`, {
                                        method: "DELETE"
                                    })
                                    .then(() => getBooks())
                                }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}