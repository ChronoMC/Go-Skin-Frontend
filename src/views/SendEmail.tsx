import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useRequest, useTitle } from 'ahooks';
import { getConfig } from '@/apis/apis';
import { useEffect, useRef, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CaptchaWidget from '@/components/CaptchaWidget';
import type { refType as CaptchaWidgetRef } from '@/components/CaptchaWidget'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useNavigate } from "react-router-dom";
import { ApiErr } from '@/apis/error';
import Loading from '@/components/Loading';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import { motion } from 'framer-motion';

// 浅色主题 - 与 Register 组件保持一致
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
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid rgba(255, 179, 0, 0.3)',
          boxShadow: '0 8px 32px rgba(33, 33, 33, 0.1)',
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
    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          color: '#ff9800',
          textDecoration: 'none',
          transition: 'all 0.2s ease',
          '&:hover': {
            color: '#ff6d00',
            textDecoration: 'underline',
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

// 深色主题 - 与 Register 组件保持一致
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
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '24px',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(33, 33, 33, 0.85)',
          border: '1px solid rgba(255, 179, 0, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
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
    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          color: '#ffb300',
          textDecoration: 'none',
          transition: 'all 0.2s ease',
          '&:hover': {
            color: '#ffd54f',
            textDecoration: 'underline',
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

export default function SendEmail({ title, anyEmail = false, sendService }: { title: string, anyEmail?: boolean, sendService: (email: string, captchaToken: string) => Promise<any> }) {
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [domain, setDomain] = useState("");
  const [email, setEmail] = useState("")
  const captchaRef = useRef<CaptchaWidgetRef>(null)
  const [captchaToken, setCaptchaToken] = useState("");
  const [open, setOpen] = useState(false);
  useTitle(title)
  const navigate = useNavigate();
  const [helperText, setHelperText] = useState("")
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const currentTheme = darkMode ? darkTheme : lightTheme;

  // 监听系统主题变化
  useEffect(() => {
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };

    const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(systemThemeQuery.matches);
    
    // 监听系统主题变化
    systemThemeQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      systemThemeQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  const server = useRequest(getConfig, {
    cacheKey: "/api/v1/config",
    staleTime: 60000,
    onError: e => {
      console.warn(e)
      setErr(String(e))
    }
  })

  useEffect(() => {
    if (server.data?.AllowDomain.length != 0) {
      setDomain(server.data?.AllowDomain[0] ?? "")
    }
  }, [server.data?.AllowDomain])

  const emailonChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(e.target.value)
    if (e.target.value == "") {
      setHelperText("邮箱不得为空")
    }
    setHelperText("")
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email == "") {
      setHelperText("邮箱不得为空")
    }
    const sendEmail = (() => {
      if (!anyEmail && domain != "") {
        return `${email}@${domain}`
      }
      return email
    })()

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(sendEmail)) {
      setHelperText("邮箱格式错误")
      return
    }
    if (!anyEmail && server.data?.EmailReg && server.data?.EmailReg != ""
      && !new RegExp(server.data?.EmailReg).test(sendEmail)) {
      setHelperText(server.data?.EmailRegMsg ?? "邮箱不满足正则要求")
      return
    }

    if (server.data?.captcha.type != "" && captchaToken == "") {
      return
    }
    setLoading(true)
    sendService(sendEmail, captchaToken).then((response) => {
      // 处理API响应
      if (response && response.message) {
        setSuccess(response.message);
      } else {
        setOpen(true);
      }
    }).catch(e => {
      captchaRef.current?.reload()
      console.warn(e)
      if (e instanceof ApiErr) {
        switch (e.code) {
          case 10:
            setErr("验证码错误")
            return
          case 11:
            setErr("暂时无法对此邮箱发送邮件")
            return
        }
      }
      setErr(String(e))
    }).finally(() => setLoading(false))
  }

  const handleClose = () => {
    navigate("/")
  }

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: darkMode ? 'inherit' : '#ffffff',
        }}
      >
        {/* 装饰性背景元素 - 与 Register 页面保持一致 */}
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
        
        <Container maxWidth="xs" component="main" sx={{ position: 'relative', zIndex: 1 }}>
          <Fade in={true} timeout={600}>
            <Box
              sx={{
                p: { xs: 3, sm: 4, md: 5 },
                borderRadius: '24px',
                backdropFilter: 'blur(12px)',
                backgroundColor: darkMode ? 'rgba(33, 33, 33, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                border: darkMode ? '1px solid rgba(255, 179, 0, 0.2)' : '1px solid rgba(255, 179, 0, 0.3)',
                boxShadow: '0 20px 50px rgba(31, 41, 55, 0.12)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* 装饰性光泽效果 */}
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: darkMode 
                  ? 'linear-gradient(to right, transparent, rgba(255, 213, 79, 0.5), transparent)'
                  : 'linear-gradient(to right, transparent, rgba(255, 193, 7, 0.7), transparent)',
              }} />
              
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <AnimatedBox
                  animate={{ 
                    rotate: [0, 5, 0, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 0.8,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1]
                  }}
                >
                  <Avatar
                    sx={{
                      m: 2,
                      width: 72,
                      height: 72,
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
                      <LockOutlinedIcon 
                        sx={{ 
                          fontSize: 36, 
                          color: '#ff9800',
                          filter: 'drop-shadow(0 2px 4px rgba(255, 152, 0, 0.3))'
                        }} 
                      />
                    </Box>
                  </Avatar>
                </AnimatedBox>
                
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{
                    mb: 1,
                    fontWeight: 800,
                    background: 'linear-gradient(to right, #ffc107, #ff9800)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.5px',
                  }}
                >
                  {title}
                </Typography>
                
                <Typography variant="body2" sx={{ 
                  color: 'text.secondary',
                  mb: 3,
                  textAlign: 'center',
                  maxWidth: '300px',
                }}>
                  输入您的邮箱，我们将发送验证邮件
                </Typography>
                
                <Box component="form" noValidate onSubmit={onSubmit} sx={{ width: '100%', mt: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ display: 'grid', columnGap: '16px', gridTemplateColumns: server.data?.AllowDomain.length != 0 && !anyEmail ? "1fr auto" : "1fr" }}>
                      <TextField 
                        fullWidth
                        required
                        name="email"
                        label="邮箱"
                        value={email}
                        helperText={helperText}
                        error={helperText != ""}
                        onChange={emailonChange}
                      />
                      {
                        server.data?.AllowDomain.length != 0 && !anyEmail &&
                        <FormControl sx={{ minWidth: 120 }}>
                          <InputLabel>域名</InputLabel>
                          <Select 
                            label="域名" 
                            value={domain} 
                            onChange={v => setDomain(v.target.value)}
                          >
                            {server.data?.AllowDomain.map(v => <MenuItem value={v}>@{v}</MenuItem>)}
                          </Select>
                        </FormControl>
                      }
                    </Grid>
                    <Grid item xs={12}>
                      <CaptchaWidget ref={captchaRef} onSuccess={setCaptchaToken} hideRefreshButton />
                    </Grid>
                  </Grid>
                  
                  <AnimatedBox
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    sx={{ mt: 2 }}
                  >
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={loading}
                      sx={{
                        mt: 3,
                        mb: 3,
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 600,
                        borderRadius: '12px',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {loading ? (
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
                          发送中...
                        </Box>
                      ) : '发送验证邮件'}
                      
                      {/* 按钮光泽效果 */}
                      <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '40%',
                        background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)',
                        pointerEvents: 'none',
                      }} />
                    </Button>
                  </AnimatedBox>
                </Box>
              </Box>
            </Box>
          </Fade>
          
          <Snackbar
            open={err !== ""}
            autoHideDuration={6000}
            onClose={() => setErr("")}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            sx={{ mt: 2 }}
            TransitionComponent={Slide}
          >
            <Alert
              onClose={() => setErr("")}
              severity="error"
              sx={{ 
                width: '100%',
                backdropFilter: 'blur(10px)',
                backgroundColor: darkMode ? 'rgba(33, 33, 33, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
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
            TransitionComponent={Slide}
          >
            <Alert
              onClose={() => setSuccess("")}
              severity="success"
              sx={{ 
                width: '100%',
                backdropFilter: 'blur(10px)',
                backgroundColor: darkMode ? 'rgba(33, 33, 33, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                borderRadius: '12px',
                color: darkMode ? '#f5f5f5' : '#212121'
              }}
            >
              {success}
            </Alert>
          </Snackbar>
          
          <Dialog 
            open={open}
            PaperProps={{
              sx: {
                borderRadius: '24px',
                backdropFilter: 'blur(12px)',
                backgroundColor: darkMode ? 'rgba(33, 33, 33, 0.85)' : 'rgba(255, 255, 255, 0.9)',
                border: darkMode ? '1px solid rgba(255, 179, 0, 0.2)' : '1px solid rgba(255, 179, 0, 0.3)',
                boxShadow: '0 20px 50px rgba(31, 41, 55, 0.12)',
              }
            }}
          >
            <DialogTitle sx={{ 
              background: 'linear-gradient(to right, #ffc107, #ff9800)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
            }}>
              邮件已发送
            </DialogTitle>
            <DialogContent>
              <Typography sx={{ color: darkMode ? '#e0e0e0' : '#424242' }}>
                请到收件箱（或垃圾箱）点击验证链接以继续。
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={handleClose}
                sx={{
                  background: 'linear-gradient(to right, #ffc107, #ff9800)',
                  color: 'white',
                  borderRadius: '12px',
                  fontWeight: 600,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 12px rgba(255, 179, 0, 0.3)',
                  },
                }}
              >
                返回首页
              </Button>
            </DialogActions>
          </Dialog>
          
          {loading && <Loading />}
        </Container>
      </Box>
    </ThemeProvider>
  );
}