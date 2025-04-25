import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Chip,
  Paper,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Search,
  AttachMoney,
  Category,
} from "@mui/icons-material";
import axios from "axios";
import type { Product } from "../types";
// Mock data - replace with API calls later

const ProductManagement: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [listProduct, setListProduct] = useState<Product[]>([]);
  // Form fields
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productStock, setProductStock] = useState(0);
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState("");

  const categories = ["Điện tử", "Thời trang", "Nhà cửa", "Sách"];

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteProduct = () => {
    console.log("da xoa");
  };
  const handleSave = () => {
    const productData = {
      productName,
      productDescription,
      productPrice,
      productStock,
      productCategory,
      productImage,
    };
    console.log("Dữ liệu sản phẩm:", productData);
    // Gọi API ở đây nếu muốn
    handleCloseDialog();
  };

  // const fetched = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8082/products");
  //     setProducts(response.data);
  //     console.log(products);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   fetched();
  // }, []);
  // const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(event.target.value);
  // };

  // const categories = [
  //   "Tất cả",
  //   "Điện tử",
  //   "Thời trang",
  //   "Nhà cửa & Vườn",
  //   "Sách",
  // ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Quản lý sản phẩm
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Tìm kiếm sản phẩm"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <Search sx={{ mr: 1, color: "text.secondary" }} />
                ),
              }}
            />
          </Grid>
          {/* <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Danh mục</InputLabel>
              <Select
                value={categoryFilter}
                label="Danh mục"
                onChange={handleCategoryFilter}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid> */}
          <Grid item xs={12} md={3} sx={{ textAlign: "right" }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={() => handleOpenDialog()}
            >
              Thêm sản phẩm
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {listProduct.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <Box height="140px">
                <img
                  src={product.productImage}
                  alt="Product"
                  style={{ maxHeight: "100%", width: "auto" }}
                />
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {product.productName}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {product.productDescription}
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" color="primary">
                    ${product.productPrice}
                  </Typography>
                  <Chip
                    label={product.productCategory}
                    size="small"
                    icon={<Category />}
                  />
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Tồn kho: {product.quantityStock}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  startIcon={<Edit />}
                  onClick={() => handleOpenDialog()}
                >
                  Chỉnh sửa
                </Button>
                <Button
                  size="small"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => handleDeleteProduct()}
                >
                  Xóa
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        {/* <DialogTitle>
          {selectedProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
        </DialogTitle> */}
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên sản phẩm"
                name="name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mô tả"
                name="description"
                multiline
                rows={3}
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Giá"
                name="price"
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(Number(e.target.value))}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tồn kho"
                name="stock"
                type="number"
                value={productStock}
                onChange={(e) => setProductStock(Number(e.target.value))}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Danh mục</InputLabel>
                <Select
                  name="category"
                  value={productCategory}
                  label="Danh mục"
                  onChange={(e) => setProductCategory(e.target.value)}
                >
                  {categories
                    .filter((category) => category !== "Tất cả")
                    .map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="URL hình ảnh"
                name="image"
                value={productImage}
                onChange={(e) => setProductImage(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSave}>Lưu</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductManagement;
