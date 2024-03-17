import { useFormik } from 'formik'
import React from 'react'
import { API } from './global'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import axios from 'axios'

export function AddBooks() {
    const navigate = useNavigate()
    const isbnRegex = /^(?:\d{3}-?\d{1,5}-?\d{1,7}-?\d{1,6}-?[\dX]|\d{1,5}-?\d{1,7}-?\d{1,6}-?[\dX])$/;

    const formik = useFormik({
        initialValues: {
            title: "",
            author: "",
            isbn: "",
            publicationDate: "",
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Title cannot be empty"),
            author: Yup.string().required("Author cannot be empty"),
            isbn: Yup.string().matches(isbnRegex, 'ISBN format is incorrect. Please enter a valid ISBN number. Hyphens are optional but accepted. (e.g., 978-3-16-148410-0)').required("ISBN is required"),
            publicationDate: Yup.date().required("Publication Date is required")
        }),
        onSubmit: (values) => {
            // console.log(values)
            axios.post(`${API}/books/`, values, {
                headers: { 'Content-Type': 'application/json'}
            })
                .then(() => navigate("/books"))
                .catch(err => console.error("Error adding Book:", err))
        }
    })
    return (
        <div>
            <h1>Add Book</h1>
            <form className="addBook-form" onSubmit={formik.handleSubmit}>
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Title" 
                    value={formik.values.title} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.title && formik.errors.title ? 
                <div>{formik.errors.title}</div> : ""}
                <input 
                    type="text" 
                    name="author" 
                    placeholder="Author" 
                    value={formik.values.author} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.author && formik.errors.author ? 
                <div>{formik.errors.author}</div> : ""}
                <input
                    type="text"
                    name="isbn"
                    placeholder="ISBN"
                    value={formik.values.isbn}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.isbn && formik.errors.isbn ? 
                <div>{formik.errors.isbn}</div> : ""}
                <input
                    type="date"
                    name="publicationDate"
                    placeholder="Publication Date"
                    value={formik.values.publicationDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.publicationDate && formik.errors.publicationDate ? 
                <div>{formik.errors.publicationDate}</div> : ""}
                <button type="submit">Add Book</button>
            </form>
        </div>
    )
}