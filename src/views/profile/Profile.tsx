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

// 浅色主题 - 稍微调整字体大小
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
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '17.6px',
          '& .MuiCardHeader-title': {
            fontWeight: 700,
            color: '#ff9800',
            fontSize: '1.1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8.8px',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '13.2px 17.6px',
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
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8.8px',
          fontWeight: 600,
          fontSize: '0.77rem',
          height: '26.4px',
        },
      },
    },
  },
});

// 深色主题 - 稍微调整字体大小
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
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '17.6px',
          '& .MuiCardHeader-title': {
            fontWeight: 700,
            color: '#ffd54f',
            fontSize: '1.1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8.8px',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '13.2px 17.6px',
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
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8.8px',
          fontWeight: 600,
          fontSize: '0.77rem',
          height: '26.4px',
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
                padding: 6.6px 13.2px;
                border-radius: 13.2px;
                font-weight: 600;
                font-size: 13.2px;
                box-shadow: 0 2px 10px rgba(255, 193, 7, 0.3);
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
                        {/* 页面标题 */}
                        <AnimatedBox
                            initial={{ opacity: 0, y: 22 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            sx={{ 
                                textAlign: 'center',
                                mb: 4.4,
                                position: 'relative',
                                zIndex: 1,
                            }}
                        >
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                mb: 2.2,
                                flexDirection: { xs: 'column', sm: 'row' },
                                gap: { xs: 1.1, sm: 2.2 },
                            }}>
                                <Avatar sx={{ 
                                    width: 61.6,
                                    height: 61.6,
                                    mr: { sm: 2.2 },
                                    background: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)',
                                    boxShadow: '0 6px 20px rgba(255, 193, 7, 0.4)',
                                    zIndex: 2,
                                }}>
                                    <AccountCircle sx={{ fontSize: 39.6 }} />
                                </Avatar>
                                <Box>
                                    <Typography variant="h3" sx={{ 
                                        fontWeight: 900,
                                        lineHeight: 1.1,
                                        mb: 0.55,
                                        background: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        fontSize: { xs: '1.65rem', md: '2.2rem' },
                                        zIndex: 2,
                                        position: 'relative',
                                    }}>
                                        个人信息
                                    </Typography>
                                    <Typography variant="h6" sx={{ 
                                        color: 'text.secondary',
                                        fontWeight: 500,
                                        fontSize: { xs: '0.9625rem', md: '1.1rem' },
                                        zIndex: 2,
                                        position: 'relative',
                                    }}>
                                        账户和皮肤设置
                                    </Typography>
                                </Box>
                            </Box>
                            
                            {/* 状态指示器 */}
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.1, flexWrap: 'wrap', mt: 1.1, zIndex: 2, position: 'relative' }}>
                                <Chip 
                                    icon={<VerifiedUser sx={{ fontSize: '0.88rem !important' }} />}
                                    label="已验证" 
                                    color="success" 
                                    variant="outlined"
                                    sx={{ 
                                        borderRadius: '13.2px',
                                        fontWeight: 600,
                                        borderWidth: '1px',
                                        fontSize: '0.715rem',
                                        height: '22px',
                                        zIndex: 2,
                                    }}
                                />
                                <Chip 
                                    icon={<Star sx={{ fontSize: '0.88rem !important' }} />}
                                    label="高级" 
                                    color="warning" 
                                    variant="outlined"
                                    sx={{ 
                                        borderRadius: '13.2px',
                                        fontWeight: 600,
                                        borderWidth: '1px',
                                        fontSize: '0.715rem',
                                        height: '22px',
                                        zIndex: 2,
                                    }}
                                />
                            </Box>
                        </AnimatedBox>

                        <Box 
                            sx={{
                                display: "grid", 
                                gap: "1.65em",
                                gridTemplateAreas: {
                                    lg: '"a b" "c b"',
                                    md: '"a" "b" "c"',
                                    xs: '"a" "b" "c"'
                                }, 
                                gridTemplateColumns: { lg: "1fr 1fr" },
                                position: 'relative',
                                zIndex: 1,
                                maxWidth: '1100px',
                                mx: 'auto',
                                width: '100%',
                            }}
                            onDragOver={handleDragOver}
                        >
                            {/* 账户信息卡片 */}
                            <AnimatedCard
                                initial={{ opacity: 0, y: 22 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.11, ease: "easeOut" }}
                                sx={{ gridArea: "a", width: '100%' }}
                            >
                                <CardHeader 
                                    title={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.1 }}>
                                            <Person sx={{ 
                                                color: 'primary.main',
                                                fontSize: '1.32rem',
                                            }} />
                                            账户信息
                                        </Box>
                                    }
                                    sx={{ pb: 1.1 }}
                                />
                                <CardContent sx={{ pt: 0 }}>
                                    <Box sx={{ 
                                        display: "grid", 
                                        gridTemplateColumns: { sm: "auto 1fr", xs: "1fr" }, 
                                        gap: 2.2,
                                        alignItems: 'center'
                                    }}>
                                        <Typography sx={{ 
                                            fontWeight: 600, 
                                            color: 'text.secondary',
                                            fontSize: '0.9625rem',
                                        }}>
                                            用户名
                                        </Typography>
                                        <Box sx={{
                                            p: 1.65,
                                            borderRadius: '13.2px',
                                            backgroundColor: darkMode ? 'rgba(255, 179, 0, 0.08)' : 'rgba(255, 193, 7, 0.08)',
                                            border: darkMode ? '1px solid rgba(255, 179, 0, 0.2)' : '1px solid rgba(255, 193, 7, 0.2)',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            wordBreak: 'break-word',
                                        }}>
                                            <Typography sx={{ 
                                                fontWeight: 600, 
                                                wordBreak: 'break-word',
                                                fontSize: '1.045rem',
                                                color: 'text.primary',
                                            }}>
                                                {userinfo.name}
                                            </Typography>
                                            <Box sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                height: '1.1px',
                                                background: 'linear-gradient(90deg, #ffc107, #ff9800)',
                                            }} />
                                        </Box>
                                        
                                        <Typography sx={{ 
                                            fontWeight: 600, 
                                            color: 'text.secondary',
                                            fontSize: '0.9625rem',
                                        }}>
                                            UUID
                                        </Typography>
                                        <Box sx={{
                                            p: 1.65,
                                            borderRadius: '13.2px',
                                            backgroundColor: darkMode ? 'rgba(255, 179, 0, 0.08)' : 'rgba(255, 193, 7, 0.08)',
                                            border: darkMode ? '1px solid rgba(255, 179, 0, 0.2)' : '1px solid rgba(255, 193, 7, 0.2)',
                                            position: 'relative',
                                            overflow: 'hidden',
                                        }}>
                                            <Typography sx={{ 
                                                fontFamily: 'monospace', 
                                                fontSize: '0.825rem',
                                                wordBreak: 'break-all',
                                                color: darkMode ? '#ffd54f' : '#ff9800',
                                                fontWeight: 500,
                                            }}>
                                                {userinfo.uuid}
                                            </Typography>
                                            <Box sx={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                height: '1.1px',
                                                background: 'linear-gradient(90deg, #ffc107, #ff9800)',
                                            }} />
                                        </Box>
                                    </Box>
                                </CardContent>
                            </AnimatedCard>

                            {/* 皮肤预览卡片 */}
                            <AnimatedCard
                                initial={{ opacity: 0, y: 22 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.22, ease: "easeOut" }}
                                sx={{ gridArea: "b", width: '100%' }}
                            >
                                <CardHeader 
                                    title={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.1 }}>
                                            <Palette sx={{ 
                                                color: 'primary.main',
                                                fontSize: '1.32rem',
                                            }} />
                                            皮肤预览
                                        </Box>
                                    }
                                    sx={{ pb: 1.1 }}
                                />
                                <CardContent sx={{ 
                                    display: "flex", 
                                    justifyContent: 'center', 
                                    alignItems: 'center', 
                                    flexDirection: 'column', 
                                    gap: 2.2,
                                    p: { xs: 1.1, sm: 2.2 },
                                    pt: 0,
                                }}>
                                    <Box sx={{
                                        p: { xs: 1.1, sm: 2.2 },
                                        borderRadius: '17.6px',
                                        backgroundColor: darkMode ? 'rgba(255, 179, 0, 0.08)' : 'rgba(255, 193, 7, 0.08)',
                                        border: darkMode ? '1px solid rgba(255, 179, 0, 0.2)' : '1px solid rgba(255, 193, 7, 0.2)',
                                        boxShadow: '0 8px 24px rgba(255, 193, 7, 0.15)',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: '0 12px 32px rgba(255, 193, 7, 0.25)',
                                        },
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: '2.2px',
                                            background: 'linear-gradient(90deg, #ffc107, #ff9800)',
                                        },
                                        width: '100%',
                                        maxWidth: { xs: '100%', sm: '220px' },
                                    }}>
                                        <SkinViewUUID uuid={userinfo?.uuid ?? ""} width={165} height={165} />
                                    </Box>
                                    <Typography variant="body2" sx={{ 
                                        color: 'text.secondary', 
                                        textAlign: 'center',
                                        fontWeight: 500,
                                        fontSize: '0.9625rem',
                                    }}>
                                        当前皮肤
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'center', p: 2.2, pt: 0 }}>
                                    <Button 
                                        onClick={() => navigate('/textures')} 
                                        variant="contained"
                                        startIcon={<PaletteOutlined sx={{ fontSize: '1.1rem' }} />}
                                        sx={{ 
                                            borderRadius: '17.6px',
                                            fontWeight: 600,
                                            px: 2.2,
                                            py: 1.1,
                                            fontSize: '0.88rem',
                                            minHeight: '35.2px',
                                        }}
                                    >
                                        更换
                                    </Button>
                                </CardActions>
                            </AnimatedCard>

                            {/* 启动器设置卡片 */}
                            <AnimatedCard
                                initial={{ opacity: 0, y: 22 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.33, ease: "easeOut" }}
                                sx={{ gridArea: "c", width: '100%' }}
                            >
                                <CardHeader 
                                    title={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.1 }}>
                                            <Settings sx={{ 
                                                color: 'primary.main',
                                                fontSize: '1.32rem',
                                            }} />
                                            启动器设置
                                        </Box>
                                    }
                                    sx={{ pb: 1.1 }}
                                />
                                <CardContent sx={{ pt: 0 }}>
                                    <Typography sx={{ 
                                        fontWeight: 600, 
                                        color: 'text.secondary', 
                                        mb: 1.1,
                                        fontSize: '1.045rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.55,
                                    }}>
                                        <Code sx={{ fontSize: '1.1rem' }} />
                                        Yggdrasil API 地址
                                    </Typography>
                                    
                                    {/* API 地址显示 */}
                                    <Box sx={{
                                        p: 2.2,
                                        borderRadius: '13.2px',
                                        backgroundColor: darkMode ? 'rgba(255, 179, 0, 0.08)' : 'rgba(255, 193, 7, 0.08)',
                                        border: darkMode ? '1px solid rgba(255, 179, 0, 0.2)' : '1px solid rgba(255, 193, 7, 0.2)',
                                        fontFamily: 'monospace',
                                        fontSize: '0.825rem',
                                        wordBreak: 'break-all',
                                        position: 'relative',
                                        boxShadow: '0 4px 12px rgba(255, 193, 7, 0.1)',
                                        transition: 'all 0.2s ease',
                                        overflow: 'hidden',
                                        '&:hover': {
                                            boxShadow: '0 6px 16px rgba(255, 193, 7, 0.2)',
                                        },
                                        '&::before': {
                                            content: '""',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            height: '2.2px',
                                            background: 'linear-gradient(90deg, #ffc107, #ff9800)',
                                        },
                                        width: '100%',
                                    }}>
                                        <code style={{ 
                                            color: darkMode ? '#ffd54f' : '#ff9800',
                                            fontSize: '0.825rem',
                                            fontWeight: 500,
                                            lineHeight: 1.4,
                                        }}>
                                            {getYggRoot()}
                                        </code>
                                    </Box>
                                    
                                    {/* 使用提示 */}
                                    <Typography variant="body2" sx={{ 
                                        color: 'text.secondary', 
                                        mt: 2.2,
                                        fontWeight: 500,
                                        fontSize: '0.825rem',
                                        lineHeight: 1.4,
                                    }}>
                                        <Security sx={{ fontSize: '0.88rem', mr: 0.55, verticalAlign: 'middle' }} />
                                        在启动器中使用此地址进行身份验证
                                    </Typography>
                                </CardContent>
                                
                                {/* 卡片底部按钮区域 */}
                                <CardActions sx={{ 
                                    p: 2.2,
                                    pt: 0,
                                    display: 'flex',
                                    gap: 1.1,
                                    justifyContent: 'center',
                                    flexWrap: 'wrap'
                                }}>
                                    <Button 
                                        draggable
                                        onDragStart={handleDragStart}
                                        onDragEnd={handleDragEnd}
                                        onDrag={handleDrag}
                                        variant="contained"
                                        startIcon={<ContentCopy sx={{ fontSize: '0.99rem' }} />}
                                        sx={{ 
                                            borderRadius: '17.6px',
                                            fontWeight: 600,
                                            px: 2.2,
                                            py: 1.1,
                                            fontSize: '0.88rem',
                                            cursor: dragging ? 'grabbing' : 'grab',
                                            transform: dragging ? `translate(${dragOffset.x}px, ${dragOffset.y}px)` : 'none',
                                            opacity: dragging ? 0.8 : 1,
                                            transition: dragging ? 'none' : 'all 0.2s ease',
                                            boxShadow: dragging ? '0 6px 20px rgba(255, 193, 7, 0.4)' : '0 2px 10px rgba(255, 193, 7, 0.3)',
                                            width: { xs: '100%', sm: 'auto' },
                                            minHeight: '35.2px',
                                        }}
                                    >
                                        拖拽
                                    </Button>
                                    
                                    <Button 
                                        onClick={handleCopy}
                                        variant="outlined"
                                        startIcon={copied ? <CheckCircle sx={{ fontSize: '0.99rem' }} /> : <ContentCopy sx={{ fontSize: '0.99rem' }} />}
                                        sx={{ 
                                            borderRadius: '17.6px',
                                            fontWeight: 600,
                                            px: 2.2,
                                            py: 1.1,
                                            fontSize: '0.88rem',
                                            width: { xs: '100%', sm: 'auto' },
                                            minHeight: '35.2px',
                                        }}
                                    >
                                        {copied ? '已复制' : '复制'}
                                    </Button>
                                </CardActions>
                            </AnimatedCard>
                        </Box>

            
                        {/* 底部装饰 */}
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
                                textAlign: 'center',
                                fontWeight: 500,
                                opacity: 0.7,
                                maxWidth: '100%',
                                wordBreak: 'break-word',
                                fontSize: '0.77rem',
                            }}>
                                © 2024 Go-Skin
                            </Typography>
                        </AnimatedBox>
                    </Box>
                </Box>

                {/* 添加浮动动画的 CSS */}
                <style>
                    {`
                        @keyframes float {
                            0%, 100% { transform: translateY(0px) rotate(0deg); }
                            50% { transform: translateY(-11px) rotate(180deg); }
                        }
                        
                        .dragging {
                            cursor: grabbing !important;
                        }
                        
                        .drag-over {
                            background-color: rgba(255, 193, 7, 0.1) !important;
                        }
                    `}
                </style>
            </Box>
        </ThemeProvider>
    )
}

function getYggRoot() {
    const u = new URL(root() + "/api/yggdrasil")
    return u.toString()
}

export default Profile