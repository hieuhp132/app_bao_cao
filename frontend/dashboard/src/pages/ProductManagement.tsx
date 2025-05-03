/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo, useCallback } from "react";
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
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Chip,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
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
import { debounce } from "lodash";
import { Product } from "../types";
const apiURL = import.meta.env.VITE_API_URL;
interface ProductFormValues {
  productName: string;
  productDescription: string;
  productPrice: number;
  productStock: number;
  productCategory: string;
  productImage: string;
}

// Optimized TextField component to prevent unnecessary re-renders
const OptimizedTextField = React.memo(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ({ label, name, value, onChange, error, helperText, ...props }: any) => (
    <TextField
      fullWidth
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      {...props}
    />
  )
);

const ProductManagement: React.FC = () => {
  // State management
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [listProduct, setListProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  // Form state
  const [formValues, setFormValues] = useState<ProductFormValues>({
    productName: "",
    productDescription: "",
    productPrice: 0,
    productStock: 0,
    productCategory: "",
    productImage: "",
  });

  const [errors, setErrors] = useState({
    productName: false,
    productPrice: false,
    productStock: false,
    productCategory: false,
    productImage: false,
  });

  const categories = ["Điện tử", "Thời trang", "Nhà cửa", "Sách"];

  // Fetch products from API
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      //const response = await axios.get("http://localhost:8083/products");
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Bạn chưa đăng nhập!");
        return;
      }
      const response = await axios.get(`${apiURL}/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setListProduct(response.data);
      console.log(response.data[0].id);
    } catch (error) {
      console.error("Error fetching products:", error);
      showSnackbar("Lỗi khi tải danh sách sản phẩm", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Optimized search handler
  const debouncedSearch = useMemo(
    () =>
      debounce((searchValue: string) => {
        setSearchTerm(searchValue);
      }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Snackbar helper
  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbar({ open: true, message, severity });
  };

  // Optimized form handlers
  const validateForm = useCallback(() => {
    const newErrors = {
      productName: formValues.productName.trim() === "",
      productPrice: formValues.productPrice <= 0,
      productStock: formValues.productStock < 0,
      productCategory: formValues.productCategory === "",
      productImage: formValues.productImage.trim() === "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  }, [formValues]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]:
        name.includes("Price") || name.includes("Stock")
          ? Number(value)
          : value,
    }));
  }, []);

  // Product CRUD operations
  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      if (editingProduct) {
        await axios.put(`${apiURL}/products/${editingProduct.id}`, formValues);
        showSnackbar("Cập nhật sản phẩm thành công", "success");
      } else {
        await axios.post(`${apiURL}/products/create`, formValues);
        showSnackbar("Thêm sản phẩm thành công", "success");
      }
      fetchProducts();
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving product:", error);
      showSnackbar(
        `Lỗi khi ${editingProduct ? "cập nhật" : "thêm"} sản phẩm`,
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      setLoading(true);
      await axios.delete(`${apiURL}/products/${productId}`);
      showSnackbar("Xóa sản phẩm thành công", "success");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      showSnackbar("Lỗi khi xóa sản phẩm", "error");
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  // Dialog handlers
  const handleOpenDialog = useCallback(() => {
    setEditingProduct(null);
    setFormValues({
      productName: "",
      productDescription: "",
      productPrice: 0,
      productStock: 0,
      productCategory: "",
      productImage: "",
    });
    setOpenDialog(true);
  }, []);

  const handleEditProduct = useCallback((product: Product) => {
    setEditingProduct(product);
    setFormValues({
      productName: product.productName,
      productDescription: product.productDescription,
      productPrice: product.productPrice,
      productStock: product.quantityStock,
      productCategory: product.productCategory,
      productImage: product.productImage,
    });
    setOpenDialog(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
    setErrors({
      productName: false,
      productPrice: false,
      productStock: false,
      productCategory: false,
      productImage: false,
    });
  }, []);

  const handleDeleteClick = useCallback((productId: string) => {
    setProductToDelete(productId);
    setDeleteDialogOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (productToDelete) {
      await handleDeleteProduct(productToDelete);
    }
  }, [productToDelete]);

  // Filter products based on search term
  const filteredProducts = useMemo(
    () =>
      listProduct.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [listProduct, searchTerm]
  );

  // Memoized dialog component
  const ProductFormDialog = useMemo(
    () => (
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <OptimizedTextField
                label="Tên sản phẩm"
                name="productName"
                value={formValues.productName}
                onChange={handleChange}
                error={errors.productName}
                helperText={errors.productName && "Vui lòng nhập tên sản phẩm"}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <OptimizedTextField
                label="Mô tả"
                name="productDescription"
                multiline
                rows={3}
                value={formValues.productDescription}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <OptimizedTextField
                label="Giá"
                name="productPrice"
                type="number"
                value={formValues.productPrice}
                onChange={handleChange}
                error={errors.productPrice}
                helperText={errors.productPrice && "Giá phải lớn hơn 0"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney />
                    </InputAdornment>
                  ),
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <OptimizedTextField
                label="Tồn kho"
                name="productStock"
                type="number"
                value={formValues.productStock}
                onChange={handleChange}
                error={errors.productStock}
                helperText={errors.productStock && "Số lượng không hợp lệ"}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={errors.productCategory}>
                <InputLabel>Danh mục *</InputLabel>
                <Select
                  name="productCategory"
                  value={formValues.productCategory}
                  label="Danh mục *"
                  onChange={handleChange as any}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
                {errors.productCategory && (
                  <Typography variant="caption" color="error">
                    Vui lòng chọn danh mục
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <OptimizedTextField
                label="URL hình ảnh"
                name="productImage"
                value={formValues.productImage}
                onChange={handleChange}
                error={errors.productImage}
                helperText={errors.productImage && "Vui lòng nhập URL hình ảnh"}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button
            onClick={handleSave}
            color="primary"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Lưu"}
          </Button>
        </DialogActions>
      </Dialog>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      openDialog,
      formValues,
      errors,
      loading,
      editingProduct,
      handleChange,
      handleCloseDialog,
      handleSave,
    ]
  );

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Quản lý sản phẩm
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <OptimizedTextField
              fullWidth
              label="Tìm kiếm sản phẩm"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <Search sx={{ mr: 1, color: "text.secondary" }} />
                ),
              }}
              onChange={handleSearchChange}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={handleOpenDialog}
            >
              Thêm sản phẩm
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {loading && !listProduct.length ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredProducts.map((product: Product, index: number) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  height="140px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bgcolor="#f5f5f5"
                >
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
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
                      ${product.productPrice.toLocaleString()}
                    </Typography>
                    <Chip
                      label={product.productCategory}
                      size="small"
                      icon={<Category fontSize="small" />}
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
                    onClick={() => handleEditProduct(product)}
                  >
                    Chỉnh sửa
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => handleDeleteClick(product.id)}
                  >
                    Xóa
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {ProductFormDialog}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Xác nhận xóa sản phẩm</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể hoàn
            tác.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Hủy</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Xóa"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductManagement;
