import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useRequest, useTitle } from 'ahooks';
import { getConfig } from '@/apis/apis';
import { useEffect, useRef, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CaptchaWidget from '@/components/CaptchaWidget';
import type { refType as CaptchaWidgetRef } from '@/components/CaptchaWidget'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useNavigate } from "react-router-dom";
import { ApiErr } from '@/apis/error';
import Loading from '@/components/Loading';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import { motion } from 'framer-motion';

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
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            '& fieldset': {
              borderColor: 'rgba(203, 213, 225, 0.5)',
            },
            '&:hover fieldset': {
              borderColor: '#c7d2fe',
            },
            '&.Mui-focused fieldset': {
              borderWidth: '1px',
              borderColor: '#818cf8',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#64748b',
            '&.Mui-focused': {
              color: '#6366f1',
              fontWeight: 500,
            },
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
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

// 动画组件
const AnimatedBox = motion(Box);

export default function SendEmail({ title, anyEmail = false, sendService }: { title: string, anyEmail?: boolean, sendService: (email: string, captchaToken: string) => Promise<unknown> }) {
  const [err, setErr] = useState("");
  const [domain, setDomain] = useState("");
  const [email, setEmail] = useState("")
  const captchaRef = useRef<CaptchaWidgetRef>(null)
  const [captchaToken, setCaptchaToken] = useState("");
  const [open, setOpen] = useState(false);
  useTitle(title)
  const navigate = useNavigate();
  const [helperText, setHelperText] = useState("")
  const [loading, setLoading] = useState(false);

  const server = useRequest(getConfig, {
    cacheKey: "/api/v1/config",
    staleTime: 60000,
    onError: e => {
      console.warn(e)
      setErr(String(e))
    }
  })

  useEffect(() => {
    if (server.data?.AllowDomain.length != 0) {
      setDomain(server.data?.AllowDomain[0] ?? "")
    }
  }, [server.data?.AllowDomain])

  const emailonChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(e.target.value)
    if (e.target.value == "") {
      setHelperText("邮箱不得为空")
    }
    setHelperText("")
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email == "") {
      setHelperText("邮箱不得为空")
    }
    const sendEmail = (() => {
      if (!anyEmail && domain != "") {
        return `${email}@${domain}`
      }
      return email
    })()

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(sendEmail)) {
      setHelperText("邮箱格式错误")
      return
    }
    if (!anyEmail && server.data?.EmailReg && server.data?.EmailReg != ""
      && !new RegExp(server.data?.EmailReg).test(sendEmail)) {
      setHelperText(server.data?.EmailRegMsg ?? "邮箱不满足正则要求")
      return
    }

    if (server.data?.captcha.type != "" && captchaToken == "") {
      return
    }
    setLoading(true)
    sendService(sendEmail, captchaToken).then(() => setOpen(true)).catch(e => {
      captchaRef.current?.reload()
      console.warn(e)
      if (e instanceof ApiErr) {
        switch (e.code) {
          case 10:
            setErr("验证码错误")
            return
          case 11:
            setErr("暂时无法对此邮箱发送邮件")
            return
        }
      }
      setErr(String(e))
    }).finally(() => setLoading(false))
  }

  const handleClose = () => {
    navigate("/")
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 装饰性背景元素 - 与登录页面相同 */}
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
        
        <Container maxWidth="xs" component="main" sx={{ position: 'relative', zIndex: 1 }}>
          <Fade in={true} timeout={600}>
            <Box
              sx={{
                p: { xs: 3, sm: 4, md: 5 },
                borderRadius: '24px',
                backdropFilter: 'blur(12px)',
                backgroundColor: 'rgba(255, 255, 255, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                boxShadow: '0 20px 50px rgba(31, 41, 55, 0.12)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* 装饰性光泽效果 */}
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.8), transparent)',
              }} />
              
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
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
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
                        backdropFilter: 'blur(4px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <LockOutlinedIcon 
                        sx={{ 
                          fontSize: 36, 
                          color: '#6366f1',
                          filter: 'drop-shadow(0 2px 4px rgba(99, 102, 241, 0.3))'
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
                    background: 'linear-gradient(to right, #6366f1, #8b5cf6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.5px',
                  }}
                >
                  {title}
                </Typography>
                
                <Typography variant="body2" sx={{ 
                  color: 'text.secondary',
                  mb: 3,
                  textAlign: 'center',
                  maxWidth: '300px',
                }}>
                  输入您的邮箱，我们将发送验证邮件
                </Typography>
                
                <Box component="form" noValidate onSubmit={onSubmit} sx={{ width: '100%', mt: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ display: 'grid', columnGap: '16px', gridTemplateColumns: server.data?.AllowDomain.length != 0 && !anyEmail ? "1fr auto" : "1fr" }}>
                      <TextField 
                        fullWidth
                        required
                        name="email"
                        label="邮箱"
                        value={email}
                        helperText={helperText}
                        error={helperText != ""}
                        onChange={emailonChange}
                      />
                      {
                        server.data?.AllowDomain.length != 0 && !anyEmail &&
                        <FormControl sx={{ minWidth: 120 }}>
                          <InputLabel>域名</InputLabel>
                          <Select 
                            label="域名" 
                            value={domain} 
                            onChange={v => setDomain(v.target.value)}
                          >
                            {server.data?.AllowDomain.map(v => <MenuItem value={v}>@{v}</MenuItem>)}
                          </Select>
                        </FormControl>
                      }
                    </Grid>
                    <Grid item xs={12}>
                      <CaptchaWidget ref={captchaRef} onSuccess={setCaptchaToken} />
                    </Grid>
                  </Grid>
                  
                  <AnimatedBox
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    sx={{ mt: 2 }}
                  >
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={loading}
                      sx={{
                        mt: 3,
                        mb: 3,
                        py: 1.5,
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
                          发送中...
                        </Box>
                      ) : '发送验证邮件'}
                      
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
                </Box>
              </Box>
            </Box>
          </Fade>
          
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
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                borderRadius: '12px',
              }}
            >
              {err}
            </Alert>
          </Snackbar>
          
          <Dialog 
            open={open}
            PaperProps={{
              sx: {
                borderRadius: '24px',
                backdropFilter: 'blur(12px)',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                boxShadow: '0 20px 50px rgba(31, 41, 55, 0.12)',
              }
            }}
          >
            <DialogTitle sx={{ 
              background: 'linear-gradient(to right, #6366f1, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
            }}>
              邮件已发送
            </DialogTitle>
            <DialogContent>
              <Typography>
                请到收件箱（或垃圾箱）点击验证链接以继续。
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={handleClose}
                sx={{
                  background: 'linear-gradient(to right, #6366f1, #8b5cf6)',
                  color: 'white',
                  borderRadius: '12px',
                  fontWeight: 600,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 12px rgba(79, 70, 229, 0.2)',
                  },
                }}
              >
                返回首页
              </Button>
            </DialogActions>
          </Dialog>
          
          {loading && <Loading />}
        </Container>
      </Box>
    </ThemeProvider>
  );
}