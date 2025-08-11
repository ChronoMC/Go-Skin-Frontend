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
import { 
    Person, 
    Palette, 
    Code, 
    Settings, 
    ContentCopy, 
    CheckCircle,
    Star,
    Security,
    PaletteOutlined,
    AccountCircle,
    VerifiedUser
} from '@mui/icons-material';
import { useState, useEffect, useRef } from 'react';
import { Chip, Avatar } from '@mui/material';

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
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)',
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
          borderRadius: '16px',
          fontWeight: 700,
          textTransform: 'none',
          padding: '14px 28px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 4px 20px rgba(255, 193, 7, 0.3)',
          fontSize: '0.95rem',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 8px 25px rgba(255, 193, 7, 0.4)',
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
          borderWidth: '2px',
          '&:hover': {
            borderColor: '#ff9800',
            backgroundColor: 'rgba(255, 193, 7, 0.08)',
            borderWidth: '2px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '28px',
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid rgba(255, 193, 7, 0.2)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.12)',
            border: '1px solid rgba(255, 193, 7, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '28px',
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid rgba(255, 193, 7, 0.2)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.12)',
            border: '1px solid rgba(255, 193, 7, 0.4)',
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '24px 24px 16px 24px',
          '& .MuiCardHeader-title': {
            fontWeight: 800,
            color: '#ff9800',
            fontSize: '1.3rem',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '16px 24px 24px 24px',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff9c4',
          color: '#ff9800',
          boxShadow: '0 8px 25px rgba(255, 193, 7, 0.3)',
          width: 56,
          height: 56,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          fontWeight: 600,
          fontSize: '0.85rem',
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
      default: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
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
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
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
          borderRadius: '16px',
          fontWeight: 700,
          textTransform: 'none',
          padding: '14px 28px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 4px 20px rgba(255, 213, 79, 0.3)',
          fontSize: '0.95rem',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 8px 25px rgba(255, 213, 79, 0.4)',
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
          borderWidth: '2px',
          '&:hover': {
            borderColor: '#ffd54f',
            backgroundColor: 'rgba(255, 213, 79, 0.08)',
            borderWidth: '2px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '28px',
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(45, 45, 45, 0.95)',
          border: '1px solid rgba(255, 213, 79, 0.2)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 213, 79, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '28px',
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(45, 45, 45, 0.95)',
          border: '1px solid rgba(255, 213, 79, 0.2)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 213, 79, 0.4)',
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '24px 24px 16px 24px',
          '& .MuiCardHeader-title': {
            fontWeight: 800,
            color: '#ffd54f',
            fontSize: '1.3rem',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '16px 24px 24px 24px',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 213, 79, 0.2)',
          color: '#ffd54f',
          boxShadow: '0 8px 25px rgba(255, 213, 79, 0.3)',
          width: 56,
          height: 56,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          fontWeight: 600,
          fontSize: '0.85rem',
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
    const [copied, setCopied] = useState<boolean>(false);
    const [dragging, setDragging] = useState<boolean>(false);
    const [dragOffset, setDragOffset] = useState<{x: number, y: number}>({ x: 0, y: 0 });
    const dragStartPos = useRef<{x: number, y: number}>({ x: 0, y: 0 });
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

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(getYggRoot());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const handleDragStart = (e: React.DragEvent<HTMLButtonElement>) => {
        setDragging(true);
        dragStartPos.current = { x: e.clientX, y: e.clientY };
        
        const yggUrl = getYggRoot();
        const dragData = "authlib-injector:yggdrasil-server:" + yggUrl;
        
        // 设置多种数据格式以支持不同应用
        e.dataTransfer.setData('text/plain', dragData);
        e.dataTransfer.setData('text/uri-list', yggUrl);
        e.dataTransfer.setData('application/x-minecraft-authlib', dragData);
        
        // 使用 copy 而不是 move，更适合外部应用
        e.dataTransfer.effectAllowed = 'copy';
        
        // 设置拖拽图像（可选）
        try {
            const dragImage = document.createElement('div');
            dragImage.textContent = '拖拽到启动器';
            dragImage.style.cssText = `
                position: absolute;
                top: -1000px;
                left: -1000px;
                background: linear-gradient(135deg, #ffc107 0%, #ff9800 100%);
                color: #000;
                padding: 8px 16px;
                border-radius: 16px;
                font-weight: 700;
                font-size: 14px;
                box-shadow: 0 4px 20px rgba(255, 193, 7, 0.3);
            `;
            document.body.appendChild(dragImage);
            e.dataTransfer.setDragImage(dragImage, 0, 0);
            setTimeout(() => document.body.removeChild(dragImage), 0);
        } catch (err) {
            console.warn('Failed to set drag image:', err);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    };

    const handleDragEnd = () => {
        setDragging(false);
        setDragOffset({ x: 0, y: 0 });
    };

    const handleDrag = (e: React.DragEvent<HTMLButtonElement>) => {
        if (!dragging) return;
        
        const deltaX = e.clientX - dragStartPos.current.x;
        const deltaY = e.clientY - dragStartPos.current.y;
        
        setDragOffset({ x: deltaX, y: deltaY });
    };

    return (
        <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            <Box sx={{
                minHeight: '100vh',
                position: 'relative',
                overflow: 'hidden',
                p: { xs: 2, md: 4 },
                backgroundColor: darkMode ? 'inherit' : 'inherit',
            }}>
                {/* 装饰性背景元素 */}
                <Box sx={{
                    position: 'absolute',
                    top: '-15%',
                    right: '-15%',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: darkMode 
                        ? 'radial-gradient(circle, rgba(255, 213, 79, 0.08) 0%, rgba(255, 179, 0, 0.12) 100%)' 
                        : 'radial-gradient(circle, rgba(255, 193, 7, 0.12) 0%, rgba(255, 152, 0, 0.08) 100%)',
                    zIndex: 0,
                    animation: 'float 6s ease-in-out infinite',
                }} />
                
                <Box sx={{
                    position: 'absolute',
                    bottom: '-20%',
                    left: '-10%',
                    width: '700px',
                    height: '700px',
                    borderRadius: '50%',
                    background: darkMode 
                        ? 'radial-gradient(circle, rgba(255, 179, 0, 0.08) 0%, rgba(255, 213, 79, 0.12) 100%)'
                        : 'radial-gradient(circle, rgba(255, 152, 0, 0.08) 0%, rgba(255, 193, 7, 0.12) 100%)',
                    zIndex: 0,
                    animation: 'float 8s ease-in-out infinite reverse',
                }} />

                {/* 页面标题 */}
                <AnimatedBox
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    sx={{ 
                        textAlign: 'center',
                        mb: 6,
                        position: 'relative',
                        zIndex: 1,
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: 3,
                    }}>
                        <Avatar sx={{ 
                            width: 80, 
                            height: 80, 
                            mr: 3,
                            background: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)',
                            boxShadow: '0 12px 40px rgba(255, 193, 7, 0.4)',
                        }}>
                            <AccountCircle sx={{ fontSize: 50 }} />
                        </Avatar>
                        <Box>
                            <Typography variant="h3" sx={{ 
                                fontWeight: 900,
                                lineHeight: 1.1,
                                mb: 1,
                                background: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontSize: { xs: '2.5rem', md: '3rem' }
                            }}>
                                个人信息
                            </Typography>
                            <Typography variant="h6" sx={{ 
                                color: 'text.secondary',
                                fontWeight: 500,
                                fontSize: { xs: '1.1rem', md: '1.2rem' }
                            }}>
                                管理您的账户和皮肤设置
                            </Typography>
                        </Box>
                    </Box>
                    
                    {/* 状态指示器 */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                        <Chip 
                            icon={<VerifiedUser />} 
                            label="账户已验证" 
                            color="success" 
                            variant="outlined"
                            sx={{ 
                                borderRadius: '20px',
                                fontWeight: 600,
                                borderWidth: '2px',
                            }}
                        />
                        <Chip 
                            icon={<Star />} 
                            label="高级用户" 
                            color="warning" 
                            variant="outlined"
                            sx={{ 
                                borderRadius: '20px',
                                fontWeight: 600,
                                borderWidth: '2px',
                            }}
                        />
                    </Box>
                </AnimatedBox>

                <Box 
                    sx={{
                        display: "grid", 
                        gap: "2.5em", 
                        gridTemplateAreas: {
                            lg: '"a b" "c b"',
                            md: '"a" "b" "c"',
                            xs: '"a" "b" "c"'
                        }, 
                        gridTemplateColumns: { lg: "1fr 1fr" },
                        position: 'relative',
                        zIndex: 1,
                        maxWidth: '1400px',
                        mx: 'auto',
                    }}
                    onDragOver={handleDragOver}
                >
                    {/* 账户信息卡片 */}
                    <AnimatedCard
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        sx={{ gridArea: "a" }}
                    >
                        <CardHeader 
                            title={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Person sx={{ 
                                        color: 'primary.main',
                                        fontSize: '1.5rem',
                                    }} />
                                    账户信息
                                </Box>
                            }
                        />
                        <CardContent>
                            <Box sx={{ 
                                display: "grid", 
                                gridTemplateColumns: "auto 1fr", 
                                gap: 3,
                                alignItems: 'center'
                            }}>
                                <Typography sx={{ 
                                    fontWeight: 700, 
                                    color: 'text.secondary',
                                    fontSize: '1rem',
                                }}>
                                    用户名
                                </Typography>
                                <Box sx={{
                                    p: 2,
                                    borderRadius: '16px',
                                    backgroundColor: darkMode ? 'rgba(255, 179, 0, 0.08)' : 'rgba(255, 193, 7, 0.08)',
                                    border: darkMode ? '1px solid rgba(255, 179, 0, 0.2)' : '1px solid rgba(255, 193, 7, 0.2)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}>
                                    <Typography sx={{ 
                                        fontWeight: 700, 
                                        wordBreak: 'break-word',
                                        fontSize: '1.1rem',
                                        color: 'text.primary',
                                    }}>
                                        {userinfo.name}
                                    </Typography>
                                    <Box sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: '2px',
                                        background: 'linear-gradient(90deg, #ffc107, #ff9800)',
                                    }} />
                                </Box>
                                
                                <Typography sx={{ 
                                    fontWeight: 700, 
                                    color: 'text.secondary',
                                    fontSize: '1rem',
                                }}>
                                    UUID
                                </Typography>
                                <Box sx={{
                                    p: 2,
                                    borderRadius: '16px',
                                    backgroundColor: darkMode ? 'rgba(255, 179, 0, 0.08)' : 'rgba(255, 193, 7, 0.08)',
                                    border: darkMode ? '1px solid rgba(255, 179, 0, 0.2)' : '1px solid rgba(255, 193, 7, 0.2)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}>
                                    <Typography sx={{ 
                                        fontFamily: 'monospace', 
                                        fontSize: '0.9rem',
                                        wordBreak: 'break-all',
                                        color: darkMode ? '#ffd54f' : '#ff9800',
                                        fontWeight: 600,
                                    }}>
                                        {userinfo.uuid}
                                    </Typography>
                                    <Box sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: '2px',
                                        background: 'linear-gradient(90deg, #ffc107, #ff9800)',
                                    }} />
                                </Box>
                            </Box>
                        </CardContent>
                    </AnimatedCard>

                    {/* 皮肤预览卡片 */}
                    <AnimatedCard
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        sx={{ gridArea: "b" }}
                    >
                        <CardHeader 
                            title={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Palette sx={{ 
                                        color: 'primary.main',
                                        fontSize: '1.5rem',
                                    }} />
                                    皮肤预览
                                </Box>
                            }
                        />
                        <CardContent sx={{ 
                            display: "flex", 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            flexDirection: 'column', 
                            gap: 3,
                            p: 4,
                        }}>
                            <Box sx={{
                                p: 4,
                                borderRadius: '24px',
                                backgroundColor: darkMode ? 'rgba(255, 179, 0, 0.08)' : 'rgba(255, 193, 7, 0.08)',
                                border: darkMode ? '1px solid rgba(255, 179, 0, 0.2)' : '1px solid rgba(255, 193, 7, 0.2)',
                                boxShadow: '0 16px 48px rgba(255, 193, 7, 0.15)',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                position: 'relative',
                                overflow: 'hidden',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 24px 64px rgba(255, 193, 7, 0.25)',
                                },
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '3px',
                                    background: 'linear-gradient(90deg, #ffc107, #ff9800)',
                                },
                            }}>
                                <SkinViewUUID uuid={userinfo?.uuid ?? ""} width={220} height={220} />
                            </Box>
                            <Typography variant="body1" sx={{ 
                                color: 'text.secondary', 
                                textAlign: 'center',
                                fontWeight: 600,
                                fontSize: '1rem',
                            }}>
                                您当前的皮肤预览
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center', p: 3 }}>
                            <Button 
                                onClick={() => navigate('/textures')} 
                                variant="contained"
                                startIcon={<PaletteOutlined />}
                                sx={{ 
                                    borderRadius: '20px',
                                    fontWeight: 700,
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1rem',
                                }}
                            >
                                更换皮肤
                            </Button>
                        </CardActions>
                    </AnimatedCard>

                    {/* 启动器设置卡片 */}
                    <AnimatedCard
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                        sx={{ gridArea: "c" }}
                    >
                        <CardHeader 
                            title={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Settings sx={{ 
                                        color: 'primary.main',
                                        fontSize: '1.5rem',
                                    }} />
                                    启动器设置
                                </Box>
                            }
                        />
                        <CardContent>
                            <Typography sx={{ 
                                fontWeight: 700, 
                                color: 'text.secondary', 
                                mb: 2,
                                fontSize: '1.1rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}>
                                <Code sx={{ fontSize: '1.2rem' }} />
                                本站 Yggdrasil API 地址
                            </Typography>
                            
                            {/* API 地址显示 */}
                            <Box sx={{
                                p: 3,
                                borderRadius: '16px',
                                backgroundColor: darkMode ? 'rgba(255, 179, 0, 0.08)' : 'rgba(255, 193, 7, 0.08)',
                                border: darkMode ? '1px solid rgba(255, 179, 0, 0.2)' : '1px solid rgba(255, 193, 7, 0.2)',
                                fontFamily: 'monospace',
                                fontSize: '0.9rem',
                                wordBreak: 'break-all',
                                position: 'relative',
                                boxShadow: '0 8px 24px rgba(255, 193, 7, 0.1)',
                                transition: 'all 0.3s ease',
                                overflow: 'hidden',
                                '&:hover': {
                                    boxShadow: '0 12px 32px rgba(255, 193, 7, 0.2)',
                                },
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: '3px',
                                    background: 'linear-gradient(90deg, #ffc107, #ff9800)',
                                },
                            }}>
                                <code style={{ 
                                    color: darkMode ? '#ffd54f' : '#ff9800',
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    lineHeight: 1.6,
                                }}>
                                    {getYggRoot()}
                                </code>
                            </Box>
                            
                            {/* 使用提示 */}
                            <Typography variant="body2" sx={{ 
                                color: 'text.secondary', 
                                mt: 3,
                                fontWeight: 500,
                                fontSize: '0.95rem',
                                lineHeight: 1.5,
                            }}>
                                <Security sx={{ fontSize: '1rem', mr: 1, verticalAlign: 'middle' }} />
                                在启动器中使用此地址进行身份验证
                            </Typography>
                        </CardContent>
                        
                        {/* 卡片底部按钮区域 */}
                        <CardActions sx={{ 
                            p: 3,
                            pt: 0,
                            display: 'flex',
                            gap: 2,
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                        }}>
                            <Button 
                                draggable
                                onDragStart={handleDragStart}
                                onDragEnd={handleDragEnd}
                                onDrag={handleDrag}
                                variant="contained"
                                startIcon={<ContentCopy />}
                                sx={{ 
                                    borderRadius: '20px',
                                    fontWeight: 700,
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1rem',
                                    cursor: dragging ? 'grabbing' : 'grab',
                                    transform: dragging ? `translate(${dragOffset.x}px, ${dragOffset.y}px)` : 'none',
                                    opacity: dragging ? 0.8 : 1,
                                    transition: dragging ? 'none' : 'all 0.3s ease',
                                    boxShadow: dragging ? '0 12px 32px rgba(255, 193, 7, 0.4)' : '0 4px 20px rgba(255, 193, 7, 0.3)',
                                }}
                            >
                                拖拽到启动器
                            </Button>
                            
                            <Button 
                                onClick={handleCopy}
                                variant="outlined"
                                startIcon={copied ? <CheckCircle /> : <ContentCopy />}
                                sx={{ 
                                    borderRadius: '20px',
                                    fontWeight: 700,
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1rem',
                                }}
                            >
                                {copied ? '已复制!' : '复制地址'}
                            </Button>
                        </CardActions>
                    </AnimatedCard>
                </Box>

    
                {/* 底部装饰 */}
                <AnimatedBox
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    sx={{
                        position: 'absolute',
                        bottom: '2rem',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1,
                    }}
                >
                    <Typography variant="body2" sx={{
                        color: 'text.secondary',
                        textAlign: 'center',
                        fontWeight: 500,
                        opacity: 0.7,
                    }}>
                        © 2024 Go-Skin - 专业的 Minecraft 皮肤管理平台
                    </Typography>
                </AnimatedBox>
            </Box>

            {/* 添加浮动动画的 CSS */}
            <style>
                {`
                    @keyframes float {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        50% { transform: translateY(-20px) rotate(180deg); }
                    }
                    
                    @keyframes pulse {
                        0%, 100% { 
                            transform: translate(-50%, -50%) scale(1);
                            opacity: 0.9;
                        }
                        50% { 
                            transform: translate(-50%, -50%) scale(1.05);
                            opacity: 1;
                        }
                    }
                    
                    .dragging {
                        cursor: grabbing !important;
                    }
                    
                    .drag-over {
                        background-color: rgba(255, 193, 7, 0.1) !important;
                    }
                `}
            </style>
        </ThemeProvider>
    )
}

function getYggRoot() {
    const u = new URL(root() + "/api/yggdrasil")
    return u.toString()
}

export default Profile