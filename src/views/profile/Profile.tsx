import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import { user } from '@/store/store';
import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import useTitle from '@/hooks/useTitle';
import SkinViewUUID from '@/components/SkinViewUUID';
import root from '@/utils/root';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { motion } from 'framer-motion';
import { Person, Palette, Code, Settings } from '@mui/icons-material';
import { useState, useEffect } from 'react';

// 浅色主题
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
    MuiCard: {
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
    MuiCardHeader: {
      styleOverrides: {
        root: {
          '& .MuiCardHeader-title': {
            fontWeight: 700,
            color: '#ff9800',
            fontSize: '1.2rem',
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
    MuiCard: {
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
    MuiCardHeader: {
      styleOverrides: {
        root: {
          '& .MuiCardHeader-title': {
            fontWeight: 700,
            color: '#ffd54f',
            fontSize: '1.2rem',
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
  },
});

// 动画组件
const AnimatedBox = motion(Box);
const AnimatedCard = motion(Card);

const Profile = function Profile() {
    const navigate = useNavigate();
    const userinfo = useAtomValue(user)
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const currentTheme = darkMode ? darkTheme : lightTheme;

    useTitle("个人信息")

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

    return (
        <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            <Box sx={{
                minHeight: '100vh',
                position: 'relative',
                overflow: 'hidden',
                p: 3,
                backgroundColor: darkMode ? 'inherit' : '#ffffff',
            }}>
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

                {/* 页面标题 */}
                <AnimatedBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    sx={{ 
                        textAlign: 'center',
                        mb: 4,
                        position: 'relative',
                        zIndex: 1,
                    }}
                >
                    <Typography variant="h3" sx={{ 
                        fontWeight: 900,
                        lineHeight: 1.2,
                        mb: 2,
                        background: 'linear-gradient(to right, #ffc107, #ff9800)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: { xs: '2rem', md: '2.5rem' }
                    }}>
                        个人信息
                    </Typography>
                    <Typography variant="h6" sx={{ 
                        color: 'text.secondary',
                        fontWeight: 500,
                        fontSize: { xs: '1rem', md: '1.1rem' }
                    }}>
                        管理您的账户和皮肤设置
                    </Typography>
                </AnimatedBox>

                <Box sx={{
                    display: "grid", 
                    gap: "2em", 
                    gridTemplateAreas: {
                        lg: '"a b" "c b"',
                        xs: '"a" "b" "c"'
                    }, 
                    gridTemplateColumns: { lg: "1fr 1fr" },
                    position: 'relative',
                    zIndex: 1,
                    maxWidth: '1200px',
                    mx: 'auto',
                }}>
                    <AnimatedCard
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        sx={{ gridArea: "a" }}
                    >
                        <CardHeader 
                            title={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Person sx={{ color: 'primary.main' }} />
                                    账户信息
                                </Box>
                            }
                        />
                        <CardContent sx={{ display: "grid", gridTemplateColumns: "4em auto", gap: 2 }}>
                            <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>用户名</Typography>
                            <Typography sx={{ fontWeight: 500, wordBreak: 'break-word' }}>{userinfo.name}</Typography>
                            <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>UUID</Typography>
                            <Typography sx={{ 
                                fontFamily: 'monospace', 
                                fontSize: '0.9rem',
                                wordBreak: 'break-all',
                                backgroundColor: darkMode ? 'rgba(255, 179, 0, 0.1)' : 'rgba(255, 193, 7, 0.1)',
                                p: 1,
                                borderRadius: '8px',
                                border: darkMode ? '1px solid rgba(255, 179, 0, 0.2)' : '1px solid rgba(255, 193, 7, 0.2)',
                            }}>
                                {userinfo.uuid}
                            </Typography>
                        </CardContent>
                    </AnimatedCard>

                    <AnimatedCard
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        sx={{ gridArea: "b" }}
                    >
                        <CardHeader 
                            title={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Palette sx={{ color: 'primary.main' }} />
                                    皮肤预览
                                </Box>
                            }
                        />
                        <CardContent sx={{ display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{
                                p: 2,
                                borderRadius: '16px',
                                backgroundColor: darkMode ? 'rgba(255, 179, 0, 0.1)' : 'rgba(255, 193, 7, 0.1)',
                                border: darkMode ? '1px solid rgba(255, 179, 0, 0.2)' : '1px solid rgba(255, 193, 7, 0.2)',
                            }}>
                                <SkinViewUUID uuid={userinfo?.uuid ?? ""} width={200} height={200} />
                            </Box>
                            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                                您当前的皮肤预览
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center', p: 2 }}>
                            <Button 
                                onClick={() => navigate('/textures')} 
                                variant="contained"
                                startIcon={<Palette />}
                                sx={{ 
                                    borderRadius: '12px',
                                    fontWeight: 600,
                                    px: 3,
                                }}
                            >
                                更换皮肤
                            </Button>
                        </CardActions>
                    </AnimatedCard>

                    <AnimatedCard
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        sx={{ gridArea: "c" }}
                    >
                        <CardHeader 
                            title={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Settings sx={{ color: 'primary.main' }} />
                                    启动器设置
                                </Box>
                            }
                        />
                        <CardContent>
                            <Typography sx={{ fontWeight: 600, color: 'text.secondary', mb: 2 }}>
                                本站 Yggdrasil API 地址
                            </Typography>
                            <Box sx={{
                                p: 2,
                                borderRadius: '12px',
                                backgroundColor: darkMode ? 'rgba(255, 179, 0, 0.1)' : 'rgba(255, 193, 7, 0.1)',
                                border: darkMode ? '1px solid rgba(255, 179, 0, 0.2)' : '1px solid rgba(255, 193, 7, 0.2)',
                                fontFamily: 'monospace',
                                fontSize: '0.9rem',
                                wordBreak: 'break-all',
                                position: 'relative',
                            }}>
                                <code style={{ 
                                    color: darkMode ? '#ffd54f' : '#ff9800',
                                    fontSize: '0.85rem',
                                }}>
                                    {getYggRoot()}
                                </code>
                                <Button
                                    size="small"
                                    onClick={() => {
                                        navigator.clipboard.writeText(getYggRoot());
                                    }}
                                    sx={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 8,
                                        fontSize: '0.8rem',
                                        borderRadius: '8px',
                                    }}
                                >
                                    复制
                                </Button>
                            </Box>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2 }}>
                                在启动器中使用此地址进行身份验证
                            </Typography>
                        </CardContent>
                    </AnimatedCard>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

function getYggRoot() {
    const u = new URL(root() + "/api/yggdrasil")
    return u.toString()
}

export default Profile