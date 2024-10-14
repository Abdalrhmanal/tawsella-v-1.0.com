

const LanguageDropdown =()=> {
  /* const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);

  const handleClickItem = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (id: number) => {
    setSelectedIndex(id);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }; */
  return (
    <>
       {/* <IconButton
        onClick={handleClickItem}
        id="language-menu"
        aria-controls={open ? 'language-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{
          backgroundColor: 'inherit',
          borderRadius: 999,
          paddingLeft: 1,
          paddingRight: 1,
        }}
      >
        <IconifyIcon icon={languages[selectedIndex].icon} width={24} height={24} />
      </IconButton>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'language-button',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {languages.map((language) => (
          <MenuItem
            key={language.id}
            selected={language.id === selectedIndex}
            onClick={() => handleMenuItemClick(language.id)}
          >
            <ListItemIcon>
              <IconifyIcon icon={language.icon} />
            </ListItemIcon>
            <ListItemText>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1">{language.label}</Typography>
                <Typography variant="subtitle2">{language.value}</Typography>
              </Stack>
            </ListItemText>
          </MenuItem>
        ))}
      </Menu> */} 
    </>
  );
};

export default LanguageDropdown;
