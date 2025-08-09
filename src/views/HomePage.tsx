import { useState, useEffect } from 'react';
import { 
  Box, Button, Typography, Container, 
  Grid, Avatar, Paper, IconButton 
} from '@mui/material';
import { 
  AccountCircle, 
  ArrowForward, Download, 
  Search, Palette, Notifications, 
  Menu, Close
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { motion } from 'framer-motion';

// 使用与登录页相同的主题
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
  
  // 从后端获取公告的模拟函数
  useEffect(() => {
    // 实际项目中这里应该是API调用
    console.log("从后端获取公告数据...");
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
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
        
        {/* 导航栏 */}
        <Box sx={{
          p: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: 'primary.main', mr: 1.5 }}>
          <Palette />
        </Avatar>
        <Typography variant="h6" sx={{ 
          fontWeight: 800,
          background: 'linear-gradient(to right, #6366f1, #8b5cf6)',
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
        <IconButton sx={{ 
          borderRadius: '12px',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255, 255, 255, 0.65)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
        }}>
          <Search />
        </IconButton>
        <IconButton sx={{ 
          borderRadius: '12px',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255, 255, 255, 0.65)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          position: 'relative'
        }}>
          <Notifications />
          <Box sx={{
            position: 'absolute',
            top: 5,
            right: 5,
            width: 10,
            height: 10,
            backgroundColor: '#ef4444',
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.7)'
          }} />
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
          py: 4,
        }}>
          <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <AnimatedBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h2" sx={{ 
          fontWeight: 900,
          lineHeight: 1.2,
          mb: 2,
          background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
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
          </AnimatedBox>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <AnimatedBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            sx={{ 
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
            }}
          >
            {/* 公告板容器 */}
            <Box sx={{
          width: '100%',
          maxWidth: '500px',
          minHeight: '400px',
          borderRadius: '24px',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255, 255, 255, 0.65)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '0 20px 50px rgba(31, 41, 55, 0.12)',
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'100\' height=\'100\' fill=\'none\'/%3E%3Cpath d=\'M20,20 L20,80 L80,80 L80,20 Z\' stroke=\'%23c7d2fe\' stroke-width=\'1\' fill=\'none\' stroke-dasharray=\'5,5\'/%3E%3C/svg%3E")',
          backgroundSize: '40px 40px',
            }}>
          {/* 公告板标题 */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{
              width: 24,
              height: 24,
              backgroundColor: '#ef4444',
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
              color: '#7c3aed'
            }}>
              最新公告
            </Typography>
          </Box>
          
          {/* 公告列表 */}
          <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
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
              backgroundColor: notice.important ? 'rgba(255, 241, 242, 0.9)' : 'rgba(255, 251, 235, 0.9)',
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              borderLeft: `4px solid ${notice.important ? '#ef4444' : '#8b5cf6'}`,
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
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'%3E%3Cpath fill=\'%23d1d5db\' d=\'M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H6V4h2v8l2.5-1.5L13 12V4h5v16z\'/%3E%3C/svg%3E")',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }
            }}
              >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {notice.important && (
                <Box sx={{
              backgroundColor: '#fee2e2',
              color: '#ef4444',
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
            <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.7)', fontSize: '0.9rem', mt: 1 }}>
              {notice.content.substring(0, 50)}...
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              mt: 1,
              pt: 1,
              borderTop: '1px dashed rgba(0,0,0,0.1)'
            }}>
              <Typography variant="caption" sx={{ color: 'rgba(0,0,0,0.5)' }}>
                {notice.date}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(0,0,0,0.5)' }}>
                发布者: {notice.author}
              </Typography>
            </Box>
              </AnimatedPaper>
            ))}
          </Box>
          
          {/* 查看更多按钮 */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button 
              variant="outlined" 
              size="small"
              endIcon={<ArrowForward />}
              sx={{ borderRadius: '20px' }}
            >
              查看所有公告
            </Button>
          </Box>
            </Box>
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
            backgroundColor: activeNotice.important ? 'rgba(255, 241, 242, 0.95)' : 'rgba(255, 251, 235, 0.95)',
            borderRadius: '24px',
            p: 4,
            position: 'relative',
            borderLeft: `8px solid ${activeNotice.important ? '#ef4444' : '#8b5cf6'}`,
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          }}
        >
          <IconButton 
            sx={{ 
          position: 'absolute', 
          top: 16, 
          right: 16,
          backgroundColor: 'rgba(0,0,0,0.1)'
            }}
            onClick={() => setActiveNotice(null)}
          >
            <Close />
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            {activeNotice.important && (
          <Box sx={{
            backgroundColor: '#fee2e2',
            color: '#ef4444',
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
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
          {activeNotice.title}
            </Typography>
          </Box>
          
          <Typography variant="body1" sx={{ 
            lineHeight: 1.8,
            mb: 3,
            fontSize: '1.1rem'
          }}>
            {activeNotice.content}
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            mt: 3,
            pt: 3,
            borderTop: '1px dashed rgba(0,0,0,0.2)'
          }}>
            <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.6)' }}>
          发布日期: {activeNotice.date}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.6)' }}>
          发布者: {activeNotice.author}
            </Typography>
          </Box>
        </AnimatedBox>
          </Box>
        )}
        
        {/* 页脚 */}
        <Box sx={{ 
          p: 3, 
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
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