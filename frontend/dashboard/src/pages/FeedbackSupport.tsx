import React, { useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
  SelectChangeEvent,
} from '@mui/material';
import {
  ExpandMore,
  Search,
  Add,
  Edit,
  Delete,
  Send,
  AttachFile,
} from '@mui/icons-material';

// Mock data - replace with API calls later
const mockTickets = [
  {
    id: 1,
    subject: 'Không thể truy cập tài khoản',
    description: 'Tôi không thể đăng nhập vào tài khoản của mình. Nhận được thông báo lỗi.',
    status: 'Mở',
    priority: 'Cao',
    category: 'Tài khoản',
    createdAt: '2024-03-15',
    updatedAt: '2024-03-15',
  },
  {
    id: 2,
    subject: 'Đơn hàng chưa được giao',
    description: 'Đơn hàng #12345 của tôi vẫn chưa được giao. Đã 5 ngày rồi.',
    status: 'Đang xử lý',
    priority: 'Trung bình',
    category: 'Đơn hàng',
    createdAt: '2024-03-14',
    updatedAt: '2024-03-15',
  },
  {
    id: 3,
    subject: 'Sản phẩm bị hư hỏng',
    description: 'Nhận được sản phẩm bị hư hỏng. Cần thay thế.',
    status: 'Đã đóng',
    priority: 'Cao',
    category: 'Sản phẩm',
    createdAt: '2024-03-13',
    updatedAt: '2024-03-14',
  },
];

const faqData = [
  {
    question: 'Làm thế nào để đặt lại mật khẩu?',
    answer: 'Để đặt lại mật khẩu, nhấp vào liên kết "Quên mật khẩu" trên trang đăng nhập. Bạn sẽ nhận được email với hướng dẫn để đặt lại mật khẩu.',
  },
  {
    question: 'Chính sách hoàn tiền của bạn là gì?',
    answer: 'Chúng tôi cung cấp bảo hành hoàn tiền 30 ngày cho tất cả các sản phẩm. Nếu bạn không hài lòng với việc mua hàng, bạn có thể trả lại trong vòng 30 ngày để được hoàn tiền đầy đủ.',
  },
  {
    question: 'Làm thế nào để theo dõi đơn hàng của tôi?',
    answer: 'Bạn có thể theo dõi đơn hàng bằng cách đăng nhập vào tài khoản của mình và đi đến phần "Đơn hàng". Bạn sẽ tìm thấy số theo dõi và trạng thái đơn hàng của bạn ở đó.',
  },
  {
    question: 'Bạn có giao hàng quốc tế không?',
    answer: 'Có, chúng tôi giao hàng đến hầu hết các quốc gia trên thế giới. Chi phí vận chuyển và thời gian giao hàng có thể khác nhau tùy thuộc vào vị trí của bạn.',
  },
];

const FeedbackSupport: React.FC = () => {
  const [tickets, setTickets] = useState(mockTickets);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tất cả');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
    priority: 'Trung bình',
    category: 'Chung',
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilter = (event: SelectChangeEvent<string>) => {
    setStatusFilter(event.target.value);
  };

  const handleOpenDialog = (ticket?: any) => {
    if (ticket) {
      setSelectedTicket(ticket);
      setNewTicket({
        subject: ticket.subject,
        description: ticket.description,
        priority: ticket.priority,
        category: ticket.category,
      });
    } else {
      setSelectedTicket(null);
      setNewTicket({
        subject: '',
        description: '',
        priority: 'Trung bình',
        category: 'Chung',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTicket(null);
    setNewTicket({
      subject: '',
      description: '',
      priority: 'Trung bình',
      category: 'Chung',
    });
  };

  const handleSubmit = () => {
    if (selectedTicket) {
      // Update existing ticket
      setTickets(
        tickets.map((ticket) =>
          ticket.id === selectedTicket.id
            ? {
                ...ticket,
                ...newTicket,
                updatedAt: new Date().toISOString().split('T')[0],
              }
            : ticket
        )
      );
    } else {
      // Create new ticket
      const newTicketData = {
        id: tickets.length + 1,
        ...newTicket,
        status: 'Mở',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };
      setTickets([...tickets, newTicketData]);
    }
    handleCloseDialog();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Mở':
        return 'error';
      case 'Đang xử lý':
        return 'warning';
      case 'Đã đóng':
        return 'success';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Cao':
        return 'error';
      case 'Trung bình':
        return 'warning';
      case 'Thấp':
        return 'success';
      default:
        return 'default';
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = ticket.subject
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'Tất cả' || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Phản hồi & Hỗ trợ
      </Typography>

      <Grid container spacing={3}>
        {/* Support Tickets Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6">Phiếu hỗ trợ</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      placeholder="Tìm kiếm phiếu..."
                      value={searchTerm}
                      onChange={handleSearch}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Trạng thái</InputLabel>
                      <Select
                        value={statusFilter}
                        label="Trạng thái"
                        onChange={handleStatusFilter}
                      >
                        <MenuItem value="Tất cả">Tất cả</MenuItem>
                        <MenuItem value="Mở">Mở</MenuItem>
                        <MenuItem value="Đang xử lý">Đang xử lý</MenuItem>
                        <MenuItem value="Đã đóng">Đã đóng</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleOpenDialog()}
              sx={{ mb: 2 }}
            >
              Phiếu mới
            </Button>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Tiêu đề</TableCell>
                    <TableCell>Trạng thái</TableCell>
                    <TableCell>Độ ưu tiên</TableCell>
                    <TableCell>Danh mục</TableCell>
                    <TableCell>Ngày tạo</TableCell>
                    <TableCell>Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell>#{ticket.id}</TableCell>
                      <TableCell>{ticket.subject}</TableCell>
                      <TableCell>
                        <Chip
                          label={ticket.status}
                          color={getStatusColor(ticket.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={ticket.priority}
                          color={getPriorityColor(ticket.priority)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{ticket.category}</TableCell>
                      <TableCell>{ticket.createdAt}</TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(ticket)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() =>
                            setTickets(
                              tickets.filter((t) => t.id !== ticket.id)
                            )
                          }
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* FAQ Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Câu hỏi thường gặp
            </Typography>
            {faqData.map((faq, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        </Grid>
      </Grid>

      {/* Ticket Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedTicket ? 'Chỉnh sửa phiếu' : 'Phiếu hỗ trợ mới'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Tiêu đề"
              value={newTicket.subject}
              onChange={(e) =>
                setNewTicket({ ...newTicket, subject: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Mô tả"
              multiline
              rows={4}
              value={newTicket.description}
              onChange={(e) =>
                setNewTicket({ ...newTicket, description: e.target.value })
              }
              sx={{ mb: 2 }}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Độ ưu tiên</InputLabel>
                  <Select
                    value={newTicket.priority}
                    label="Độ ưu tiên"
                    onChange={(e: SelectChangeEvent<string>) =>
                      setNewTicket({
                        ...newTicket,
                        priority: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="Thấp">Thấp</MenuItem>
                    <MenuItem value="Trung bình">Trung bình</MenuItem>
                    <MenuItem value="Cao">Cao</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Danh mục</InputLabel>
                  <Select
                    value={newTicket.category}
                    label="Danh mục"
                    onChange={(e: SelectChangeEvent<string>) =>
                      setNewTicket({
                        ...newTicket,
                        category: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="Chung">Chung</MenuItem>
                    <MenuItem value="Tài khoản">Tài khoản</MenuItem>
                    <MenuItem value="Đơn hàng">Đơn hàng</MenuItem>
                    <MenuItem value="Sản phẩm">Sản phẩm</MenuItem>
                    <MenuItem value="Kỹ thuật">Kỹ thuật</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            startIcon={<Send />}
          >
            {selectedTicket ? 'Cập nhật' : 'Gửi'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FeedbackSupport;
