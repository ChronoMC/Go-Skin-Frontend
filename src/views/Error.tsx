import { 
  Box, Button, Typography, Container,
  Link, Avatar, Paper, IconButton
} from '@mui/material';
import { 
  ArrowBack, 
  SentimentVeryDissatisfied,
  Home,
  Brightness4,
  Brightness7
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

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
  },
});

// 动画组件
const AnimatedBox = motion(Box);

export default function NotFoundPage() {
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

  const toggleThemeMode = () => {
    setDarkMode(!darkMode);
  };

  const handleGoHome = () => {
    navigate("/");
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
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
          </Box>
        </Box>
        
        {/* 主内容 */}
        <Container maxWidth="sm" sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          py: 4,
        }}>
          <AnimatedBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            sx={{
              textAlign: 'center',
              p: { xs: 3, sm: 4, md: 5 },
              borderRadius: '24px',
              backdropFilter: 'blur(12px)',
              backgroundColor: darkMode ? 'rgba(33, 33, 33, 0.7)' : 'rgba(255, 255, 255, 0.8)',
              border: darkMode ? '1px solid rgba(255, 179, 0, 0.2)' : '1px solid rgba(255, 179, 0, 0.3)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.12)',
            }}
          >
            <AnimatedBox
              animate={{ 
                rotate: [0, 10, -10, 5, 0],
                scale: [1, 1.1, 1.05, 1]
              }}
              transition={{ 
                duration: 1.5,
                ease: "easeInOut",
                times: [0, 0.2, 0.4, 0.6, 1]
              }}
              sx={{ 
                display: 'inline-block',
                mb: 3,
                position: 'relative',
              }}
            >
              <SentimentVeryDissatisfied 
                sx={{ 
                  fontSize: 120, 
                  color: '#ff9800',
                  filter: 'drop-shadow(0 4px 12px rgba(255, 152, 0, 0.3))'
                }} 
              />
              
              {/* 404文字 */}
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '5rem',
                fontWeight: 900,
                color: darkMode ? 'rgba(255, 179, 0, 0.1)' : 'rgba(255, 152, 0, 0.15)',
                zIndex: -1,
                letterSpacing: '0.1em',
              }}>
                404
              </Box>
            </AnimatedBox>
            
            <Typography variant="h3" sx={{ 
              fontWeight: 900,
              mb: 2,
              background: 'linear-gradient(to right, #ffc107, #ff9800)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
            }}>
              页面未找到
            </Typography>
            
            <Typography variant="h6" sx={{ 
              color: 'text.secondary',
              mb: 4,
              maxWidth: '500px',
              mx: 'auto',
              lineHeight: 1.6,
            }}>
              您访问的页面可能已被移除、更名或暂时不可用。
              <Box component="span" sx={{ display: 'block', mt: 1 }}>
                请检查 URL 是否正确，或点击下方按钮返回首页。
              </Box>
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 2,
              flexWrap: 'wrap',
              mt: 4
            }}>
              <AnimatedBox
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  startIcon={<Home />}
                  onClick={handleGoHome}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    minWidth: '200px'
                  }}
                >
                  返回首页
                </Button>
              </AnimatedBox>
              
              <AnimatedBox
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outlined"
                  startIcon={<ArrowBack />}
                  onClick={() => window.history.back()}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    minWidth: '200px'
                  }}
                >
                  返回上一页
                </Button>
              </AnimatedBox>
            </Box>
            
            <Typography variant="body2" sx={{ 
              color: 'text.secondary', 
              mt: 5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              flexWrap: 'wrap'
            }}>
              需要帮助？联系我们的
              <Link href="https://kb.corona.studio/zhCN/guide/contact.html" sx={{ fontWeight: 600 }}>
                支持团队
              </Link>
              或访问
              <Link href="https://kb.corona.studio/zhCN/" sx={{ fontWeight: 600 }}>
                帮助中心
              </Link>
            </Typography>
          </AnimatedBox>
        </Container>
      </Box>
    </ThemeProvider>
  );
}