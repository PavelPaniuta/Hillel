import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../redux/Slice/productsSlice";
import {
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      setIsLoading(false);
      dispatch(fetchProducts());
    }
  }, [navigate, dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/");
    }, 0);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });

  const initialValues = {
    name: "",
    category: "",
    quantity: "",
    price: "",
    info: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    category: Yup.string().required("Category is required"),
    quantity: Yup.number()
      .required("Quantity is required")
      .positive()
      .integer(),
    price: Yup.number().required("Price is required").positive(),
    info: Yup.string().required("Info is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    if (editMode) {
      dispatch(updateProduct({ ...values, _id: editProduct._id }));
    } else {
      dispatch(addProduct(values));
    }
    resetForm();
    setOpenForm(false);
    setEditMode(false);
    setEditProduct(null);
  };

  const handleEdit = (product) => {
    setEditMode(true);
    setEditProduct(product);
    setOpenForm(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenDelete(true);
  };

  const confirmDelete = () => {
    dispatch(deleteProduct(deleteId));
    setOpenDelete(false);
    setDeleteId(null);
  };

  const goProductItem = () => {
    navigate("/products-item");
  };

  return (
    <Container>
      <Button
        style={{ marginTop: "20px", marginBottom: "20px", marginRight: "20px" }}
        variant="contained"
        color="primary"
        onClick={goProductItem}
      >
        Preview
      </Button>
      <Button
        style={{ marginTop: "20px", marginBottom: "20px" }}
        variant="contained"
        color="primary"
        onClick={() => setOpenForm(true)}
        startIcon={<Add />}
      >
        Add Product
      </Button>
      <Button
        style={{ position: "absolute", top: "10px", right: "10px" }}
        variant="contained"
        color="secondary"
        onClick={handleLogout}
      >
        Logout
      </Button>
      <Typography variant="h4" gutterBottom align="center">
        Products
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {["Name", "Category", "Price", "Quantity"].map((label, index) => (
                <TableCell key={index}>
                  <TableSortLabel
                    active={orderBy === label.toLowerCase()}
                    direction={order}
                    onClick={() => handleSort(label.toLowerCase())}
                  >
                    {label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedProducts.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(product)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(product._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>{editMode ? "Edit Product" : "Add Product"}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={editProduct || initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
              <Form>
                {["name", "category", "quantity", "price", "info"].map(
                  (field) => (
                    <TextField
                      key={field}
                      fullWidth
                      margin="dense"
                      label={field}
                      name={field}
                      value={values[field]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched[field] && Boolean(errors[field])}
                      helperText={touched[field] && errors[field]}
                    />
                  )
                )}
                <DialogActions>
                  <Button onClick={() => setOpenForm(false)}>Cancel</Button>
                  <Button type="submit" variant="contained" color="primary">
                    {editMode ? "Update" : "Add"}
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Products;
