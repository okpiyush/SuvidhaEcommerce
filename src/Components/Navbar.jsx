import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Badge, IconButton, InputBase, Paper, Menu, MenuItem as MuiMenuItem, Tooltip } from '@mui/material';
import { Search, ShoppingCartOutlined, AccountCircle, HeadsetMic, Logout, Person } from '@mui/icons-material';
import { LoginContext } from '../Contexts/LoginContext';
import { useNavigate, Link } from 'react-router-dom';

const NavContainer = styled.div`
    height: 70px;
    background-color: var(--primary);
    color: white;
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
`;

const NavWrapper = styled.div`
    width: 100%;
    max-width: 1248px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    align-items: center;
`;

const Left = styled.div`
    display: flex;
    align-items: center;
`;

const LogoLink = styled(Link)`
    text-decoration: none;
    color: white;
    display: flex;
    align-items: center;
    gap: 8px;

    h1 {
        font-size: 24px;
        font-weight: 800;
        letter-spacing: -1px;
        margin: 0;
        background: linear-gradient(135deg, white 0%, #94a3b8 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .dot {
        width: 8px;
        height: 8px;
        background-color: var(--accent);
        border-radius: 50%;
        margin-top: 4px;
    }
`;

const SearchContainer = styled(Paper)`
    flex: 1;
    margin: 0 60px;
    height: 42px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-radius: 50px !important;
    background-color: rgba(255, 255, 255, 0.1) !important;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: none !important;
    transition: all 0.3s;

    &:hover, &:focus-within {
        background-color: white !important;
        border-color: var(--accent);
        .MuiInputBase-input { color: #1e293b; }
    }
`;

const StyledInputBase = styled(InputBase)`
    margin-left: 8px;
    flex: 1;
    font-size: 14px;
    color: white;
    & .MuiInputBase-input::placeholder {
        color: rgba(255, 255, 255, 0.6);
        opacity: 1;
    }
`;

const Right = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`;

const NavItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-weight: 500;
    font-size: 14px;
    color: #e2e8f0;
    transition: all 0.2s;

    &:hover {
        color: var(--accent);
    }
`;

const ActionButton = styled.button`
    background-color: var(--accent);
    color: white;
    border: none;
    padding: 10px 24px;
    font-weight: 600;
    font-size: 14px;
    border-radius: 50px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 16px rgba(16, 185, 129, 0.3);
    }
`;

const Navbar = () => {
    const { loginData, handleLogout, cart } = useContext(LoginContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const onLogout = () => {
        handleLogout();
        handleMenuClose();
        navigate("/");
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            if (searchQuery.trim()) {
                navigate(`/products?search=${searchQuery.trim()}`);
            }
        }
    };

    return (
        <NavContainer>
            <NavWrapper>
                <Left>
                    <LogoLink to="/">
                        <h1>SUVIDHA</h1>
                        <div className="dot"></div>
                    </LogoLink>
                </Left>

                <SearchContainer elevation={0}>
                    <StyledInputBase
                        placeholder="Search our collection..."
                        inputProps={{ 'aria-label': 'search products' }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleSearch}
                    />
                    <IconButton
                        type="button"
                        sx={{ p: '8px', color: 'rgba(255,255,255,0.6)' }}
                        aria-label="search"
                        onClick={handleSearch}
                    >
                        <Search sx={{ fontSize: 20 }} />
                    </IconButton>
                </SearchContainer>

                <Right>
                    {!loginData ? (
                        <>
                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                <ActionButton>Sign In</ActionButton>
                            </Link>
                            <NavItem onClick={() => navigate("/register")}>
                                Seller Hub
                            </NavItem>
                        </>
                    ) : (
                        <>
                            <NavItem onClick={handleMenuOpen}>
                                <AccountCircle sx={{ fontSize: 28 }} />
                                {loginData.username}
                            </NavItem>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleMenuClose}
                                PaperProps={{
                                    sx: {
                                        mt: 1.5,
                                        minWidth: 150,
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                                    }
                                }}
                            >
                                <MuiMenuItem onClick={() => { navigate("/profile"); handleMenuClose(); }}>
                                    <Person sx={{ mr: 1, fontSize: 20, color: 'var(--text-muted)' }} /> Profile
                                </MuiMenuItem>
                                <MuiMenuItem onClick={onLogout}>
                                    <Logout sx={{ mr: 1, fontSize: 20, color: '#f43f5e' }} /> Logout
                                </MuiMenuItem>
                            </Menu>
                        </>
                    )}

                    <Tooltip title="Help & Support">
                        <NavItem onClick={() => navigate("/chat")}>
                            <HeadsetMic />
                        </NavItem>
                    </Tooltip>

                    <NavItem onClick={() => navigate("/cart")}>
                        <Badge badgeContent={cart?.length || 0} color="error">
                            <ShoppingCartOutlined />
                        </Badge>
                        Cart
                    </NavItem>
                </Right>
            </NavWrapper>
        </NavContainer>
    );
};

export default Navbar;