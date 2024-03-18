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
            birthDate: Yup.date().max(new Date(), "Birth Date cannot exceed the current date").required("Birth Date is required"),
            biography: Yup.string().min(30, "Biography should be minimum of 30 characters").required("Biography cannot be empty"),
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
            <form className="form" onSubmit={formik.handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name ?
                    formik.errors.name : ""}
                </div>
                <div>
                    <input
                        type="date"
                        name="birthDate"
                        placeholder="Birth Date"
                        value={formik.values.birthDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.birthDate && formik.errors.birthDate ?
                    formik.errors.birthDate : ""}
                </div>
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

                <button className="btn-add" type="submit">Add Author</button>
            </form>
        </div>
    )
}