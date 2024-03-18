import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from './global'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { isbnRegex } from './AddBooks'

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
        validationSchema: Yup.object({
            title: Yup.string().required("Title cannot be empty"),
            author: Yup.string().required("Author cannot be empty"),
            isbn: Yup.string().min(10, "ISBN must be atleast 10 digits").max(17).matches(isbnRegex, 'Please enter a valid ISBN number. Hyphens are optional but accepted. (e.g., 978-3-16-148410-0)').required("ISBN is required"),
            publicationDate: Yup.date().max(new Date(), "Publication Date cannot exceed the current date").required("Publication Date is required"),
        }),
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
            <h1>Edit Book</h1>
            <form className="form" onSubmit={formik.handleSubmit}>
                <label htmlFor="title">Title</label>
                <div>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.title && formik.errors.title ? 
                    formik.errors.title : ""}
                </div>
               
                <label htmlFor="author">Author</label>
                <div>
                    <input 
                        id="author"
                        type="text" 
                        name="author"
                        value={formik.values.author} 
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.author && formik.errors.author ? 
                    formik.errors.author : ""}
                </div>

                <label htmlFor="isbn">ISBN</label>
                <div>
                    <input
                        id="isbn"
                        type="text"
                        name="isbn"
                        value={formik.values.isbn}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.isbn && formik.errors.isbn ? 
                    formik.errors.isbn : ""}
                </div>
                
                <label htmlFor="publicationDate">Publication Date</label>
                <div>
                    <input
                        id="publicationDate"
                        type="date"
                        name="publicationDate"
                        value={formik.values.publicationDate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.publicationDate && formik.errors.publicationDate ? 
                    formik.errors.publicationDate : ""}
                </div>
                
                <button className="btn-save" type="submit">SAVE</button>
            </form>
        </div>
    )

}