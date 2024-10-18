import { ReactElement, useState } from 'react';
import axios from 'axios';
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  Link,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'components/base/Image';
import { Suspense } from 'react';
import forgotPassword from 'assets/authentication-banners/forgot-password.png';
import IconifyIcon from 'components/base/IconifyIcon';
import logo from 'assets/logo/elegant-logo.png';

const ForgotPassword = (): ReactElement => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
<<<<<<< HEAD
      const response = await axios.post('https://tawsella.online/api/verify-mail', { email });
=======
      const response = await axios.post('http://127.0.0.1:8000/api/verify-mail', { email });
>>>>>>> 8ece63a93a954746e9a60c70c5bace5436cdf940

      if (response.status === 200) {
        setSuccess('Password reset link has been sent to your email.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      direction="row"
      bgcolor="background.paper"
      boxShadow={(theme) => theme.shadows[3]}
      height={560}
      width={{ md: 960 }}
    >
      <Stack width={{ md: 0.5 }} m={2.5} gap={10}>
        <Link href="/" width="fit-content">
          <Image src={logo} width={82.6}  sx={{p:0}}/>
        </Link>
        <Stack alignItems="center" gap={6.5} width={330} mx="auto">
          <Typography variant="h3">Forgot Password</Typography>
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
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
          {success && (
            <Typography variant="body2" color="success.main">
              {success}
            </Typography>
          )}
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Password Reset Link'}
          </Button>
          <Typography variant="body2" color="text.secondary">
            Back to{' '}
            <Link
              href="/authentication/login"
              underline="hover"
              fontSize={(theme) => theme.typography.body1.fontSize}
            >
              Log in
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
          src={forgotPassword}
          sx={{
            width: 0.5,
            display: { xs: 'none', md: 'block' },
          }}
        />
      </Suspense>
    </Stack>
  );
};

export default ForgotPassword;
