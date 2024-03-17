import { useFormik } from 'formik'
import React from 'react'
import { API } from './global'
import { useNavigate } from 'react-router-dom'

export function AddBooks() {
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            title: "",
            author: "",
            isbn: "",
            publicationDate: "",
        },
        onSubmit: (values) => {
            // console.log(values)
            fetch(`${API}/books/`, {
                method: "POST",
                body: JSON.stringify(values),
                headers: { 'Content-Type': 'application/json'}
            })
            .then((res) => res.json())
            .then(() => navigate("/books"))

            // .then((bk) => console.log(bk))
            // .then(() => navigate("/books"))
            // .then(() => resetForm())
        }
    })
    return (
        <div>
            <h1>Add Books</h1>
            <form onSubmit={formik.handleSubmit}>
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Title" 
                    value={formik.values.title} 
                    onChange={formik.handleChange} 
                />
                {formik.errors.title && <div>{formik.errors.title}</div>}
                <input 
                    type="text" 
                    name="author" 
                    placeholder="Author" 
                    value={formik.values.author} 
                    onChange={formik.handleChange} 
                />
                {formik.errors.author && <div>{formik.errors.author}</div>}
                <input
                    type="text"
                    name="isbn"
                    placeholder="ISBN"
                    value={formik.values.isbn}
                    onChange={formik.handleChange}
                />
                {formik.errors.isbn && <div>{formik.errors.isbn}</div>}
                <input
                    type="date"
                    name="publicationDate"
                    placeholder="Publication Date"
                    value={formik.values.publicationDate}
                    onChange={formik.handleChange}
                />
                {formik.errors.publicationDate && <div>{formik.errors.publicationDate}</div>}
                <button type="submit">Add Book</button>
            </form>
        </div>
    )
}