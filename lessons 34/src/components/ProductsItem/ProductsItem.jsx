import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/Slice/productsSlice";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

function Shop() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      setIsLoading(false);
      dispatch(fetchProducts());
    }
  }, [navigate, dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/");
    }, 0);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Загрузка...
      </div>
    );
  }

  return (
    <Container>
      <Button
        style={{ position: "absolute", top: "10px" }}
        variant="contained"
        color="primary"
        onClick={handleGoHome}
      >
        Logo
      </Button>

      <Button
        style={{ position: "absolute", top: "10px", right: "10px" }}
        variant="contained"
        color="secondary"
        onClick={handleLogout}
      >
        Logout
      </Button>
      <Typography
        style={{ marginTop: "60px" }}
        variant="h4"
        gutterBottom
        textAlign="center"
      >
        Магазин
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTmW2NgC-8XiX9wmOjmbLhmz_ScRFATBVTUYCqgIPzCUTDU4wC8tYuZ4r0WWvtf5ZVr4ZH307f7FMFzxfnvCr1AzwlNf5yEu-cF-I2UKxJMi2esXvnPF1AFTZa8oj6aBNXV3fHxxw&usqp=CAc"
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography color="textSecondary">
                  Цена: {product.price} грн
                </Typography>
                <Typography color="textSecondary">
                  Количество: {product.quantity}
                </Typography>
                <Typography color="textSecondary">...</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<ShoppingCartIcon />}
                >
                  Купить
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Shop;
