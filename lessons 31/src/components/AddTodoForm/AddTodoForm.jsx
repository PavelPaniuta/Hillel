import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./AddTodoForm.css";

const AddTodoForm = ({ onAdd }) => {

  const validationSchema = Yup.object({
    todo: Yup.string()
      .required("Todo item cannot be empty")
      .min(5, "Item must be at least 5 characters long")
  });

  return (
    <Formik
      initialValues={{ todo: "" }}  
      validationSchema={validationSchema}  
      onSubmit={(values, { resetForm }) => {
        onAdd(values.todo);  
        resetForm();  
      }}
    >
      {({ values, handleChange, handleBlur, touched, errors }) => (
        <Form className="form js--form">
          <Field
            type="text"
            name="todo"
            className={`form__input js--form__input ${touched.todo && errors.todo ? "input-error" : ""}`}
            value={values.todo}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <ErrorMessage 
            name="todo" 
            component="div" 
            className={`error-message ${touched.todo && errors.todo ? "error-visible" : ""}`} 
          />
          <button type="submit" className="form__btn">Add</button>
        </Form>
      )}
    </Formik>
  );
};

export default AddTodoForm;