import { useFormik } from 'formik'
import React from 'react'
import { API } from './global'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import axios from 'axios'


export const isbnRegex = /^(?:\d{3}-?\d{1,5}-?\d{1,7}-?\d{1,6}-?[\dX]|\d{1,5}-?\d{1,7}-?\d{1,6}-?[\dX])$/;


export function AddBooks() {
    const navigate = useNavigate()

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
            isbn: Yup.string().min(10, "ISBN must be atleast 10 digits").max(17).matches(isbnRegex, 'Please enter a valid ISBN number. Hyphens are optional but accepted. (e.g., 978-3-16-148410-0)').required("ISBN is required"),
            publicationDate: Yup.date().max(new Date(), "Publication Date cannot exceed the current date").required("Publication Date is required"),
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
            <form className="form form1" onSubmit={formik.handleSubmit}>
                <div>
                    <input 
                        type="text" 
                        name="title" 
                        placeholder="Title" 
                        value={formik.values.title} 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.title && formik.errors.title ? 
                    formik.errors.title : ""}
                </div>
                <div>
                    <input 
                        type="text" 
                        name="author" 
                        placeholder="Author" 
                        value={formik.values.author} 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.author && formik.errors.author ? 
                    formik.errors.author : ""}
                </div>
                <div>
                    <input
                        type="text"
                        name="isbn"
                        placeholder="ISBN"
                        value={formik.values.isbn}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.isbn && formik.errors.isbn ? 
                    formik.errors.isbn : ""}
                </div>
                <div>
                    <input
                        type="date"
                        name="publicationDate"
                        placeholder="Publication Date"
                        value={formik.values.publicationDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.publicationDate && formik.errors.publicationDate ? 
                    formik.errors.publicationDate : ""}
                </div>
                
                <button className="btn-add" type="submit">Add Book</button>
            </form>
        </div>
    )
}