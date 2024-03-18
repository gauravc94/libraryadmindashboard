import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API } from './global'
import axios from 'axios'

export function AuthorList() {
    const [authorList, setAuthorList] = useState([])
    const navigate = useNavigate()

    const getAuthors = () => {
        axios.get(`${API}/authors`)
            .then((res) => setAuthorList(res.data))
            .catch((err) => console.error("error fetching Authors", err))
    }

    useEffect(() => getAuthors(), [])

    // console.log(authorList)

    return (
        <div>
            <h1>Authors</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Birth Date (YYYY-MM-DD)</th>
                        <th>Biography</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {authorList.map((athr) => (
                        <tr key={athr.id}>
                            <td>{athr.name}</td>
                            <td>{athr.birthDate}</td>
                            <td>{athr.biography}</td>
                            <td className="action-cell">
                                <button className="btn-edit" onClick={() => navigate(`/authors/edit/${athr.id}`)}>EDIT</button>
                                <button className="btn-del" onClick={() => {
                                    axios.delete(`${API}/authors/${athr.id}`)
                                        .then(() => getAuthors())
                                        .catch((err) => console.error("error deleting Author:", err))
                                }}>DEL</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}