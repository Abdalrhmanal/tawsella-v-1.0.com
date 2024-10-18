import { ReactElement, useState } from 'react';
import axios from 'axios';
import {
    Button,
    FormControl,
    InputAdornment,
    InputLabel,
    Link,
    Stack,
    TextField,
    Typography,
    Skeleton,
} from '@mui/material';
import Image from 'components/base/Image';
import { Suspense } from 'react';
//import changePasswordBanner from 'assets/authentication-banners/change-password.png';
import forgotPassword from 'assets/authentication-banners/forgot-password.png';
import IconifyIcon from 'components/base/IconifyIcon';
import logo from 'assets/logo/elegant-logo.png';

const ChangePassword = (): ReactElement => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [showPasswords, setShowPasswords] = useState(false); // Added state for showing passwords

    const handleSubmit = async () => {
        if (newPassword !== newPasswordConfirmation) {
            setError('New passwords do not match.');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post('https://tawsella.online/api/change-password', {
                current_password: currentPassword,
                new_password: newPassword,
                new_password_confirmation: newPasswordConfirmation,
            });

            if (response.status === 200) {
                setSuccess('Password changed successfully.');
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
            <Stack width={{ md: 0.5 }} m={2.5} gap={5}>
                <Link href="/" width="fit-content">
                    <Image src={logo} width={82.6} sx={{p:0}}/>
                </Link>
                <Stack alignItems="center" gap={2.5} width={330} mx="auto">
                    <Typography variant="h3">Change Password</Typography>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel shrink htmlFor="current-password">
                            Current Password
                        </InputLabel>
                        <TextField
                            variant="filled"
                            placeholder="Enter your current password"
                            id="current-password"
                            type={showPasswords ? 'text' : 'password'} // Toggle between 'text' and 'password'
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end" onClick={() => setShowPasswords(!showPasswords)}>
                                        <IconifyIcon icon="ic:baseline-key" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormControl>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel shrink htmlFor="new-password">
                            New Password *
                        </InputLabel>
                        <TextField
                            variant="filled"
                            placeholder="Enter your new password"
                            id="new-password"
                            type={showPasswords ? 'text' : 'password'} // Toggle between 'text' and 'password'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end" onClick={() => setShowPasswords(!showPasswords)}>
                                        <IconifyIcon icon="ic:baseline-key" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormControl>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel shrink htmlFor="new-password-confirmation">
                            Confirm New Password *
                        </InputLabel>
                        <TextField
                            variant="filled"
                            placeholder="Confirm your new password"
                            id="new-password-confirmation"
                            type={showPasswords ? 'text' : 'password'} // Toggle between 'text' and 'password'
                            value={newPasswordConfirmation}
                            onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end" onClick={() => setShowPasswords(!showPasswords)}>
                                        <IconifyIcon icon="ic:baseline-key" />
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
                        {loading ? 'Changing...' : 'Change Password'}
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

export default ChangePassword;
