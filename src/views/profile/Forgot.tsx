import { 
  Box, Button, Typography,
  TextField, Grid, Avatar, 
  Snackbar, Alert} from '@mui/material';
import { LockOutlined, ArrowBack, Security, CheckCircle } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { motion } from 'framer-motion';
import { useTitle } from 'ahooks';
import { useEffect, useState } from 'react';
import { produce } from 'immer';
import { forgotPassWord } from '@/apis/apis';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

// 使用与Profile页面相同的主题
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
      default: '#fafafa',
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
    h3: {
      fontWeight: 900,
      letterSpacing: '-0.5px',
      fontSize: '1.65rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.1rem',
    },
    body1: {
      fontSize: '0.9625rem',
    },
    body2: {
      fontSize: '0.825rem',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: '#fafafa',
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
          padding: '8.8px 17.6px',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 2px 10px rgba(255, 193, 7, 0.3)',
          fontSize: '0.88rem',
          minHeight: '39.6px',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 15px rgba(255, 193, 7, 0.4)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #ffb300 0%, #fb8c00 100%)',
          },
        },
        outlined: {
          borderColor: 'rgba(255, 193, 7, 0.5)',
          color: '#ff9800',
          borderWidth: '1px',
          '&:hover': {
            borderColor: '#ff9800',
            backgroundColor: 'rgba(255, 193, 7, 0.08)',
            borderWidth: '1px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '17.6px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid rgba(255, 193, 7, 0.2)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
            border: '1px solid rgba(255, 193, 7, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '17.6px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid rgba(255, 193, 7, 0.2)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
            border: '1px solid rgba(255, 193, 7, 0.4)',
          },
          maxWidth: '100%',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '13.2px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            transition: 'all 0.2s ease',
            '& fieldset': {
              borderColor: 'rgba(255, 193, 7, 0.5)',
              borderWidth: '1px',
            },
            '&:hover fieldset': {
              borderColor: '#ffd54f',
              borderWidth: '1px',
            },
            '&.Mui-focused fieldset': {
              borderWidth: '2px',
              borderColor: '#ffc107',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#757575',
            fontWeight: 500,
            '&.Mui-focused': {
              color: '#ff9800',
              fontWeight: 600,
            },
          },
          '& .MuiInputBase-input': {
            fontSize: '0.9625rem',
            padding: '13.2px 17.6px',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff9c4',
          color: '#ff9800',
          boxShadow: '0 4px 12px rgba(255, 193, 7, 0.3)',
          width: 44,
          height: 44,
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
      default: '#1a1a1a',
      paper: 'rgba(45, 45, 45, 0.95)',
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
    h3: {
      fontWeight: 900,
      letterSpacing: '-0.5px',
      fontSize: '1.65rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.1rem',
    },
    body1: {
      fontSize: '0.9625rem',
    },
    body2: {
      fontSize: '0.825rem',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: '#1a1a1a',
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
          padding: '8.8px 17.6px',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 2px 10px rgba(255, 213, 79, 0.3)',
          fontSize: '0.88rem',
          minHeight: '39.6px',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 15px rgba(255, 213, 79, 0.4)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #ffd54f 0%, #ffb300 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #ffb300 0%, #fb8c00 100%)',
          },
        },
        outlined: {
          borderColor: 'rgba(255, 213, 79, 0.5)',
          color: '#ffd54f',
          borderWidth: '1px',
          '&:hover': {
            borderColor: '#ffd54f',
            backgroundColor: 'rgba(255, 213, 79, 0.08)',
            borderWidth: '1px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '17.6px',
          backgroundColor: 'rgba(45, 45, 45, 0.95)',
          border: '1px solid rgba(255, 213, 79, 0.2)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 213, 79, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '17.6px',
          backgroundColor: 'rgba(45, 45, 45, 0.95)',
          border: '1px solid rgba(255, 213, 79, 0.2)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 213, 79, 0.4)',
          },
          maxWidth: '100%',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '13.2px',
            backgroundColor: 'rgba(66, 66, 66, 0.7)',
            transition: 'all 0.2s ease',
            '& fieldset': {
              borderColor: 'rgba(255, 213, 79, 0.3)',
              borderWidth: '1px',
            },
            '&:hover fieldset': {
              borderColor: '#ffd54f',
              borderWidth: '1px',
            },
            '&.Mui-focused fieldset': {
              borderWidth: '2px',
              borderColor: '#ffc107',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#bdbdbd',
            fontWeight: 500,
            '&.Mui-focused': {
              color: '#ffc107',
              fontWeight: 600,
            },
          },
          '& .MuiInputBase-input': {
            color: '#f5f5f5',
            fontSize: '0.9625rem',
            padding: '13.2px 17.6px',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 213, 79, 0.2)',
          color: '#ffd54f',
          boxShadow: '0 4px 12px rgba(255, 213, 79, 0.3)',
          width: 44,
          height: 44,
        },
      },
    },
  },
});

// 动画组件
const AnimatedBox = motion(Box);
const AnimatedCard = motion(Box);

export default function Forgot() {
    const [err, setErr] = useState("");
    useTitle("重设密码");
    const [passerr, setPasserr] = useState("");
    const [pass, setPass] = useState({
        pass1: "",
        pass2: "",
    });
    const [load, setLoad] = useState(false);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);
    const currentTheme = darkMode ? darkTheme : lightTheme;

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

    useEffect(() => {
        if (pass.pass1 != pass.pass2 && pass.pass2 != "") {
            setPasserr("密码不相等");
            return;
        }
        setPasserr("");
    }, [pass.pass1, pass.pass2]);

    const u = new URL(location.href);

    useEffect(() => {
        setEmail(u.searchParams.get("email") ?? "");
        setCode(u.searchParams.get("code") ?? "");
    }, [u.searchParams]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoad(true);
        forgotPassWord(email, code, pass.pass1).then(() => {
            navigate("/");
        }).catch(e => {
            setErr(String(e));
        }).finally(() => { setLoad(false); });
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
            backgroundColor: darkMode ? 'inherit' : '#fafafa',
          }}
        >
          {/* 背景容器 - 平铺整个页面 */}
          <Box sx={{
            minHeight: '100vh',
            width: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: darkMode 
              ? 'radial-gradient(circle at 10% 20%, rgba(255, 213, 79, 0.1) 0%, rgba(255, 179, 0, 0.05) 20%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(255, 179, 0, 0.1) 0%, rgba(255, 213, 79, 0.05) 20%, transparent 40%), #1a1a1a'
              : 'radial-gradient(circle at 10% 20%, rgba(255, 193, 7, 0.1) 0%, rgba(255, 152, 0, 0.05) 20%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(255, 152, 0, 0.1) 0%, rgba(255, 193, 7, 0.05) 20%, transparent 40%), #fafafa',
            zIndex: 0,
          }} />
          
          {/* 内容容器 */}
          <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            pt: { xs: 2, sm: 4, md: 6 },
            zIndex: 1,
          }}>
            {/* 整体缩放容器 - 71.5% (65% * 1.1 = 71.5%) */}
            <Box sx={{
              transform: 'scale(0.715)',
              transformOrigin: 'center top',
              width: 'calc(100% / 0.715)',
              minHeight: 'calc(100vh / 0.715)',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              position: 'relative',
            }}>
              <Box sx={{
                minHeight: '100vh',
                position: 'relative',
                overflow: 'hidden',
                p: { xs: 1.1, md: 2.2 },
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                pt: { xs: 2.2, sm: 4.4, md: 6.6 },
              }}>
                {/* 返回按钮 */}
                <AnimatedBox
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  sx={{
                    position: 'absolute',
                    top: { xs: 2.2, sm: 4.4, md: 6.6 },
                    left: { xs: 2.2, sm: 4.4, md: 6.6 },
                    zIndex: 2,
                  }}
                >
                  <Button
                    component={RouterLink}
                    to="/login"
                    variant="outlined"
                    startIcon={<ArrowBack />}
                    sx={{
                      borderRadius: '17.6px',
                      fontWeight: 600,
                      px: 2.2,
                      py: 1.1,
                      fontSize: '0.88rem',
                      minHeight: '35.2px',
                      backdropFilter: 'blur(10px)',
                      backgroundColor: darkMode ? 'rgba(45, 45, 45, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    返回登录
                  </Button>
                </AnimatedBox>

                {/* 主内容卡片 */}
                <AnimatedCard
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  sx={{
                    maxWidth: '500px',
                    mx: 'auto',
                    width: '100%',
                    mt: { xs: 8.8, sm: 11, md: 13.2 },
                  }}
                >
                  <Box sx={{
                    p: { xs: 3.3, sm: 4.4, md: 5.5 },
                    borderRadius: '17.6px',
                    backgroundColor: darkMode ? 'rgba(45, 45, 45, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                    border: darkMode ? '1px solid rgba(255, 213, 79, 0.2)' : '1px solid rgba(255, 193, 7, 0.2)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '2.2px',
                      background: darkMode 
                        ? 'linear-gradient(90deg, transparent, rgba(255, 213, 79, 0.7), transparent)'
                        : 'linear-gradient(90deg, transparent, rgba(255, 193, 7, 0.7), transparent)',
                    },
                  }}>
                    {/* 页面标题 */}
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      mb: 4.4,
                    }}>
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
                        sx={{ mb: 2.2 }}
                      >
                        <Avatar
                          sx={{
                            width: 61.6,
                            height: 61.6,
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
                                fontSize: 39.6, 
                                color: '#ff9800',
                                filter: 'drop-shadow(0 2px 4px rgba(255, 152, 0, 0.3))'
                              }} 
                            />
                          </Box>
                        </Avatar>
                      </AnimatedBox>
                      
                      <Typography component="h1" variant="h3" sx={{ 
                        fontWeight: 900,
                        background: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-0.5px',
                        mb: 1.1,
                        textAlign: 'center',
                      }}>
                        找回密码
                      </Typography>
                      
                      <Typography variant="body2" sx={{ 
                        color: 'text.secondary',
                        textAlign: 'center',
                        maxWidth: '300px',
                        lineHeight: 1.5,
                      }}>
                        请设置您的新密码，确保账户安全
                      </Typography>
                    </Box>

                    {/* 密码表单 */}
                    <Box component="form" noValidate onSubmit={onSubmit} sx={{ width: '100%' }}>
                      <Grid container spacing={2.2}>
                        <Grid item xs={12}>
                          <TextField
                            margin="normal"
                            fullWidth
                            label="新密码"
                            type="password"
                            required
                            value={pass.pass1}
                            onChange={p => setPass(produce(v => { v.pass1 = p.target.value }))}
                            autoComplete="new-password"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                  borderColor: darkMode ? '#ffd54f' : '#ffd54f',
                                },
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            margin="normal"
                            fullWidth
                            label="确认新密码"
                            type="password"
                            required
                            value={pass.pass2}
                            error={passerr !== ""}
                            helperText={passerr}
                            onChange={p => setPass(produce(v => { v.pass2 = p.target.value }))}
                            autoComplete="new-password"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                  borderColor: darkMode ? '#ffd54f' : '#ffd54f',
                                },
                              },
                            }}
                          />
                        </Grid>
                      </Grid>
                      
                      {/* 安全提示 */}
                      <Box sx={{
                        mt: 2.2,
                        p: 2.2,
                        borderRadius: '13.2px',
                        backgroundColor: darkMode ? 'rgba(255, 213, 79, 0.08)' : 'rgba(255, 193, 7, 0.08)',
                        border: darkMode ? '1px solid rgba(255, 213, 79, 0.2)' : '1px solid rgba(255, 193, 7, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.1,
                      }}>
                        <Security sx={{ 
                          color: darkMode ? '#ffd54f' : '#ff9800',
                          fontSize: '1.1rem'
                        }} />
                        <Typography variant="body2" sx={{ 
                          color: 'text.secondary',
                          fontSize: '0.825rem',
                        }}>
                          建议使用包含字母、数字和特殊字符的强密码
                        </Typography>
                      </Box>
                      
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={load}
                        sx={{ 
                          mt: 3.3, 
                          mb: 2.2,
                          py: 1.1,
                          fontSize: '0.88rem',
                          fontWeight: 600,
                          borderRadius: '12px',
                          position: 'relative',
                          overflow: 'hidden',
                          minHeight: '44px',
                        }}
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
                            提交中...
                          </Box>
                        ) : '重置密码'}
                        
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
                    </Box>
                  </Box>
                </AnimatedCard>

                {/* 页脚 */}
                <AnimatedBox
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.55 }}
                  sx={{
                    position: 'absolute',
                    bottom: '1.1rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1,
                    px: 1.1,
                  }}
                >
                  <Typography variant="body2" sx={{ 
                    color: 'text.secondary',
                    fontWeight: 500,
                    opacity: 0.7,
                    maxWidth: '100%',
                    wordBreak: 'break-word',
                    fontSize: '0.77rem',
                    textAlign: 'center',
                  }}>
                    © 2024 Go-Skin
                  </Typography>
                </AnimatedBox>
              </Box>
            </Box>
          </Box>

          {/* 错误提示 */}
          <Snackbar
            open={err !== ""}
            autoHideDuration={6000}
            onClose={() => setErr("")}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            sx={{ mt: 2, zIndex: 1000 }}
          >
            <Alert
              onClose={() => setErr("")}
              severity="error"
              icon={<CheckCircle />}
              sx={{ 
                width: '100%',
                backdropFilter: 'blur(10px)',
                backgroundColor: darkMode ? 'rgba(33, 33, 33, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                borderRadius: '12px',
                color: darkMode ? '#f5f5f5' : '#212121',
                '& .MuiAlert-icon': {
                  color: '#f44336',
                },
              }}
            >
              {err}
            </Alert>
          </Snackbar>

          {/* 添加浮动动画的 CSS */}
          <style>
            {`
              @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-11px) rotate(180deg); }
              }
            `}
          </style>
        </Box>
      </ThemeProvider>
    );
} 