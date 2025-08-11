import { useState, useEffect } from 'react';
import { 
  Box, Button, Typography, Container, 
  Grid, Avatar, Paper, IconButton, 
  TextField, Link, Snackbar, Alert, Fade, Slide
} from '@mui/material';
import { 
  AccountCircle, 
  ArrowForward, Download, 
  Palette, Notifications, 
  Menu, Close, LockOutlined,
  Brightness4, 
  Brightness7 
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { motion } from 'framer-motion';
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
import React from 'react';

// 浅色主题 - 使用黄色主题和纯白色背景
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

// 深色主题 - 使用黄色主题
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
const AnimatedBox = motion(Box);
const AnimatedPaper = motion(Paper);

// 公告数据
const notices = [
  {
    id: 1,
    title: '网站维护通知',
    content: '本周六凌晨2点至4点将进行系统维护，届时网站将暂时无法访问。',
    date: '2025-08-07',
    author: '管理员',
    important: true
  }
];

type Notice = {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  important: boolean;
};

export default function HomePage() {
  const [activeNotice, setActiveNotice] = useState<Notice | null>(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const setToken = useSetAtom(token)
  const setUserInfo = useSetAtom(user)
  const checkList = React.useRef<Map<string, refType>>(new Map<string, refType>())
  const navigate = useNavigate();
  useTitle("首页")
  const captchaRef = React.useRef<CaptchaWidgetRef>(null)
  const [captchaToken, setCaptchaToken] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  
  // 添加主题状态 - 简化切换逻辑
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const currentTheme = darkMode ? darkTheme : lightTheme;

  const server = useRequest(getConfig, {
    cacheKey: "/api/v1/config",
    staleTime: 60000,
    onError: e => {
      console.warn(e)
      setErr(String(e))
    }
  })

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

  // 处理主题切换 - 简化逻辑
  const toggleThemeMode = () => {
    setDarkMode(!darkMode);
  };

  // 从后端获取公告的模拟函数
  useEffect(() => {
    console.log("从后端获取公告数据...");
  }, []);

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: darkMode ? 'inherit' : '#ffffff',
        }}
      >
        {/* 装饰性背景元素 - 只在圆形元素上使用黄色 */}
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
        
        {/* 导航栏 */}
        <Box sx={{
          p: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
          backgroundColor: darkMode ? 'inherit' : '#ffffff',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ 
              bgcolor: 'primary.main', 
              mr: 1.5,
              color: darkMode ? '#000' : '#000'
            }}>
              <Palette />
            </Avatar>
            <Typography variant="h6" sx={{ 
              fontWeight: 800,
              background: 'linear-gradient(to right, #ffc107, #ff9800)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Corona Studio
            </Typography>
          </Box>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button color="inherit" sx={{ fontWeight: 700 }}>首页</Button>
            <Button color="inherit">皮肤库</Button>
            <Button 
              color="inherit" 
              onClick={() => window.location.href = 'https://kb.corona.studio/zhCN/'}
            >
              帮助文档
            </Button>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* 添加主题切换按钮 */}
            <IconButton 
              onClick={toggleThemeMode}
              sx={{ 
                borderRadius: '12px',
                backdropFilter: 'blur(12px)',
                backgroundColor: darkMode ? 'rgba(33, 33, 33, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                border: darkMode ? '1px solid rgba(255, 179, 0, 0.2)' : '1px solid rgba(255, 179, 0, 0.3)',
                color: darkMode ? '#ffd54f' : '#ff9800',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: darkMode ? 'rgba(66, 66, 66, 0.7)' : 'rgba(255, 255, 255, 0.9)',
                }
              }}
            >
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <Button 
              variant="outlined" 
              startIcon={<AccountCircle />}
              sx={{ borderRadius: '12px' }}
              onClick={() => window.location.href = '/login'}
            >
              登录
            </Button>
            <IconButton sx={{ display: { md: 'none' } }}>
              <Menu />
            </IconButton>
          </Box>
        </Box>
        
        {/* 主内容区 */}
        <Container maxWidth="lg" sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          py: 2,
          backgroundColor: darkMode ? 'inherit' : '#ffffff',
          overflow: 'auto',
        }}>
          <Grid container spacing={4} alignItems="flex-start" sx={{ height : '100%' }}>
            <Grid item xs={12} md={6} sx={{ 
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}>
              <AnimatedBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                sx={{ 
                  mb: 3,
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <Box sx={{ 
                  flex: 1,
                }}>
                  <Typography variant="h2" sx={{ 
                    fontWeight: 900,
                    lineHeight: 1.2,
                    mb: 2,
                    background: 'linear-gradient(to right, #ffb300, #fb8c00)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: { xs: '2.5rem', md: '3rem' }
                  }}>
                    CMFS 皮肤站
                  </Typography>
                  
                  <Typography variant="h6" sx={{ 
                    color: 'text.secondary',
                    mb: 4,
                    maxWidth: '500px',
                    fontSize: { xs: '1rem', md: '1.25rem' }
                  }}>
                    由 Corona Studio 开发的轻量皮肤站，旨在提供更高的性能和更轻量的 Yggdrasil API 鉴权认证；同时也是部分 CMFS 服务器的账号验证系统。
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button 
                      variant="contained" 
                      size="large"
                      endIcon={<ArrowForward />}
                      sx={{ minWidth: '180px' }}
                      onClick={() => window.location.href = '/profile'}
                    >
                      进入个人账户管理
                    </Button>
                    <Button 
                      variant="outlined" 
                      size="large"
                      startIcon={<Download />}
                      onClick={() => window.location.href = '/register'}
                    >
                      立即注册！
                    </Button>
                  </Box>
                </Box>
                
                {/* 左下角 - 公告区域 - 增加与简介区域的距离 */}
                <AnimatedBox
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  sx={{ 
                    position: 'relative',
                    mt: 3,
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <Box sx={{
                    width: '100%',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '24px',
                    backdropFilter: 'blur(12px)',
                    backgroundColor: darkMode ? 'rgba(33, 33, 33, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                    border: darkMode ? '1px solid rgba(255, 179, 0, 0.2)' : '1px solid rgba(255, 179, 0, 0.3)',
                    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.12)',
                    p: 3,
                    position: 'relative',
                    backgroundImage: darkMode 
                      ? 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'100\' height=\'100\' fill=\'none\'/%3E%3Cpath d=\'M20,20 L20,80 L80,80 L80,20 Z\' stroke=\'%23ffd54f\' stroke-width=\'1\' fill=\'none\' stroke-dasharray=\'5,5\'/%3E%3C/svg%3E")'
                      : 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'100\' height=\'100\' fill=\'none\'/%3E%3Cpath d=\'M20,20 L20,80 L80,80 L80,20 Z\' stroke=\'%23ff9800\' stroke-width=\'1\' fill=\'none\' stroke-dasharray=\'5,5\'/%3E%3C/svg%3E")',
                    backgroundSize: '40px 40px',
                  }}>
                    {/* 公告板标题 - 将按钮移到标题右侧 */}
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center', 
                      mb: 2 
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{
                          width: 24,
                          height: 24,
                          backgroundColor: '#f44336',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                          mr: 1.5
                        }}>
                          <Notifications sx={{ fontSize: 16, color: 'white' }} />
                        </Box>
                        <Typography variant="h6" sx={{ 
                          fontWeight: 700, 
                          color: '#ff9800'
                        }}>
                          最新公告
                        </Typography>
                      </Box>
                      
                      {/* 将查看按钮移到标题右侧 */}
                      <Button 
                        variant="outlined" 
                        size="small"
                        endIcon={<ArrowForward />}
                        sx={{ borderRadius: '20px' }}
                      >
                        查看全部
                      </Button>
                    </Box>
                    
                    {/* 公告列表 */}
                    <Box sx={{ 
                      flex: 1, 
                      position: 'relative', 
                      overflowY: 'auto',
                      maxHeight: '200px',
                      pr: 1,
                    }}>
                      {notices.map((notice, index) => (
                        <AnimatedPaper
                          key={notice.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setActiveNotice(notice)}
                          sx={{ 
                            p: 2,
                            mb: 2,
                            position: 'relative',
                            backgroundColor: notice.important 
                              ? (darkMode ? 'rgba(121, 85, 72, 0.4)' : 'rgba(255, 241, 242, 0.9)') 
                              : (darkMode ? 'rgba(69, 90, 100, 0.4)' : 'rgba(255, 251, 235, 0.9)'),
                            borderRadius: '12px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            borderLeft: `4px solid ${notice.important ? '#f44336' : '#ff9800'}`,
                            cursor: 'pointer',
                            transform: `rotate(${index % 2 === 0 ? '-0.5' : '0.5'}deg)`,
                            transition: 'all 0.3s ease',
                            '&:before': {
                              content: '""',
                              position: 'absolute',
                              top: 10,
                              right: 10,
                              width: 24,
                              height: 24,
                              backgroundImage: darkMode 
                                ? 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'%3E%3Cpath fill=\'%23ffd54f\' d=\'M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H6V4h2v8l2.5-1.5L13 12V4h5v16z\'/%3E%3C/svg%3E")'
                                : 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'%3E%3Cpath fill=\'%23ff9800\' d=\'M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H6V4h2v8l2.5-1.5L13 12V4h5v16z\'/%3E%3C/svg%3E")',
                              backgroundSize: 'contain',
                              backgroundRepeat: 'no-repeat',
                            }
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {notice.important && (
                              <Box sx={{
                                backgroundColor: '#ffcdd2',
                                color: '#f44336',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                px: 1,
                                py: 0.5,
                                borderRadius: '4px',
                                mr: 1
                              }}>
                                重要
                              </Box>
                            )}
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                              {notice.title}
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ 
                            color: darkMode ? '#e0e0e0' : 'rgba(0,0,0,0.7)', 
                            fontSize: '0.9rem', 
                            mt: 1 
                          }}>
                            {notice.content.substring(0, 50)}...
                          </Typography>
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            mt: 1,
                            pt: 1,
                            borderTop: '1px dashed rgba(0,0,0,0.1)'
                          }}>
                            <Typography variant="caption" sx={{ color: darkMode ? '#bdbdbd' : 'rgba(0,0,0,0.5)' }}>
                              {notice.date}
                            </Typography>
                            <Typography variant="caption" sx={{ color: darkMode ? '#bdbdbd' : 'rgba(0,0,0,0.5)' }}>
                              发布者: {notice.author}
                            </Typography>
                          </Box>
                        </AnimatedPaper>
                      ))}
                    </Box>
                  </Box>
                </AnimatedBox>
              </AnimatedBox>
            </Grid>
          

            <Grid item xs={12} md={6} sx={{ 
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
              height: '100%',
              position: 'relative',
            }}>
              <AnimatedBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                sx={{
                  width: '100%',
                  maxWidth: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  position: 'sticky',
                  top: '20px',
                  height: '100%',
                }}
              >
                <Fade in={true} timeout={600}>
                  <Box
                    sx={{
                      width: '100%',
                      p: 3.5,
                      borderRadius: '24px',
                      backdropFilter: 'blur(12px)',
                      backgroundColor: darkMode ? 'rgba(33, 33, 33, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                      border: darkMode ? '1px solid rgba(255, 179, 0, 0.2)' : '1px solid rgba(255, 179, 0, 0.3)',
                      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.12)',
                      position: 'relative',
                      overflow: 'hidden', // 添加溢出隐藏
                      height: 'fit-content',
                      minHeight: '480px', // 添加固定最小高度
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
                        '& > *': { mb: 0.5 },
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
                          mb: 0.5,
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
                        onSubmit={handleLoginSubmit}
                        noValidate
                        sx={{ mb: 0, width: '100%' }}
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
                            sx={{ 
                              mb: 1,
                              height: '56px', // 固定高度
                              '& .MuiInputBase-root': {
                                height: '100%', // 确保输入框填满容器
                              },
                            }}
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
                            sx={{ 
                              mb: 1,
                              height: '56px', // 固定高度
                              '& .MuiInputBase-root': {
                                height: '100%', // 确保输入框填满容器
                              },
                            }}
                            onFocus={() => setPasswordFocused(true)}
                            onBlur={() => setPasswordFocused(false)}
                          />
                        </AnimatedBox>
                        
                        <Box sx={{ mt: 1, mb: 1, height: '60px' }}>
                          <CaptchaWidget 
                            ref={captchaRef} 
                            onSuccess={setCaptchaToken} 
                          />
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
                              mt: 1,
                              mb: 1,
                              py: 1,
                              fontSize: '0.9rem',
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
                                  py: 0.7,
                                  px: 1,
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
                            )}
                          </Grid>
                          <Grid item>
                            <Link
                              component={RouterLink}
                              to="/register"
                              variant="body2"
                              sx={{
                                display: 'block',
                                py: 0.8,
                                px: 1,
                                borderRadius: '8px',
                                fontSize: '0.8rem',
                                transition: 'all 0.2s ease',
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
                </Fade>
              </AnimatedBox>
            </Grid>
          </Grid>
        </Container>
        
        {/* 公告详情弹窗 */}
        {activeNotice && (
          <Box sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
          }}>
            <AnimatedBox
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              sx={{
                width: '90%',
                maxWidth: '600px',
                backgroundColor: activeNotice.important 
                  ? (darkMode ? 'rgba(121, 85, 72, 0.9)' : 'rgba(255, 241, 242, 0.95)') 
                  : (darkMode ? 'rgba(69, 90, 100, 0.9)' : 'rgba(255, 251, 235, 0.95)'),
                borderRadius: '24px',
                p: 4,
                position: 'relative',
                borderLeft: `8px solid ${activeNotice.important ? '#f44336' : '#ff9800'}`,
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
              }}
            >
              <IconButton 
                sx={{ 
                  position: 'absolute', 
                  top: 16, 
                  right: 16,
                  backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                  color: darkMode ? '#ffd54f' : '#ff9800'
                }}
                onClick={() => setActiveNotice(null)}
              >
                <Close />
              </IconButton>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {activeNotice.important && (
                  <Box sx={{
                    backgroundColor: '#ffcdd2',
                    color: '#f44336',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: '6px',
                    mr: 2
                  }}>
                    重要公告
                  </Box>
                )}
                <Typography variant="h5" sx={{ fontWeight: 800, color: darkMode ? '#ffd54f' : '#ff9800' }}>
                  {activeNotice.title}
                </Typography>
              </Box>
              
              <Typography variant="body1" sx={{ 
                lineHeight: 1.8,
                mb: 3,
                fontSize: '1.1rem',
                color: darkMode ? '#e0e0e0' : '#212121'
              }}>
                {activeNotice.content}
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                mt: 3,
                pt: 3,
                borderTop: '1px dashed rgba(255,255,255,0.2)'
              }}>
                <Typography variant="body2" sx={{ color: darkMode ? '#bdbdbd' : 'rgba(0,0,0,0.6)' }}>
                  发布日期: {activeNotice.date}
                </Typography>
                <Typography variant="body2" sx={{ color: darkMode ? '#bdbdbd' : 'rgba(0,0,0,0.6)' }}>
                  发布者: {activeNotice.author}
                </Typography>
              </Box>
            </AnimatedBox>
          </Box>
        )}
        
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
        
        {/* 页脚 */}
        <Box sx={{ 
          mt: -2.5,
          mb: 2, 
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          backgroundColor: darkMode ? 'inherit' : '#ffffff',
        }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            © 2025 Corona Studio 保留所有权利&nbsp;|&nbsp;
            <Box component="span" sx={{ display: 'inline', mx: 0.5 }}>
              <a 
                href="https://kb.corona.studio/zhCN/geula.html" 
                style={{ 
                  color: 'inherit', 
                  textDecoration: 'none' 
                }}
              >
                使用条款与隐私政策
              </a>
            </Box>
            |&nbsp;
            <Box component="span" sx={{ display: 'inline', mx: 0.5 }}>
              <a 
                href="https://kb.corona.studio/zhCN/guide/contact.html" 
                style={{ 
                  color: 'inherit', 
                  textDecoration: 'none' 
                }}
              >
                联系我们
              </a>
            </Box>
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  ); 
}