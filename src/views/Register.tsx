// Register.tsx - 修改后的版本
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

// 使用与 HomePage 相似的设计语言
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

// 深色主题 - 与 HomePage 保持一致
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
const AnimatedBox = motion.create(Box);

export default function SignUp() {
  const [regErr, setRegErr] = useState("");
  const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
  useTitle("注册")
  const setToken = useSetAtom(token)
  const setUserInfo = useSetAtom(user)
  const [code, setCode] = useState("")
  const [email, setEmail] = useState("")
  const [disableEmail, setDisableEmail] = useState(false)
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const currentTheme = darkMode ? darkTheme : lightTheme;
  const [captchaToken, setCaptchaToken] = useState<string>("");

  const u = new URL(location.href)

  // 监听系统主题变化
  React.useEffect(() => {
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
      setLoading(true)
    register(email ?? "", d.username ?? "", d.password ?? "", captchaToken, code).
      then(v => {
        if (!v || !v.succeeded) return
        navigate("/login")
      }).
      catch(v => {
        console.warn(v)
        const errorMessage = String(v)
        if (errorMessage.includes("邮箱") || errorMessage.includes("email")) {
          setRegErr("邮箱已存在")
        } else if (errorMessage.includes("用户名") || errorMessage.includes("username")) {
          setRegErr("用户名已存在")
        } else {
          setRegErr(errorMessage)
        }
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
        {/* 装饰性背景元素 - 与 HomePage 保持一致 */}
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
                    fontSize: '1.4rem',
                    background: 'linear-gradient(to right, #ffc107, #ff9800)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.5px',
                  }}
                >
                  创建新账户
                </Typography>
                
                <Typography variant="body2" sx={{ 
                  color: 'text.secondary',
                  mb: 2,
                  textAlign: 'center',
                  maxWidth: '300px',
                  fontSize: '0.875rem',
                }}>
                  加入我们，开启专属体验
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
                        sx={{ 
                          mb: 0.5,
                          height: '50px',
                          '& .MuiInputBase-root': {
                            height: '100%',
                          },
                        }}
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
                            errMsg: "用户名长度在6-18位之间，只能包含大小写字母、数字、横线和下划线",
                            reg: /^[a-zA-Z0-9_-]{6,18}$/
                          }
                        ]}
                        required
                        fullWidth
                        name="username"
                        label="角色名"
                        autoComplete="username"
                        sx={{ 
                          mb: 0.5,
                          height: '50px',
                          '& .MuiInputBase-root': {
                            height: '100%',
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CheckInput
                        ref={(dom) => {
                          dom && checkList.current.set("3", dom)
                        }}
                        checkList={[
                          {
                            errMsg: "密码至少8位，必须包含至少一个大写字母、小写字母、数字和符号",
                            reg: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/
                          }
                        ]}
                        required
                        fullWidth
                        label="密码"
                        type="password"
                        name="password"
                        autoComplete="new-password"
                        sx={{ 
                          mb: 0.5,
                          height: '50px',
                          '& .MuiInputBase-root': {
                            height: '100%',
                          },
                        }}
                      />
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
                          mt: 1.5, // 统一间距
                          mb: 1.5, // 统一间距
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
                          已有账户？立即登录
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
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
                backgroundColor: darkMode ? 'rgba(33, 33, 33, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                borderRadius: '12px',
                color: darkMode ? '#f5f5f5' : '#212121'
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