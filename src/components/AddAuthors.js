import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { API } from './global'

export function AddAuthors() {
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: "",
            birthDate: "",
            biography: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name cannot be empty"),
            birthDate: Yup.date().required("Birth Date is required"),
            biography: Yup.string().min(30).max(400).required("Biography cannot be empty")
        }),
        onSubmit: (values) => {
            // console.log(values)
            axios.post(`${API}/authors/`, values, {
                headers: { 'Content-type': 'application/json'}
            })
                .then(() => navigate("/authors"))
                .catch((err) => console.error("Error adding Author:", err))
        }
    })

    return (
        <div>
            <h1>Add Author</h1>
            <form className="addAuthor-form" onSubmit={formik.handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ?
                <div>{formik.errors.name}</div> : ""}
                <input
                    type="date"
                    name="birthDate"
                    placeholder="Birth Date"
                    value={formik.values.birthDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.birthDate && formik.errors.birthDate ?
                <div>{formik.errors.birthDate}</div> : ""}
                <input
                    type="text"
                    name="biography"
                    placeholder="Biography"
                    value={formik.values.biography}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.biography && formik.errors.biography ?
                <div>{formik.errors.biography}</div> : ""}
                <button type="submit">Add Author</button>
            </form>
        </div>
    )
}