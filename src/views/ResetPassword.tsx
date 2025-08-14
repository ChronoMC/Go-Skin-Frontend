import { 
  Box, Button, Typography, Container,
  TextField, Grid, Avatar, 
  Snackbar, Alert} from '@mui/material';
import { Email } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { motion } from 'framer-motion';
import { useTitle } from 'ahooks';
import { useEffect, useState } from 'react';
import { resetPassword } from '@/apis/apis';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '@/utils/validation';
import CheckInput from '@/components/CheckInput';

// 使用与主页相同的主题
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
          '&.Mui-disabled': {
            opacity: 0.7,
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
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff9c4',
          color: '#ff9800',
          boxShadow: '0 4px 12px rgba(255, 179, 0, 0.2)',
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
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
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
          '&.Mui-disabled': {
            opacity: 0.7,
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
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 213, 79, 0.2)',
          color: '#ffd54f',
          boxShadow: '0 4px 12px rgba(255, 179, 0, 0.2)',
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
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(33, 33, 33, 0.9)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        },
      },
    },
  },
});

// 动画组件
const AnimatedBox = motion(Box);

export default function ResetPassword() {
    const [err, setErr] = useState("");
    const [success, setSuccess] = useState("");
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);
    const currentTheme = darkMode ? darkTheme : lightTheme;

    useTitle("找回密码");

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

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!email || !token) {
            setErr("请填写完整信息");
            return;
        }

        // 验证邮箱格式
        const emailValidation = validateEmail(email);
        if (!emailValidation.isValid) {
            setErr(emailValidation.message);
            return;
        }

        setLoad(true);
        setErr("");
        setSuccess("");
        
        resetPassword(email, token).then((response) => {
            setSuccess(`找回密码成功！${response.message}`);
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        }).catch(e => {
            setErr(String(e));
        }).finally(() => { 
            setLoad(false); 
        });
    };

    return (
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: darkMode ? 'inherit' : '#ffffff',
          }}
        >
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

          <Container component="main" maxWidth="sm" sx={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
            py: 4,
          }}>
            <AnimatedBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              sx={{
                mt: 5,
                p: 4,
                borderRadius: '24px',
                backdropFilter: 'blur(12px)',
                backgroundColor: darkMode ? 'rgba(33, 33, 33, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                border: darkMode ? '1px solid rgba(255, 179, 0, 0.2)' : '1px solid rgba(255, 179, 0, 0.3)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.12)',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  sx={{
                    m: 1,
                    width: 56,
                    height: 56,
                    bgcolor: 'transparent',
                    position: 'relative',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.2) 0%, rgba(255, 152, 0, 0.2) 100%)',
                      backdropFilter: 'blur(4px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Email 
                      sx={{ 
                        fontSize: 36, 
                        color: '#ff9800',
                        filter: 'drop-shadow(0 2px 4px rgba(255, 152, 0, 0.3))'
                      }} 
                    />
                  </Box>
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ 
                  fontWeight: 800,
                  background: 'linear-gradient(to right, #ffc107, #ff9800)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.5px',
                }}>
                  找回密码
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: 'text.secondary',
                  mb: 3,
                  textAlign: 'center',
                  maxWidth: '400px',
                }}>
                  请输入您的邮箱和授权令牌，我们将帮您找回密码
                </Typography>
                
                <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3, width: '100%' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CheckInput
                        checkList={[
                          {
                            errMsg: "请输入有效的邮箱地址",
                            reg: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                          }
                        ]}
                        required
                        fullWidth
                        label="邮箱地址"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        margin="normal"
                        fullWidth
                        label="授权令牌"
                        type="text"
                        required
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        placeholder="请输入您的授权令牌"
                        helperText="请从邮件中获取授权令牌"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={load}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {load ? (
                      <Box 
                        component="span"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Box 
                          sx={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            border: '2px solid rgba(255,255,255,0.3)',
                            borderTopColor: 'white',
                            animation: 'spin 1s linear infinite',
                            mr: 1.5,
                            '@keyframes spin': {
                              '0%': { transform: 'rotate(0deg)' },
                              '100%': { transform: 'rotate(360deg)' },
                            }
                          }}
                        />
                        处理中...
                      </Box>
                    ) : '找回密码'}
                  </Button>
                  
                  <Grid container justifyContent="center" sx={{ mt: 2 }}>
                    <Grid item>
                      <Button
                        variant="text"
                        onClick={() => navigate("/login")}
                        sx={{
                          color: 'text.secondary',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 179, 0, 0.1)',
                          },
                        }}
                      >
                        返回登录
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </AnimatedBox>
          </Container>

          <Snackbar
            open={err !== ""}
            autoHideDuration={6000}
            onClose={() => setErr("")}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            sx={{ mt: 2 }}
          >
            <Alert
              onClose={() => setErr("")}
              severity="error"
              sx={{ 
                width: '100%',
                backdropFilter: 'blur(10px)',
                backgroundColor: darkMode ? 'rgba(33, 33, 33, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                borderRadius: '12px',
                color: darkMode ? '#f5f5f5' : '#212121'
              }}
            >
              {err}
            </Alert>
          </Snackbar>

          <Snackbar
            open={success !== ""}
            autoHideDuration={6000}
            onClose={() => setSuccess("")}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            sx={{ mt: 2 }}
          >
            <Alert
              onClose={() => setSuccess("")}
              severity="success"
              sx={{ 
                width: '100%',
                backdropFilter: 'blur(10px)',
                backgroundColor: darkMode ? 'rgba(33, 33, 33, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                borderRadius: '12px',
                color: darkMode ? '#f5f5f5' : '#212121'
              }}
            >
              {success}
            </Alert>
          </Snackbar>

          {/* 页脚 */}
          <Box sx={{ 
            p: 3, 
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
            backgroundColor: darkMode ? 'inherit' : '#ffffff',
          }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              © 2025 Corona Studio 保留所有权利
            </Typography>
          </Box>
        </Box>
      </ThemeProvider>
    );
} 