import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Button from "@mui/material/Button";
import { CardHeader, CardActions } from "@mui/material";
import useTitle from "@/hooks/useTitle";
import { MuiFileInput } from 'mui-file-input'
import Box from "@mui/material/Box";
import ReactSkinview3d from '@/components/Skinview3d'
import { useUnmount } from "ahooks";
import { useAtomValue, useSetAtom } from "jotai";
import { LayoutAlertErr, token } from "@/store/store";
import { upTextures } from "@/apis/apis";
import Loading from "@/components/Loading";
import Snackbar from "@mui/material/Snackbar";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';
import { 
    Palette, 
    Upload, 
    CheckCircle,
    Person,
    Visibility,
    Image,
    Brush,
    CloudUpload
} from '@mui/icons-material';

// 浅色主题
const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#ffd54f',
      contrastText: '#000000',
    },
    secondary: {
      main: '#ffb300',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
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
    MuiRadio: {
      styleOverrides: {
        root: {
          color: '#ff9800',
          '&.Mui-checked': {
            color: '#ff9800',
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          margin: '4px 0',
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
      main: '#ff6f00',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#ffb300',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
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
          '&.Mui-disabled': {
            boxShadow: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
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
    MuiRadio: {
      styleOverrides: {
        root: {
          color: '#ffd54f',
          '&.Mui-checked': {
            color: '#ffd54f',
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          margin: '4px 0',
        },
      },
    },
  },
});

// 动画组件
const AnimatedBox = motion(Box);
const AnimatedCard = motion(Card);

const Textures = function Textures() {
    const [redioValue, setRedioValue] = useState("skin")
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const currentTheme = darkMode ? darkTheme : lightTheme;
    
    useTitle("皮肤管理")
    const [file, setFile] = useState<File | null>(null)
    const setErr = useSetAtom(LayoutAlertErr)
    const [loading, setLoading] = useState(false)
    const nowToken = useAtomValue(token)
    const [ok, setOk] = useState(false)
    const [skinInfo, setSkinInfo] = useState({
        skin: "",
        cape: "",
        model: "default"
    })

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

    useUnmount(() => {
        skinInfo.skin && URL.revokeObjectURL(skinInfo.skin)
        skinInfo.cape && URL.revokeObjectURL(skinInfo.cape)
    })

    useEffect(() => {
        if (file) {
            setSkinInfo(v => {
                URL.revokeObjectURL(v.skin);
                URL.revokeObjectURL(v.cape);
                return { skin: "", cape: "", model: "" }
            })
            const nu = URL.createObjectURL(file)
            switch (redioValue) {
                case "skin":
                    setSkinInfo({ skin: nu, cape: "", model: "default" })
                    break
                case "slim":
                    setSkinInfo({ skin: nu, cape: "", model: "slim" })
                    break
                case "cape":
                    setSkinInfo({ skin: "", cape: nu, model: "slim" })
            }
        }
    }, [file, redioValue])

    const onRadioChange = (_a: React.ChangeEvent<HTMLInputElement>, value: string) => {
        setRedioValue(value)
    }
    
    const handleChange = (newFile: File | null) => {
        setFile(newFile)
    }

    const handleToUpload = () => {
        if (!file || loading) return
        setLoading(true)
        const textureType = redioValue == "cape" ? "cape" : "skin"
        const model = redioValue == "slim" ? "slim" : ""
        upTextures(nowToken, textureType, model, file).then(() => setOk(true)).catch(e => [setErr(String(e)), console.warn(e)]).
            finally(() => setLoading(false))
    }

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
                        <Box sx={{ 
                            width: 80, 
                            height: 80, 
                            mr: 3,
                            background: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 12px 40px rgba(33, 150, 243, 0.4)',
                        }}>
                            <Palette sx={{ fontSize: 50, color: '#fff' }} />
                        </Box>
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
                                皮肤管理
                            </Typography>
                            <Typography variant="h6" sx={{ 
                                color: 'text.secondary',
                                fontWeight: 500,
                                fontSize: { xs: '1.1rem', md: '1.2rem' }
                            }}>
                                上传和管理您的 Minecraft 皮肤
                            </Typography>
                        </Box>
                    </Box>
                </AnimatedBox>

                <Box 
                    sx={{
                        display: "grid", 
                        gap: "2.5em", 
                        gridTemplateAreas: {
                            lg: '"a b" "a b"',
                            md: '"a" "b"',
                            xs: '"a" "b"'
                        }, 
                        gridTemplateColumns: { lg: "1fr 1fr" },
                        position: 'relative',
                        zIndex: 1,
                        maxWidth: '1400px',
                        mx: 'auto',
                    }}
                >
                    {/* 上传设置卡片 */}
                    <AnimatedCard
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        sx={{ gridArea: "a" }}
                    >
                        <CardHeader 
                            title={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <CloudUpload sx={{ 
                                        color: 'primary.main',
                                        fontSize: '1.5rem',
                                    }} />
                                    上传设置
                                </Box>
                            }
                        />
                        <CardContent>
                            <FormControl fullWidth>
                                <FormLabel sx={{ 
                                    fontWeight: 700, 
                                    color: 'text.secondary', 
                                    mb: 2,
                                    fontSize: '1.1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                }}>
                                    <Brush sx={{ fontSize: '1.2rem' }} />
                                    选择类型
                                </FormLabel>
                                
                                <RadioGroup
                                    row
                                    onChange={onRadioChange}
                                    value={redioValue}
                                    sx={{ mb: 3, gap: 2, flexWrap: 'wrap' }}
                                >
                                    <FormControlLabel 
                                        value="skin" 
                                        control={<Radio />} 
                                        label={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Person sx={{ fontSize: '1.2rem' }} />
                                                Steve (宽)
                                            </Box>
                                        } 
                                        sx={{
                                            backgroundColor: darkMode ? 'rgba(255, 179, 0, 0.08)' : 'rgba(255, 193, 7, 0.08)',
                                            borderRadius: '12px',
                                            px: 2,
                                            py: 1,
                                            border: darkMode ? '1px solid rgba(255, 179, 0, 0.2)' : '1px solid rgba(255, 193, 7, 0.2)',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                backgroundColor: darkMode ? 'rgba(255, 179, 0, 0.12)' : 'rgba(255, 193, 7, 0.12)',
                                            },
                                        }}
                                    />
                                    <FormControlLabel 
                                        value="slim" 
                                        control={<Radio />} 
                                        label={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Person sx={{ fontSize: '1.2rem' }} />
                                                Alex (窄)
                                            </Box>
                                        } 
                                        sx={{
                                            backgroundColor: darkMode ? 'rgba(255, 179, 0, 0.08)' : 'rgba(255, 193, 7, 0.08)',
                                            borderRadius: '12px',
                                            px: 2,
                                            py: 1,
                                            border: darkMode ? '1px solid rgba(255, 179, 0, 0.2)' : '1px solid rgba(255, 193, 7, 0.2)',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                backgroundColor: darkMode ? 'rgba(255, 179, 0, 0.12)' : 'rgba(255, 193, 7, 0.12)',
                                            },
                                        }}
                                    />
                                    <FormControlLabel 
                                        value="cape" 
                                        control={<Radio />} 
                                        label={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Image sx={{ fontSize: '1.2rem' }} />
                                                披风
                                            </Box>
                                        } 
                                        sx={{
                                            backgroundColor: darkMode ? 'rgba(255, 179, 0, 0.08)' : 'rgba(255, 193, 7, 0.08)',
                                            borderRadius: '12px',
                                            px: 2,
                                            py: 1,
                                            border: darkMode ? '1px solid rgba(255, 179, 0, 0.2)' : '1px solid rgba(255, 193, 7, 0.2)',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                backgroundColor: darkMode ? 'rgba(255, 179, 0, 0.12)' : 'rgba(255, 193, 7, 0.12)',
                                            },
                                        }}
                                    />
                                </RadioGroup>
                                
                                <Box sx={{ mb: 3 }}>
                                    <MuiFileInput 
                                        label="选择 PNG 文件" 
                                        value={file} 
                                        inputProps={{ accept: 'image/png' }} 
                                        onChange={handleChange}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '16px',
                                                backgroundColor: darkMode ? 'rgba(255, 179, 0, 0.05)' : 'rgba(255, 193, 7, 0.05)',
                                                border: darkMode ? '1px solid rgba(255, 179, 0, 0.2)' : '1px solid rgba(255, 193, 7, 0.2)',
                                                '&:hover': {
                                                    borderColor: darkMode ? 'rgba(255, 179, 0, 0.4)' : 'rgba(255, 193, 7, 0.4)',
                                                },
                                            },
                                        }}
                                    />
                                </Box>
                            </FormControl>
                        </CardContent>
                        
                        <CardActions sx={{ 
                            p: 3,
                            pt: 0,
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <Button 
                                variant="contained" 
                                onClick={handleToUpload}
                                disabled={!file || loading}
                                startIcon={loading ? <Box sx={{ width: 20, height: 20, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /> : <Upload />}
                                sx={{ 
                                    borderRadius: '20px',
                                    fontWeight: 800,
                                    px: 8,
                                    py: 2,
                                    fontSize: '1.1rem',
                                    minWidth: '160px',
                                    height: '56px',
                                    boxShadow: '0 8px 32px rgba(255, 193, 7, 0.4)',
                                    '&:hover': {
                                        boxShadow: '0 12px 40px rgba(255, 193, 7, 0.6)',
                                        transform: 'translateY(-2px)',
                                    },
                                    '&:active': {
                                        transform: 'translateY(0)',
                                    },
                                    '&.Mui-disabled': {
                                        boxShadow: 'none',
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                    },
                                }}
                            >
                                {loading ? '上传中...' : '上传皮肤'}
                            </Button>
                        </CardActions>
                    </AnimatedCard>

                    {/* 预览卡片 */}
                    <AnimatedCard
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        sx={{ gridArea: "b" }}
                    >
                        <CardHeader 
                            title={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Visibility sx={{ 
                                        color: 'primary.main',
                                        fontSize: '1.5rem',
                                    }} />
                                    实时预览
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
                            minHeight: '400px',
                        }}>
                            {file ? (
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
                                    <ReactSkinview3d
                                        skinUrl={skinInfo.skin}
                                        capeUrl={skinInfo.cape}
                                        height="280"
                                        width="280"
                                        options={{ model: skinInfo.model as "default" | "slim" }}
                                    />
                                </Box>
                            ) : (
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 2,
                                    color: 'text.secondary',
                                }}>
                                    <Palette sx={{ fontSize: 64, opacity: 0.5 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        选择文件开始预览
                                    </Typography>
                                    <Typography variant="body2" sx={{ textAlign: 'center' }}>
                                        支持的格式：PNG<br />
                                        皮肤尺寸：64x64 或 64x32<br />
                                        披风尺寸：64x32
                                    </Typography>
                                </Box>
                            )}
                        </CardContent>
                    </AnimatedCard>
                </Box>

                {/* 添加浮动动画的 CSS */}
                <style>
                    {`
                        @keyframes float {
                            0%, 100% { transform: translateY(0px) rotate(0deg); }
                            50% { transform: translateY(-20px) rotate(180deg); }
                        }
                        
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}
                </style>
            </Box>
            
            <Snackbar
                open={ok}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={() => setOk(false)}
                message={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CheckCircle sx={{ color: '#4caf50' }} />
                        皮肤上传成功！
                    </Box>
                }
                sx={{
                    '& .MuiSnackbar-root': {
                        backgroundColor: '#4caf50',
                        color: 'white',
                        borderRadius: '12px',
                    },
                }}
            />
            {loading && <Loading />}
        </ThemeProvider>
    )
}

export default Textures