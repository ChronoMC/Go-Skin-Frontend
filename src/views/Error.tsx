import { 
  Box, Button, Typography, Container,
  Link
} from '@mui/material';
import { 
  ArrowBack, 
  SentimentVeryDissatisfied,
  Home
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";

// 使用与主站相同的主题
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
        outlined: {
          borderColor: 'rgba(99, 102, 241, 0.5)',
          color: '#6366f1',
          '&:hover': {
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.05)',
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
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 40px rgba(31, 41, 55, 0.15)',
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
  
  const handleGoHome = () => {
    navigate("/");
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
          position: 'relative',
          overflow: 'hidden',
          p: 3,
        }}
      >
        {/* 装饰性背景元素 */}
        <Box sx={{
          position: 'absolute',
          top: '-15%',
          right: '-15%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%)',
          zIndex: 0,
        }} />
        
        <Box sx={{
          position: 'absolute',
          bottom: '-20%',
          left: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.15) 100%)',
          zIndex: 0,
        }} />
        
        {/* 主内容 */}
        <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
          <AnimatedBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            sx={{
              textAlign: 'center',
              p: { xs: 3, sm: 4, md: 5 },
              borderRadius: '24px',
              backdropFilter: 'blur(12px)',
              backgroundColor: 'rgba(255, 255, 255, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 20px 50px rgba(31, 41, 55, 0.12)',
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
                  color: '#8b5cf6',
                  filter: 'drop-shadow(0 4px 12px rgba(139, 92, 246, 0.3))'
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
                color: 'rgba(139, 92, 246, 0.15)',
                zIndex: -1,
                letterSpacing: '0.1em',
              }}>
                404
              </Box>
            </AnimatedBox>
            
            <Typography variant="h3" sx={{ 
              fontWeight: 900,
              mb: 2,
              background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
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
                请检查URL是否正确，或点击下方按钮返回首页。
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
              <Link href="https://kb.corona.studio/zhCN/guide/contact.html" sx={{ fontWeight: 600, color: '#6366f1' }}>
                支持团队
              </Link>
              或访问
              <Link href="https://kb.corona.studio/zhCN/" sx={{ fontWeight: 600, color: '#6366f1' }}>
                帮助中心
              </Link>
            </Typography>
          </AnimatedBox>
        </Container>
        
        {/* 页脚 */}
        <Box sx={{ 
          position: 'absolute',
          bottom: 20,
          left: 0,
          right: 0,
          textAlign: 'center',
          zIndex: 1,
        }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            © 2023 Skin Station. 保留所有权利
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}