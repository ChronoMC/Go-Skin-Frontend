import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useSetAtom } from 'jotai';
import { token, user } from '@/store/store';
import { getConfig, login } from '@/apis/apis';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Loading from '@/components/Loading';
import CheckInput, { refType } from '@/components/CheckInput';
import useTitle from '@/hooks/useTitle';
import CaptchaWidget from '@/components/CaptchaWidget';
import type { refType as CaptchaWidgetRef } from '@/components/CaptchaWidget';
import { ApiErr } from '@/apis/error';
import { useRequest } from 'ahooks';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import { motion } from 'framer-motion';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8b5cf6',
    },
    background: {
      default: 'linear-gradient(135deg, #dbeafe 0%, #ede9fe 100%)',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
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
          background: 'linear-gradient(135deg, #dbeafe 0%, #ede9fe 100%)',
          backgroundAttachment: 'fixed',
          minHeight: '100vh',
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
          boxShadow: '0 4px 6px rgba(79, 70, 229, 0.1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 12px rgba(79, 70, 229, 0.2)',
          },
          '&.Mui-disabled': {
            opacity: 0.7,
          },
        },
        contained: {
          background: 'linear-gradient(to right, #6366f1, #8b5cf6)',
          '&:hover': {
            background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            '& fieldset': {
              borderColor: 'rgba(203, 213, 225, 0.5)',
            },
            '&:hover fieldset': {
              borderColor: '#c7d2fe',
            },
            '&.Mui-focused fieldset': {
              borderWidth: '1px',
              borderColor: '#818cf8',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#64748b',
            '&.Mui-focused': {
              color: '#6366f1',
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
          backgroundColor: 'rgba(255, 255, 255, 0.65)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '0 8px 32px rgba(31, 41, 55, 0.1)',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: '#e0e7ff',
          color: '#6366f1',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.15)',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          color: '#4f46e5',
          textDecoration: 'none',
          transition: 'all 0.2s ease',
          '&:hover': {
            color: '#7c3aed',
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
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
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

  const server = useRequest(getConfig, {
    cacheKey: "/api/v1/config",
    staleTime: 60000,
    onError: e => {
      console.warn(e)
      setErr(String(e))
    }
  })

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
    <ThemeProvider theme={theme}>
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
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%)',
          zIndex: 0,
        }} />
        
        <Box sx={{
          position: 'absolute',
          bottom: '-15%',
          left: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.15) 100%)',
          zIndex: 0,
        }} />
        
        <Container maxWidth="xs" component="main" sx={{ position: 'relative', zIndex: 1 }}>
          <Fade in={true} timeout={600}>
            <Box
              sx={{
                p: { xs: 3, sm: 4, md: 5 },
                borderRadius: '24px',
                backdropFilter: 'blur(12px)',
                backgroundColor: 'rgba(255, 255, 255, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
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
                background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.8), transparent)',
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
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
                        backdropFilter: 'blur(4px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <LockOutlinedIcon 
                        sx={{ 
                          fontSize: 36, 
                          color: '#6366f1',
                          filter: 'drop-shadow(0 2px 4px rgba(99, 102, 241, 0.3))'
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
                    background: 'linear-gradient(to right, #6366f1, #8b5cf6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.5px',
                  }}
                >
                  欢迎回来
                </Typography>
                
                <Typography variant="body2" sx={{ 
                  color: 'text.secondary',
                  mb: 3,
                  textAlign: 'center',
                  maxWidth: '300px',
                }}>
                  请使用您的账号登录系统
                </Typography>
                
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ width: '100%', mt: 1 }}
                >
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
                      margin="normal"
                      fullWidth
                      id="email"
                      label="邮箱"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      sx={{ mb: 2 }}
                      onFocus={() => setEmailFocused(true)}
                      onBlur={() => setEmailFocused(false)}
                    />
                  </AnimatedBox>
                  
                  <AnimatedBox
                    animate={{
                      y: passwordFocused ? -5 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <TextField
                      margin="normal"
                      fullWidth
                      name="password"
                      label="密码"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      sx={{ mb: 2 }}
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                    />
                  </AnimatedBox>
                  
                  <Box sx={{ mt: 2, mb: 2 }}>
                    <CaptchaWidget ref={captchaRef} onSuccess={setCaptchaToken} />
                  </Box>
                  
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
                        mt: 2,
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
                  
                  <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
                    <Grid item>
                      {server.data?.NeedEmail && (
                        <Link
                          component={RouterLink}
                          to="/forgot_email"
                          variant="body2"
                          sx={{
                            display: 'block',
                            py: 1,
                            px: 1.5,
                            borderRadius: '8px',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              backgroundColor: 'rgba(199, 210, 254, 0.2)',
                            },
                          }}
                        >
                          忘记密码?
                        </Link>
                      )}
                    </Grid>
                    <Grid item>
                      <Link
                        component={RouterLink}
                        to="/register"
                        variant="body2"
                        sx={{
                          display: 'block',
                          py: 1,
                          px: 1.5,
                          borderRadius: '8px',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            backgroundColor: 'rgba(199, 210, 254, 0.2)',
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
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                borderRadius: '12px',
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