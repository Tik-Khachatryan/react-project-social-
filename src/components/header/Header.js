import {Link} from "react-router-dom";
import React, {Fragment, useState, useEffect} from "react";
import './Header.css';
import AppBar from '@material-ui/core/AppBar';
import {fade, makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import Badge from '@material-ui/core/Badge';


const useStyles = makeStyles(theme => ({
    grow:           {
        flexGrow: 1,
    },
    search:         {
        position:                     'relative',
        borderRadius:                 theme.shape.borderRadius,
        backgroundColor:              fade(theme.palette.common.white, 0.15),
        '&:hover':                    {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight:                  theme.spacing(2),
        marginLeft:                   0,
        width:                        '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width:      'auto',
        },
    },
    searchIcon:     {
        width:          theme.spacing(7),
        height:         '100%',
        position:       'absolute',
        pointerEvents:  'none',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
    },
    inputRoot:      {
        color: 'inherit',
    },
    inputInput:     {
        padding:                      theme.spacing(1, 1, 1, 7),
        transition:                   theme.transitions.create('width'),
        width:                        '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display:                      'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile:  {
        display:                      'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    root:           {
        flexGrow: 1,
    },
    menuButton:     {
        marginRight: theme.spacing(2),
    },
    title:          {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar({init, setInit}) {
    const classes                 = useStyles();
    const logOut                  = () => {
        setInit({complete: false});
        localStorage.clear('accessToken');
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick             = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose             = () => {
        setAnchorEl(null);
    };


    //__________search__________


    const [value, setValue] = useState({search: ''});
    const [user, setUser]   = useState([]);
    const handleOnChange    = (event) => {
        setValue({
            ...value,
            [event.target.name]: event.target.value
        })
    };




    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:3001/search', {
                method:  'POST',
                headers: {
                    'Accept':       'application/json',
                    'Content-Type': 'application/json',

                },
                body:    JSON.stringify({value})
            })
                .then(res => res.json())
                .then(res => {
                    setUser(res);
                })
        }, 500);

    }, [value]);


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} color="inherit">
                        <Link to="/"><Button>MY social</Button></Link>
                    </Typography>
                    {!init.complete && !localStorage.getItem('accessToken') ? <Fragment>
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                <MenuIcon/>
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}><Link to="/register">
                                    <Button>Register</Button>
                                </Link></MenuItem>
                                <MenuItem onClick={handleClose}><Link to="/login">
                                    <Button>Login</Button>
                                </Link></MenuItem>

                            </Menu>
                        </Fragment>
                        : <Fragment>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon/>
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root:  classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{'aria-label': 'search'}}
                                    onChange={handleOnChange}
                                    name={'search'}
                                />

                            </div>

                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                <AccountCircleIcon/>
                            </Button>

                            <div className={'user'}>
                                {
                                    user.map((item) => <Link to={`/profile/${item._id}?`} key={item._id}><br/>{item.name} {" "} {item.sureName}</Link>)
                                }
                            </div>


                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}><Link to="/profile">
                                    <Button>Profile <PersonIcon/></Button>
                                </Link></MenuItem>
                                <MenuItem onClick={handleClose}><Link to="/posts">
                                    <Button>Posts <ScreenShareIcon/></Button>
                                </Link></MenuItem>
                                <MenuItem onClick={handleClose}><Link onClick={logOut} to="/">
                                    <Button>Log Out <ExitToAppIcon/></Button>
                                </Link></MenuItem>

                            </Menu>

                            {/*<Badge badgeContent={4} color="primary">*/}
                            {/*    <NotificationsIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}/>*/}
                            {/*</Badge>*/}
                        </Fragment>
                    }
                </Toolbar>

            </AppBar>

        </div>
    );
}



