import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from './global'
import { useFormik } from 'formik'
import * as Yup from 'yup'

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
        validationSchema: Yup.object({
            name: Yup.string().required("Name cannot be empty"),
            birthDate: Yup.date().max(new Date(), "Birth Date cannot exceed the current date").required("Birth Date is required"),
            biography: Yup.string().min(30, "Biography should be minimum of 30 characters").required("Biography cannot be empty"),
        }),
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
            <h1>Edit Author</h1>
            <form className="form" onSubmit={formik.handleSubmit}>
                <label htmlFor="name">Name</label>
                <div>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name ?
                    formik.errors.name : ""}
                </div>

                <label htmlFor="birthDate">Birth Date</label>
                <div>
                    <input
                        id="birthDate"
                        type="date"
                        name="birthDate"
                        value={formik.values.birthDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.birthDate && formik.errors.birthDate ?
                    formik.errors.birthDate : ""}
                </div>
                
                <label htmlFor="biography">Biography</label>
                <div>
                    <textarea
                        name="biography"
                        placeholder="Biography"
                        value={formik.values.biography}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                    </textarea>
                    {formik.touched.biography && formik.errors.biography ?
                    formik.errors.biography : ""}
                </div>

                <button className="btn-save" type="submit">SAVE</button>
            </form>
        </div>
    )
}