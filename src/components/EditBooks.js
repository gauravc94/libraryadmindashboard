import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from './global'
import { useFormik } from 'formik'
import axios from 'axios'

export function EditBooks() {
    const { bookId } = useParams()
    const [ book, setBook ] = useState()

    useEffect(() => {
        axios.get(`${API}/books/${bookId}`)
            .then((res) => setBook(res.data))
            .catch(err => console.error("Error fetching Book:", err))
    }, [])

    // console.log(book)

    return book ? <EditBookForm book={book} /> : "Loading..."
}

function EditBookForm({ book }) {
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            publicationDate: book.publicationDate,
        },
        onSubmit: (values) => {
            // console.log(values)
            axios.put(`${API}/books/${book.id}`, values, {
                headers: { 'Content-Type': 'application/json'}
            })
                .then(() => navigate("/books"))
                .catch(err => console.error("Error updating Book:", err))
        }
    })

    return(
        <div>
            <h2>Edit Book Form</h2>
            <form className="editBook-form" onSubmit={formik.handleSubmit}>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.title && formik.errors.title ? 
                <div>{formik.errors.title}</div> : ""}
                <label htmlFor="author">Author</label>
                <input 
                    id="author"
                    type="text" 
                    name="author"
                    value={formik.values.author} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.author && formik.errors.author ? 
                <div>{formik.errors.author}</div> : ""}
                <label htmlFor="isbn">ISBN</label>
                <input
                    id="isbn"
                    type="text"
                    name="isbn"
                    value={formik.values.isbn}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.isbn && formik.errors.isbn ? 
                <div>{formik.errors.isbn}</div> : ""}
                <label htmlFor="publicationDate">Publication Date</label>
                <input
                    id="publicationDate"
                    type="date"
                    name="publicationDate"
                    value={formik.values.publicationDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.publicationDate && formik.errors.publicationDate ? 
                <div>{formik.errors.publicationDate}</div> : ""}
                <button type="submit">SAVE</button>
            </form>
        </div>
    )

}