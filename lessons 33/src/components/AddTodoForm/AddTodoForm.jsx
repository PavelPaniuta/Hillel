import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const AddTodoForm = ({ onAdd }) => {
  const validationSchema = Yup.object({
    todo: Yup.string()
      .required("Todo item cannot be empty")
      .min(5, "Item must be at least 5 characters long"),
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
        <Form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              marginTop: 2,
              padding: 2,
              maxWidth: "400px",
              margin: "0 auto",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <TextField
              name="todo"
              label="Add a new task"
              variant="outlined"
              fullWidth
              value={values.todo} // Formik-controlled value
              onChange={handleChange} // Formik's onChange handler
              onBlur={handleBlur}
              data-testid="todo-name"
              className="todo-form__input"
            />

            <Button
              data-testid="todo-add"
              className="btn"
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                padding: "10px 20px",
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Add Task
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AddTodoForm;
