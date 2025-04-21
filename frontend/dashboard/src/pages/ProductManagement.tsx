import React, { useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Chip,
  Paper,
  SelectChangeEvent,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Search,
  AttachMoney,
  Category,
} from '@mui/icons-material';

// Mock data - replace with API calls later
const mockProducts = [
  {
    id: 1,
    name: 'Sản phẩm 1',
    description: 'Đây là mô tả cho sản phẩm 1',
    price: 99.99,
    category: 'Điện tử',
    stock: 50,
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: 2,
    name: 'Sản phẩm 2',
    description: 'Đây là mô tả cho sản phẩm 2',
    price: 149.99,
    category: 'Thời trang',
    stock: 30,
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: 3,
    name: 'Sản phẩm 3',
    description: 'Đây là mô tả cho sản phẩm 3',
    price: 199.99,
    category: 'Nhà cửa & Vườn',
    stock: 20,
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: 4,
    name: 'Sản phẩm 4',
    description: 'Đây là mô tả cho sản phẩm 4',
    price: 79.99,
    category: 'Điện tử',
    stock: 15,
    image: 'https://via.placeholder.com/300x200',
  },
];

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Tất cả');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Điện tử',
    stock: '',
    image: 'https://via.placeholder.com/300x200',
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryFilter = (event: SelectChangeEvent<string>) => {
    setCategoryFilter(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === 'Tất cả' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleOpenDialog = (product?: any) => {
    if (product) {
      setSelectedProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        stock: product.stock.toString(),
        image: product.image,
      });
    } else {
      setSelectedProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'Điện tử',
        stock: '',
        image: 'https://via.placeholder.com/300x200',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name as string]: value,
    });
  };

  const handleSaveProduct = () => {
    if (selectedProduct) {
      // Update existing product
      setProducts(
        products.map((product) =>
          product.id === selectedProduct.id
            ? {
                ...product,
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                category: formData.category,
                stock: parseInt(formData.stock),
                image: formData.image,
              }
            : product
        )
      );
    } else {
      // Add new product
      const newProduct = {
        id: products.length + 1,
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        stock: parseInt(formData.stock),
        image: formData.image,
      };
      setProducts([...products, newProduct]);
    }
    handleCloseDialog();
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const categories = ['Tất cả', 'Điện tử', 'Thời trang', 'Nhà cửa & Vườn', 'Sách'];

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
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
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
          </Grid>
          <Grid item xs={12} md={3} sx={{ textAlign: 'right' }}>
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
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {product.description}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" color="primary">
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Chip
                    label={product.category}
                    size="small"
                    icon={<Category />}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Tồn kho: {product.stock}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  startIcon={<Edit />}
                  onClick={() => handleOpenDialog(product)}
                >
                  Chỉnh sửa
                </Button>
                <Button
                  size="small"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Xóa
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tên sản phẩm"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mô tả"
                name="description"
                multiline
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Giá"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
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
                value={formData.stock}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Danh mục</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  label="Danh mục"
                  onChange={handleInputChange}
                >
                  {categories
                    .filter((category) => category !== 'Tất cả')
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
                value={formData.image}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleSaveProduct} variant="contained" color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductManagement;
