// Login.tsx - 修改后的版本
import * as React from 'react';
import { useState } from 'react';
import { 
  Box, Button, TextField, Link, Grid, Avatar, 
  Typography, Container, Snackbar, Alert, Slide} from '@mui/material';
import { 
  LockOutlined} from '@mui/icons-material';
import { useSetAtom } from 'jotai';
import { token, user } from '@/store/store';
import { login } from '@/apis/apis';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Loading from '@/components/Loading';
import CheckInput, { refType } from '@/components/CheckInput';
import useTitle from '@/hooks/useTitle';
import CaptchaWidget from '@/components/CaptchaWidget';
import type { refType as CaptchaWidgetRef } from '@/components/CaptchaWidget';
import { ApiErr } from '@/apis/error';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { motion } from 'framer-motion';
import Fade from '@mui/material/Fade';

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
          overflow: 'hidden', // 防止滚动条出现
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
          overflow: 'hidden', // 防止滚动条出现
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

export default function SignIn() {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const setToken = useSetAtom(token)
  const setUserInfo = useSetAtom(user)
  const checkList = React.useRef<Map<string, refType>>(new Map<string, refType>())
  const navigate = useNavigate();
  useTitle("登录")
  const captchaRef = React.useRef<CaptchaWidgetRef>(null)
  const [captchaToken, setCaptchaToken] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const currentTheme = darkMode ? darkTheme : lightTheme;

  // 监听系统主题变化
  React.useEffect(() => {
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



  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const postData = {
      email: data.get('email')?.toString(),
      password: data.get('password')?.toString(),
    }
    if (!Array.from(checkList.current.values()).map(v => v.verify()).reduce((p, v) => (p == true) && (v == true))) {
      return
    }

    if (loading) return
    setLoading(true)
    login(postData.email!, postData.password ?? "", captchaToken).
      then(v => {
        if (!v) return
        setToken(v.token)
        setUserInfo({
          uuid: v.uuid,
          name: v.name,
        })
        navigate("/profile")
      }).
      catch(v => {
        captchaRef.current?.reload()
        console.warn(v)
        if (v instanceof ApiErr) {
          switch (v.code) {
            case 10:
              setErr("验证码错误")
              return
            case 6:
              setErr("密码或用户名错误")
              return
            case 9:
              setErr("用户已被禁用")
              return
          }
        }
        setErr(String(v))
      }).
      finally(() => setLoading(false))
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 0,
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: darkMode ? 'inherit' : '#ffffff',
        }}
      >
        {/* 装饰性背景元素 - 修复尺寸问题 */}
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
        
        <Container 
          maxWidth="xs" 
          component="main" 
          sx={{ 
            position: 'relative', 
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            maxHeight: '100vh',
            my: 0,
            py: 0,
          }}
        >
          <Fade in={true} timeout={600}>
            <Box
              sx={{
                width: '100%',
                p: { xs: 3, sm: 4, md: 5 },
                borderRadius: '24px',
                backdropFilter: 'blur(12px)',
                backgroundColor: darkMode ? 'rgba(33, 33, 33, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                border: darkMode ? '1px solid rgba(255, 179, 0, 0.2)' : '1px solid rgba(255, 179, 0, 0.3)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.12)',
                position: 'relative',
                overflow: 'hidden',
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
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
                  flex: '1 1 auto',
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
                      <LockOutlined 
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
                    fontSize: '1.4rem',
                    background: 'linear-gradient(to right, #ffc107, #ff9800)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.5px',
                  }}
                >
                  欢迎回来
                </Typography>
                
                <Typography variant="body2" sx={{ 
                  color: 'text.secondary',
                  mb: 2,
                  textAlign: 'center',
                  maxWidth: '300px',
                  fontSize: '0.875rem',
                }}>
                  请使用您的账号登录系统
                </Typography>
                
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ 
                    width: '100%', 
                    mt: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    flex: '1 1 auto',
                  }}
                >
                  <Grid container spacing={1.5}>
                    <Grid item xs={12}>
                      <AnimatedBox
                        animate={{
                          y: emailFocused ? -5 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <CheckInput
                          ref={(dom) => {
                            dom && checkList.current.set("1", dom)
                          }}
                          checkList={[
                            {
                              errMsg: "需为邮箱",
                              reg: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                            }
                          ]}
                          required
                          fullWidth
                          id="email"
                          label="邮箱"
                          name="email"
                          autoComplete="email"
                          autoFocus
                          sx={{ 
                            mb: 0.5,
                            height: '50px',
                            '& .MuiInputBase-root': {
                              height: '100%',
                            },
                          }}
                          size="medium"
                          onFocus={() => setEmailFocused(true)}
                          onBlur={() => setEmailFocused(false)}
                        />
                      </AnimatedBox>
                    </Grid>
                    <Grid item xs={12}>
                      <AnimatedBox
                        animate={{
                          y: passwordFocused ? -5 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <TextField
                          required
                          fullWidth
                          name="password"
                          label="密码"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          sx={{ 
                            mb: 0.5,
                            height: '50px',
                            '& .MuiInputBase-root': {
                              height: '100%',
                            },
                          }}
                          size="medium"
                          onFocus={() => setPasswordFocused(true)}
                          onBlur={() => setPasswordFocused(false)}
                        />
                      </AnimatedBox>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ 
                        mt: 0.5, 
                        mb: 0.5, 
                        height: '60px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                        <CaptchaWidget 
                          ref={captchaRef} 
                          onSuccess={setCaptchaToken}
                          hideRefreshButton={true}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ 
                    flex: '0 0 auto',
                    display: 'flex', 
                    flexDirection: 'column',
                    mt: 'auto',
                    mb: 1
                  }}>
                    <AnimatedBox
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{
                          mt: 1.5,
                          mb: 1.5,
                          py: 1.2,
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
                            登录中...
                          </Box>
                        ) : '登录'}
                        
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
                    
                    <Grid container justifyContent="center">
                      <Grid item>
                        <Link
                          component={RouterLink}
                          to="/forgot_email"
                          variant="body2"
                          sx={{
                            display: 'block',
                            py: 0.8,
                            px: 1.2,
                            borderRadius: '8px',
                            transition: 'all 0.2s ease',
                            fontSize: '0.8rem',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 179, 0, 0.1)',
                            },
                          }}
                        >
                          忘记密码?
                        </Link>
                      </Grid>
                    </Grid>
                    
                    <Grid container justifyContent="center">
                      <Grid item>
                        <Link
                          component={RouterLink}
                          to="/register"
                          variant="body2"
                          sx={{
                            display: 'block',
                            py: 0.8,
                            px: 1.2,
                            borderRadius: '8px',
                            transition: 'all 0.2s ease',
                            fontSize: '0.8rem',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 179, 0, 0.1)',
                            },
                          }}
                        >
                          注册新账号
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
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
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                borderRadius: '12px',
                color: darkMode ? '#f5f5f5' : '#212121'
              }}
            >
              {err}
            </Alert>
          </Snackbar>
          
          {loading && <Loading />}
        </Container>
      </Box>
    </ThemeProvider>
  );
}