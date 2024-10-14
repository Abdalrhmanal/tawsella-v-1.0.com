import {
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { MouseEvent, ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import logo from 'assets/logo/elegent-favicon-logo.png';
import Image from 'components/base/Image';

const AccountDropdown = (): ReactElement => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userType, setUserType] = useState<string>('');
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  useEffect(() => {
    // جلب البيانات المشفرة من الكوكيز
    const storedUserData = Cookies.get('user_type');
    if (storedUserData) {
      // فك تشفير السلسلة وتحويلها إلى كائن JSON
      const decodedUserData = decodeURIComponent(storedUserData);
      const userData = JSON.parse(decodedUserData);
      console.log(userData);

      setUserType(userData.user_type); // عرض نوع المستخدم
    }
  }, []);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // مسح جميع الكوكيز
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.split("=");
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });

    // نقل المستخدم إلى واجهة تسجيل الدخول
    navigate('/authentication/login');
  };

  return (
    <>
      <Button
        color="inherit"
        id="account-dropdown-button"
        aria-controls={open ? 'account-dropdown-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          borderRadius: 2,
          gap: 1.875,
          px: { xs: 0, sm: 0.625 },
          py: 0.625,
        }}
      >
        <Tooltip title={`${userType}`} placement="top" arrow enterDelay={0} leaveDelay={0}>
          <Image src={logo} width={70} height={40} sx={{mb:1.5}}/>
        </Tooltip>
        <Typography
          variant="body1"
          component="p"
          color="text.primary"
          display={{ xs: 'none', sm: 'block' }}
        >
          {userType || 'Admin'}
        </Typography>
        <IconifyIcon
          icon="ion:caret-down-outline"
          width={24}
          height={24}
          color="text.primary"
          display={{ xs: 'none', sm: 'block' }}
        />
      </Button>
      <Menu
        id="account-dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'account-dropdown-button',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <IconifyIcon icon="ion:home-sharp" />
          </ListItemIcon>
          <ListItemText
            sx={(theme) => ({
              '& .MuiListItemText-primary': {
                fontSize: theme.typography.body1.fontSize,
                fontFamily: theme.typography.body1.fontFamily,
                fontWeight: theme.typography.body1.fontWeight,
              },
            })}
          >
            Home
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <IconifyIcon icon="mdi:account-outline" />
          </ListItemIcon>
          <ListItemText
            sx={(theme) => ({
              '& .MuiListItemText-primary': {
                fontSize: theme.typography.body1.fontSize,
                fontFamily: theme.typography.body1.fontFamily,
                fontWeight: theme.typography.body1.fontWeight,
              },
            })}
          >
            Profile
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <IconifyIcon icon="material-symbols:settings" />
          </ListItemIcon>
          <ListItemText
            sx={(theme) => ({
              '& .MuiListItemText-primary': {
                fontSize: theme.typography.body1.fontSize,
                fontFamily: theme.typography.body1.fontFamily,
                fontWeight: theme.typography.body1.fontWeight,
              },
            })}
          >
            Settings
          </ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleClose();
            handleLogout();
          }}
          disableRipple
          disableTouchRipple
          sx={{ color: 'error.main' }}
        >
          <ListItemIcon>
            <IconifyIcon icon="ri:logout-circle-line" color="error.main" />
          </ListItemIcon>
          <ListItemText
            sx={(theme) => ({
              '& .MuiListItemText-primary': {
                fontSize: theme.typography.body1.fontSize,
                fontFamily: theme.typography.body1.fontFamily,
                fontWeight: theme.typography.body1.fontWeight,
              },
            })}
          >
            Logout
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountDropdown;
