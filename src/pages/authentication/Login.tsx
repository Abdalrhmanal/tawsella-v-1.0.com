import React, { ReactElement, Suspense, useState } from 'react';
import {
  Button, FormControl, IconButton, InputAdornment, InputLabel, Link, Skeleton, Stack, TextField, Typography, CircularProgress,
  Snackbar, Alert,
} from '@mui/material';
import loginBanner from 'assets/authentication-banners/login.png';
import IconifyIcon from 'components/base/IconifyIcon';
import logo from 'assets/logo/elegant-logo.png';
import Image from 'components/base/Image';
import axios from 'axios';
import Cookies from 'universal-cookie';
//import { useNavigate } from 'react-router-dom'; // استيراد useNavigate

// تعريف الواجهات
interface User {
  id: string;
  email: string;
  user_type: string;
  driver_state: string;
  is_active: number;
  last_location_latitude: number | null;
  last_location_longitude: number | null;
  mail_code_verified_at: string;
  mail_verify_code: string | null;
  mail_code_attempts_left: number;
  mail_code_last_attempt_date: string | null;
  mail_verify_code_sent_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface LoginResponse {
  data: {
    token: string;
    user: User;
  };
}

const Login = (): ReactElement => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const cookies = new Cookies();
  //const navigate = useNavigate(); // استخدام useNavigate

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');
    setSnackbarOpen(false); // إغلاق الـ Snackbar

    try {
      const response = await axios.post<LoginResponse>('http://127.0.0.1:8000/api/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } }
      );

      if (response.status === 200) {
        const { token, user } = response.data.data;
        cookies.set('authToken', token, { path: '/' });
        cookies.set('userData', JSON.stringify(user), { path: '/' });
        setSuccessMessage('Login successful!'); // تعيين رسالة النجاح
        setSnackbarOpen(true); // فتح Snackbar

        // تأخير التوجيه حتى تظهر رسالة النجاح
        setTimeout(() => {
          window.location.href = '/';
        }, 1000); // تأخير لمدة ثانية (1000 مللي ثانية)
      } else {
        setError('Invalid credentials');
        setSnackbarOpen(true); // فتح Snackbar عند وجود خطأ
      }
    } catch (error) {
      setError('Error occurred during login');
      setSnackbarOpen(true); // فتح Snackbar عند وجود خطأ
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Snackbar لعرض رسائل النجاح أو الخطأ */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={successMessage ? 'success' : 'error'}>
          {successMessage || error}
        </Alert>
      </Snackbar>

      <Stack
        direction="row"
        bgcolor="background.paper"
        boxShadow={(theme) => theme.shadows[3]}
        height={560}
        width={{ md: 960 }}
      >
        <Stack width={{ md: 0.5 }} m={2.5} gap={10}>
          <Link href="/" width="fit-content">
            <Image src={logo} width={82.6} />
          </Link>
          <Stack alignItems="center" gap={2.5} width={330} mx="auto">
            <Typography variant="h3">Login</Typography>
            <form onSubmit={handleSubmit}>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="email">
                  Email
                </InputLabel>
                <TextField
                  variant="filled"
                  placeholder="Enter your email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconifyIcon icon="ic:baseline-email" />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink htmlFor="password">
                  Password
                </InputLabel>
                <TextField
                  variant="filled"
                  placeholder="********"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                          sx={{
                            color: 'text.secondary',
                          }}
                        >
                          {showPassword ? (
                            <IconifyIcon icon="ic:baseline-key-off" />
                          ) : (
                            <IconifyIcon icon="ic:baseline-key" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>

              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={loading}
                sx={{
                  mt: 2.5,
                }}
              >
                {loading ? <CircularProgress size={24} /> : 'Log in'}
              </Button>
            </form>
            <Typography
              variant="body1"
              sx={{
                alignSelf: 'center',
              }}
            >
              <Link href="/authentication/forgot-password" underline="hover">
                Forget password
              </Link>
            </Typography>
          </Stack>
        </Stack>
        <Suspense
          fallback={
            <Skeleton variant="rectangular" height={1} width={1} sx={{ bgcolor: 'primary.main' }} />
          }
        >
          <Image
            alt="Login banner"
            src={loginBanner}
            sx={{
              width: 0.5,
              display: { xs: 'none', md: 'block' },
            }}
          />
        </Suspense>
      </Stack>
    </>
  );
};

export default Login;
