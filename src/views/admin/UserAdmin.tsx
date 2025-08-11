import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useTitle from '@/hooks/useTitle';
import { useRequest } from 'ahooks';
import { ListUser, editUser } from '@/apis/apis';
import { useEffect, useRef, useState } from 'react';
import { useAtomValue } from 'jotai';
import { token } from '@/store/store';
import TablePagination from '@mui/material/TablePagination';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { EditUser, UserInfo } from '@/apis/model';
import { produce } from 'immer'
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import SkinViewUUID from '@/components/SkinViewUUID';
import Loading from '@/components/Loading';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { motion } from 'framer-motion';
import { AdminPanelSettings, Search, Edit, Person, Email, Lock, Security, Palette } from '@mui/icons-material';
import Typography from '@mui/material/Typography';

// 浅色主题
const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#ffc107',
      contrastText: '#000000',
    },
    secondary: {
      main: '#ff9800',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#424242',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h5: {
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: '#ffffff',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
          overflow: 'hidden',
          margin: 0,
          padding: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          fontWeight: 600,
          textTransform: 'none',
          padding: '12px 24px',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 6px rgba(255, 179, 0, 0.2)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 12px rgba(255, 179, 0, 0.3)',
          },
        },
        contained: {
          background: 'linear-gradient(to right, #ffc107, #ff9800)',
          '&:hover': {
            background: 'linear-gradient(to right, #ffb300, #fb8c00)',
          },
        },
        outlined: {
          borderColor: 'rgba(255, 179, 0, 0.7)',
          color: '#ff9800',
          '&:hover': {
            borderColor: '#ff9800',
            backgroundColor: 'rgba(255, 179, 0, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid rgba(255, 179, 0, 0.3)',
          boxShadow: '0 8px 32px rgba(33, 33, 33, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 40px rgba(33, 33, 33, 0.15)',
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          overflow: 'hidden',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255, 179, 0, 0.1)',
          padding: '16px',
        },
        head: {
          backgroundColor: 'rgba(255, 193, 7, 0.1)',
          fontWeight: 700,
          color: '#ff9800',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(255, 193, 7, 0.05)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          fontWeight: 600,
          backgroundColor: 'rgba(255, 193, 7, 0.1)',
          color: '#ff9800',
          border: '1px solid rgba(255, 179, 0, 0.3)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            '& fieldset': {
              borderColor: 'rgba(255, 179, 0, 0.5)',
            },
            '&:hover fieldset': {
              borderColor: '#ffd54f',
            },
            '&.Mui-focused fieldset': {
              borderWidth: '1px',
              borderColor: '#ffc107',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#757575',
            '&.Mui-focused': {
              color: '#ff9800',
              fontWeight: 500,
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '24px',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid rgba(255, 179, 0, 0.3)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
        },
      },
    },
  },
});

// 深色主题
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffd54f',
      contrastText: '#000000',
    },
    secondary: {
      main: '#ffb300',
    },
    background: {
      default: 'linear-gradient(135deg, #212121 0%, #424242 100%)',
      paper: 'rgba(33, 33, 33, 0.9)',
    },
    text: {
      primary: '#f5f5f5',
      secondary: '#e0e0e0',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h5: {
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #212121 0%, #424242 100%)',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
          overflow: 'hidden',
          margin: 0,
          padding: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          fontWeight: 600,
          textTransform: 'none',
          padding: '12px 24px',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 6px rgba(255, 179, 0, 0.2)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 12px rgba(255, 179, 0, 0.3)',
          },
        },
        contained: {
          background: 'linear-gradient(to right, #ffc107, #ff9800)',
          '&:hover': {
            background: 'linear-gradient(to right, #ffb300, #fb8c00)',
          },
        },
        outlined: {
          borderColor: 'rgba(255, 179, 0, 0.5)',
          color: '#ffd54f',
          '&:hover': {
            borderColor: '#ffd54f',
            backgroundColor: 'rgba(255, 179, 0, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(33, 33, 33, 0.85)',
          border: '1px solid rgba(255, 179, 0, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          overflow: 'hidden',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255, 179, 0, 0.1)',
          padding: '16px',
        },
        head: {
          backgroundColor: 'rgba(255, 213, 79, 0.1)',
          fontWeight: 700,
          color: '#ffd54f',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(255, 213, 79, 0.05)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          fontWeight: 600,
          backgroundColor: 'rgba(255, 213, 79, 0.1)',
          color: '#ffd54f',
          border: '1px solid rgba(255, 179, 0, 0.3)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: 'rgba(66, 66, 66, 0.7)',
            '& fieldset': {
              borderColor: 'rgba(255, 179, 0, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: '#ffd54f',
            },
            '&.Mui-focused fieldset': {
              borderWidth: '1px',
              borderColor: '#ffc107',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#bdbdbd',
            '&.Mui-focused': {
              color: '#ffc107',
              fontWeight: 500,
            },
          },
          '& .MuiInputBase-input': {
            color: '#f5f5f5',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '24px',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(33, 33, 33, 0.95)',
          border: '1px solid rgba(255, 179, 0, 0.2)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
        },
      },
    },
  },
});

// 动画组件
const AnimatedBox = motion(Box);
const AnimatedPaper = motion(Paper);

export default function UserAdmin() {
    useTitle("用户管理")
    const [page, setPage] = useState(1)
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const currentTheme = darkMode ? darkTheme : lightTheme;
    const nowtoken = useAtomValue(token)
    const [err, setErr] = useState("")
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [open, setOpen] = useState(false);
    const [row, setRow] = useState<UserInfo | null>(null)

    // 监听系统主题变化
    useEffect(() => {
        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
            setDarkMode(e.matches);
        };

        const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setDarkMode(systemThemeQuery.matches);
        
        systemThemeQuery.addEventListener('change', handleSystemThemeChange);
        
        return () => {
            systemThemeQuery.removeEventListener('change', handleSystemThemeChange);
        };
    }, []);

    const handleOpen = (row: UserInfo) => {
        setRow(row)
        setOpen(true)
    }

    const uq = new URLSearchParams("/api/v1/admin/users")
    uq.set("page", String(page))
    uq.set("email", email)
    uq.set("name", name)

    const { data, run } = useRequest(ListUser, {
        cacheKey: uq.toString(),
        debounceWait: 300,
        onError: e => {
            setErr(String(e))
        }
    })
    useEffect(() => {
        run(page, nowtoken, email, name)
    }, [page, nowtoken, run, email, name])

    return (
        <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            <Box sx={{
                minHeight: '100vh',
                position: 'relative',
                overflow: 'hidden',
                p: 3,
                backgroundColor: darkMode ? 'inherit' : '#ffffff',
            }}>
                {/* 装饰性背景元素 */}
                <Box sx={{
                    position: 'absolute',
                    top: '-10%',
                    right: '-10%',
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: darkMode 
                        ? 'radial-gradient(circle, rgba(255, 213, 79, 0.1) 0%, rgba(255, 179, 0, 0.15) 100%)' 
                        : 'radial-gradient(circle, rgba(255, 193, 7, 0.15) 0%, rgba(255, 152, 0, 0.1) 100%)',
                    zIndex: 0,
                }} />
                
                <Box sx={{
                    position: 'absolute',
                    bottom: '-15%',
                    left: '-5%',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: darkMode 
                        ? 'radial-gradient(circle, rgba(255, 179, 0, 0.1) 0%, rgba(255, 213, 79, 0.15) 100%)'
                        : 'radial-gradient(circle, rgba(255, 152, 0, 0.1) 0%, rgba(255, 193, 7, 0.15) 100%)',
                    zIndex: 0,
                }} />

                {/* 页面标题 */}
                <AnimatedBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    sx={{ 
                        textAlign: 'center',
                        mb: 4,
                        position: 'relative',
                        zIndex: 1,
                    }}
                >
                    <Typography variant="h3" sx={{ 
                        fontWeight: 900,
                        lineHeight: 1.2,
                        mb: 2,
                        background: 'linear-gradient(to right, #ffc107, #ff9800)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: { xs: '2rem', md: '2.5rem' }
                    }}>
                        用户管理
                    </Typography>
                    <Typography variant="h6" sx={{ 
                        color: 'text.secondary',
                        fontWeight: 500,
                        fontSize: { xs: '1rem', md: '1.1rem' }
                    }}>
                        管理平台用户账户和权限
                    </Typography>
                </AnimatedBox>

                <AnimatedPaper
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    sx={{ 
                        position: 'relative',
                        zIndex: 1,
                        maxWidth: '1200px',
                        mx: 'auto',
                    }}
                >
                    <Box sx={{ 
                        p: "1.5em", 
                        display: "flex", 
                        gap: "1em", 
                        alignItems: "flex-end",
                        borderBottom: darkMode ? '1px solid rgba(255, 179, 0, 0.2)' : '1px solid rgba(255, 193, 7, 0.2)',
                        backgroundColor: darkMode ? 'rgba(255, 213, 79, 0.05)' : 'rgba(255, 193, 7, 0.05)',
                        borderRadius: '24px 24px 0 0',
                    }}>
                        <Chip 
                            icon={<Search />}
                            label="前缀筛选" 
                            color="primary"
                            variant="outlined"
                        />
                        <TextField 
                            onChange={v => setEmail(v.target.value)} 
                            label="邮箱" 
                            variant="outlined"
                            size="small"
                            sx={{ minWidth: '200px' }}
                        />
                        <TextField 
                            onChange={v => setName(v.target.value)} 
                            label="用户名" 
                            variant="outlined"
                            size="small"
                            sx={{ minWidth: '200px' }}
                        />
                    </Box>
                    <TableContainer sx={{ borderRadius: '0 0 24px 24px' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Email fontSize="small" />
                                            邮箱
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Person fontSize="small" />
                                            用户名
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Security fontSize="small" />
                                            注册 IP
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <AdminPanelSettings fontSize="small" />
                                            UUID
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">操作</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.list.map((row, index) => (
                                    <AnimatedTableRow
                                        key={row.uid}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        whileHover={{ scale: 1.01 }}
                                    >
                                        <TableCell sx={{ maxWidth: 'min-content', fontFamily: 'monospace' }}>
                                            {row.email}
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 500 }}>
                                            {row.name}
                                        </TableCell>
                                        <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                                            {row.reg_ip}
                                        </TableCell>
                                        <TableCell sx={{ 
                                            fontFamily: 'monospace', 
                                            fontSize: '0.85rem',
                                            maxWidth: '200px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}>
                                            {row.uuid}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button 
                                                onClick={() => handleOpen(row)}
                                                variant="outlined"
                                                size="small"
                                                startIcon={<Edit />}
                                                sx={{ 
                                                    borderRadius: '8px',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                编辑
                                            </Button>
                                        </TableCell>
                                    </AnimatedTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[20]}
                        component="div"
                        count={data?.total ?? 0}
                        rowsPerPage={20}
                        page={page - 1}
                        onPageChange={(_, page) => setPage(page + 1)}
                        sx={{ 
                            '.MuiTablePagination-toolbar': {
                                borderTop: darkMode ? '1px solid rgba(255, 179, 0, 0.1)' : '1px solid rgba(255, 193, 7, 0.1)',
                            },
                        }}
                    />
                </AnimatedPaper>
                
                <Snackbar 
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
                    open={err != ""} 
                    autoHideDuration={6000}
                    onClose={() => setErr("")}
                >
                    <Alert 
                        onClose={() => setErr("")} 
                        severity="error"
                        sx={{ 
                            borderRadius: '12px',
                            backdropFilter: 'blur(10px)',
                            backgroundColor: darkMode ? 'rgba(33, 33, 33, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                        }}
                    >
                        {err}
                    </Alert>
                </Snackbar>

                <MyDialog open={open} setOpen={setOpen} row={row} onUpdate={() => run(page, nowtoken, email, name)} />
            </Box>
        </ThemeProvider>
    );
}

// 动画表格行组件
const AnimatedTableRow = motion(TableRow);

interface MyDialogProp {
    open: boolean
    setOpen: (b: boolean) => void
    row: UserInfo | null
    onUpdate: () => void
}

function MyDialog({ open, row, setOpen, onUpdate }: MyDialogProp) {
    const handleClose = () => {
        setOpen(false)
    }
    const [erow, setErow] = useState<EditUser>({
        email: "",
        name: "",
        password: "",
        is_admin: false,
        is_disable: false,
        del_textures: false,
    })
    const [load, setLoad] = useState(false)
    const nowToken = useAtomValue(token)
    const [err, setErr] = useState("")
    const editValue = useRef<EditUser>({});

    useEffect(() => {
        if (!row) return
        setErow({
            email: row.email,
            name: row.name,
            password: "",
            is_admin: row.is_admin,
            is_disable: row.is_disable,
            del_textures: false,
        })
        editValue.current = {}
    }, [row, open])

    const handleOpen = () => {
        if (load) return
        setLoad(true)
        editUser(editValue.current, nowToken, String(row?.uid)).then(() => [setOpen(false), onUpdate(), editValue.current = {}]).finally(() => setLoad(false)).
            catch(e => setErr(String(e)))
    }

    type StringKeys<T> = {
        [K in keyof T]: T[K] extends string ? K : never;
    }[keyof T];

    function handleSetValue(key: StringKeys<Required<EditUser>>, value: string) {
        setErow(produce(v => {
            v[key] = value
            editValue.current[key] = value
        }))
    }

    type BoolKeys<T> = {
        [K in keyof T]: T[K] extends boolean ? K : never;
    }[keyof T];

    function handleSetChecked(key: BoolKeys<Required<EditUser>>, value: boolean) {
        setErow(produce(v => {
            v[key] = value
            editValue.current[key] = value
        }))
    }

    const [darkMode] = useState<boolean>(false);

    return (<>
        <Dialog 
            open={open} 
            maxWidth="md"
            fullWidth
        >
            <DialogTitle sx={{ 
                fontWeight: 700, 
                color: darkMode ? '#ffd54f' : '#ff9800',
                textAlign: 'center',
                pb: 1,
            }}>
                修改用户信息
            </DialogTitle>
            <DialogContent sx={{
                display: "grid", 
                gap: '1.5em',
                gridTemplateAreas: {
                    md: "'a c' 'b b'",
                    xs: "'a' 'c' 'b'"
                },
                p: 3,
            }}>
                <Box sx={{ 
                    display: "flex", 
                    flexDirection: 'column', 
                    gap: '1em', 
                    gridArea: "a" 
                }}>
                    <TextField
                        margin="dense"
                        label="邮箱"
                        type="email"
                        variant="outlined"
                        fullWidth
                        value={erow?.email}
                        onChange={e => handleSetValue('email', e.target.value)}
                        sx={{ 
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                            },
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="用户名"
                        type="text"
                        variant="outlined"
                        fullWidth
                        value={erow?.name}
                        onChange={e => handleSetValue('name', e.target.value)}
                        sx={{ 
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                            },
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="密码"
                        type="password"
                        placeholder='（未更改）'
                        variant="outlined"
                        fullWidth
                        value={erow?.password}
                        onChange={e => handleSetValue('password', e.target.value)}
                        sx={{ 
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                            },
                        }}
                    />
                </Box>
                <FormGroup sx={{ 
                    gridArea: "b", 
                    flexDirection: 'column',
                    gap: 1,
                    p: 2,
                    borderRadius: '12px',
                    backgroundColor: darkMode ? 'rgba(255, 213, 79, 0.05)' : 'rgba(255, 193, 7, 0.05)',
                    border: darkMode ? '1px solid rgba(255, 179, 0, 0.2)' : '1px solid rgba(255, 193, 7, 0.2)',
                }}>
                    <FormControlLabel 
                        control={
                            <Checkbox 
                                checked={erow?.is_admin} 
                                onChange={e => handleSetChecked('is_admin', e.target.checked)}
                                sx={{ 
                                    '&.Mui-checked': {
                                        color: darkMode ? '#ffd54f' : '#ff9800',
                                    },
                                }}
                            />
                        } 
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <AdminPanelSettings fontSize="small" />
                                管理权限
                            </Box>
                        }
                    />
                    <FormControlLabel 
                        control={
                            <Checkbox 
                                checked={erow?.is_disable} 
                                onChange={e => handleSetChecked('is_disable', e.target.checked)}
                                sx={{ 
                                    '&.Mui-checked': {
                                        color: darkMode ? '#ffd54f' : '#ff9800',
                                    },
                                }}
                            />
                        } 
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Lock fontSize="small" />
                                禁用账户
                            </Box>
                        }
                    />
                    <FormControlLabel 
                        control={
                            <Checkbox 
                                checked={erow?.del_textures} 
                                onChange={e => handleSetChecked('del_textures', e.target.checked)}
                                sx={{ 
                                    '&.Mui-checked': {
                                        color: darkMode ? '#ffd54f' : '#ff9800',
                                    },
                                }}
                            />
                        } 
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Palette fontSize="small" />
                                清空材质
                            </Box>
                        }
                    />
                </FormGroup>
                <Box sx={{ 
                    gridArea: "c", 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                        用户皮肤预览
                    </Typography>
                    <Box sx={{
                        p: 2,
                        borderRadius: '16px',
                        backgroundColor: darkMode ? 'rgba(255, 213, 79, 0.1)' : 'rgba(255, 193, 7, 0.1)',
                        border: darkMode ? '1px solid rgba(255, 179, 0, 0.2)' : '1px solid rgba(255, 193, 7, 0.2)',
                    }}>
                        <SkinViewUUID uuid={row?.uuid ?? ""} width={150} height={150} />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3, pt: 0 }}>
                <Button 
                    onClick={handleClose}
                    variant="outlined"
                    sx={{ 
                        borderRadius: '12px',
                        fontWeight: 600,
                        px: 3,
                    }}
                >
                    取消
                </Button>
                <Button 
                    onClick={handleOpen}
                    variant="contained"
                    disabled={load}
                    sx={{ 
                        borderRadius: '12px',
                        fontWeight: 600,
                        px: 3,
                    }}
                >
                    {load ? '保存中...' : '确认'}
                </Button>
            </DialogActions>
        </Dialog>
        {load && <Loading />}
        <Snackbar 
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
            open={err != ""} 
            autoHideDuration={6000}
            onClose={() => setErr("")}
        >
            <Alert 
                onClose={() => setErr("")} 
                severity="error"
                sx={{ 
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)',
                    backgroundColor: darkMode ? 'rgba(33, 33, 33, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                }}
            >
                {err}
            </Alert>
        </Snackbar>
    </>)
}