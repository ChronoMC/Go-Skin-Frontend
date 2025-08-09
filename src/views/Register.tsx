// Register.tsx
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink } from "react-router-dom";
import { getConfig, register } from '@/apis/apis'
import CheckInput, { refType } from '@/components/CheckInput'
import { useRef, useState } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Loading from '@/components/Loading'
import { useNavigate } from "react-router-dom";
import CaptchaWidget from '@/components/CaptchaWidget';
import type { refType as CaptchaWidgetRef } from '@/components/CaptchaWidget'
import useTitle from '@/hooks/useTitle';
import { ApiErr } from '@/apis/error';
import { useSetAtom } from 'jotai';
import { token, user } from '@/store/store';
import { useRequest } from 'ahooks';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import { motion } from 'framer-motion';

// 使用与登录页面相同的主题
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

export default function SignUp() {
  const [regErr, setRegErr] = useState("");
  const navigate = useNavigate();
  const [captchaToken, setCaptchaToken] = useState("");
  const captchaRef = useRef<CaptchaWidgetRef>(null)
  const [loading, setLoading] = useState(false);
  useTitle("注册")
  const setToken = useSetAtom(token)
  const setUserInfo = useSetAtom(user)
  const [code, setCode] = useState("")
  const [email, setEmail] = useState("")
  const [disableEmail, setDisableEmail] = useState(false)

  const u = new URL(location.href)

  React.useEffect(() => {
    const e = u.searchParams.get("email")
    if (!e || e == "") return
    setEmail(e)
    setDisableEmail(true)
  }, [u.searchParams])

  const server = useRequest(getConfig, {
    cacheKey: "/api/v1/config",
    staleTime: 60000,
    onError: e => {
      console.warn(e)
      setRegErr(String(e))
    }
  })

  React.useEffect(() => {
    if (!server.data || !server.data.NeedEmail) return

    const code = u.searchParams.get("code")
    if (!code || code == "") {
      navigate("/register_email")
      return
    }
    setCode(code)
  }, [server.data, u.searchParams, navigate])

  const checkList = React.useRef<Map<string, refType>>(new Map<string, refType>())

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return
    const data = new FormData(event.currentTarget);
    const d = {
      password: data.get('password')?.toString(),
      username: data.get("username")?.toString()
    }
    if (!Array.from(checkList.current.values()).map(v => v.verify()).reduce((p, v) => (p == true) && (v == true))) {
      return
    }
    if (captchaToken == "") {
      setRegErr("验证码无效")
      return
    }
    setLoading(true)
    register(email ?? "", d.username ?? "", d.password ?? "", captchaToken, code).
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
              setRegErr("验证码错误")
              return
            case 3:
              setRegErr("邮箱已存在")
              return
            case 7:
              setRegErr("用户名已存在")
              return
          }
        }
        setRegErr(String(v))
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
        {/* 装饰性背景元素 - 与登录页面相同 */}
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
                  创建新账户
                </Typography>
                
                <Typography variant="body2" sx={{ 
                  color: 'text.secondary',
                  mb: 3,
                  textAlign: 'center',
                  maxWidth: '300px',
                }}>
                  加入我们，开启专属体验
                </Typography>
                
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ width: '100%', mt: 1 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CheckInput
                        checkList={[
                          {
                            errMsg: "需为邮箱",
                            reg: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                          }
                        ]}
                        required
                        fullWidth
                        name="email"
                        label="邮箱"
                        value={email}
                        disabled={disableEmail}
                        onChange={v => setEmail(v.target.value)}
                        autoComplete="email"
                        ref={(dom) => {
                          dom && checkList.current.set("1", dom)
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CheckInput
                        ref={(dom) => {
                          dom && checkList.current.set("2", dom)
                        }}
                        checkList={[
                          {
                            errMsg: "长度在 3-16 之间",
                            reg: /^.{3,16}$/
                          }
                        ]}
                        required
                        fullWidth
                        name="username"
                        label="角色名"
                        autoComplete="username"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CheckInput
                        ref={(dom) => {
                          dom && checkList.current.set("3", dom)
                        }}
                        checkList={[
                          {
                            errMsg: "长度在 6-50 之间",
                            reg: /^.{6,50}$/
                          }
                        ]}
                        required
                        fullWidth
                        label="密码"
                        type="password"
                        name="password"
                        autoComplete="new-password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CaptchaWidget ref={captchaRef} onSuccess={setCaptchaToken} />
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
                          注册中...
                        </Box>
                      ) : '注册'}
                      
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
                        to={"/login"}
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
                        已有账户？立即登录
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Fade>
          
          <Snackbar
            open={regErr !== ""}
            autoHideDuration={6000}
            onClose={() => setRegErr("")}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            sx={{ mt: 2 }}
            TransitionComponent={Slide}
          >
            <Alert
              onClose={() => setRegErr("")}
              severity="error"
              sx={{ 
                width: '100%',
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                borderRadius: '12px',
              }}
            >
              {regErr}
            </Alert>
          </Snackbar>
          
          {loading && <Loading />}
        </Container>
      </Box>
    </ThemeProvider>
  );
}