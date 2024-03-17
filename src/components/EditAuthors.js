import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from './global'
import { useFormik } from 'formik'

export function EditAuthors() {
    const { authorId } = useParams()
    const [ author, setAuthor ] = useState()

    useEffect(() => {
        axios.get(`${API}/authors/${authorId}`)
            .then((res) => setAuthor(res.data))
            .catch(err => console.error("Error fetching Author:", err))
    }, [])

    // console.log(author)

    return author ? <EditAuthorForm author={author} /> : "Loading..."
}

function EditAuthorForm({ author }) {
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: author.name,
            birthDate: author.birthDate,
            biography: author.biography,
        },
        onSubmit: (values) => {
            // console.log(values)
            axios.put(`${API}/authors/${author.id}`, values, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(() => navigate("/authors"))
                .catch(err => console.error("Error updating Author:", err))
        }
    })

    return (
        <div>
            <h2>Edit Author Form</h2>
            <form className="editAuthor-form" onSubmit={formik.handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ?
                <div>{formik.errors.name}</div> : ""}
                <label htmlFor="birthDate">Birth Date</label>
                <input
                    id="birthDate"
                    type="date"
                    name="birthDate"
                    value={formik.values.birthDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.birthDate && formik.errors.birthDate ?
                <div>{formik.errors.birthDate}</div> : ""}
                <label htmlFor="biography">Biography</label>
                <input
                    id="biography"
                    type="text"
                    name="biography"
                    value={formik.values.biography}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.biography && formik.errors.biography ?
                <div>{formik.errors.biography}</div> : ""}
                <button type="submit">SAVE</button>
            </form>
        </div>
    )
}