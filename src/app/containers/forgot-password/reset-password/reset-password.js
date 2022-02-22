import React from 'react'
import { compose } from "recompose";
import { connect } from "react-redux";
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faKey} from '@fortawesome/free-solid-svg-icons'

const styles = theme => ({
    layout: {
        display: 'flex',
        backgroundColor: 'black',
        minHeight: '100vh',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        alignItems: 'center',
    },
    paper: {
        // marginTop: theme.spacing.unit * 8,
        display: 'block',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
        backgroundColor: 'black',
        // backgroundColor: 'green',
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        // marginTop: theme.spacing.unit * 3,
        backgroundColor: "#3D3F3F",
        '&:hover': {
            backgroundColor: "#3D3F3F",
        },
        fontFamily: 'TruenoRegular',
        fontWeight: 'normal',
        fontStyle: 'normal',
        borderRadius: 0,
        fontSize: 12,
        marginBottom: 10,
        marginTop: 40,
        // fontWeight:700
    },
    titleText: {
        fontFamily: 'TruenoLight',
        fontWeight: 'normal',
        fontStyle: 'normal',
        textAlign: 'center',
        color: '#fff',
        marginBottom: 75
    },
    loginText: {
        fontFamily: 'TruenoLight',
        fontWeight: 'normal',
        fontStyle: 'normal',
        textAlign: 'center',
        color: '#fff'
    },
    inputField: {
        backgroundColor: '#fff',
        fontSize: 10,
        fontWeight: 700,
        paddingTop: 7,
        paddingBottom: 7,
        marginTop: 5,
        marginBottom: 5
    },
    iconStyle: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 2,
    },
    minorLinks: {
        fontSize: 10,
        fontWeight: 700,
        paddingTop: 7,
        paddingBottom: 7,
        margin: 5,
        textAlign: 'center',
        color: '#fff',
        fontFamily: 'Montserrat, sans-serif',
        letterSpacing: 1,
    },
    minorPadding: {
        marginBottom: 75,
        cursor: 'pointer'
    },
    loginLogo: {
        content: `url("${theme.loginLogoUrl}")`
    },
    loginLogoDiv: {
        textAlign: 'center'
    },
    background: {
        backgroundColor: 'black'
    }

});

const mapDispatchToProps = ({ forgotPassword }) => {
    return {
        ...forgotPassword
    };
};

const mapStateToProps = ({ forgotPassword }) => {
    return {
        ...forgotPassword
    };
};

class ResetPassword extends React.Component{

    constructor(props){
        super(props)
        this.state={
            errorMsg: null
        }
    }

    onSubmit(event){
        event.preventDefault()
        let data = new FormData(event.target)
        console.log('password', data.get('password'), data.get('confirmPassword'))
        if(data.get('password').length < 8){
            this.setState({errorMsg: 'Password should be atleast 8 charecters long'})
            return
        }
        else if(data.get('password') !== data.get('confirmPassword')){
            console.log('error')
            this.setState({errorMsg: "Password doesn't match"})
            return
        }
        else{
            this.setState({errorMsg: null})
        }
        let search = this.props.location.search.substring(1).split('&')
        console.log(search)
        let query = {}
        for (let i in search){
            console.log(i)
            let x = search[i].split("=")
            query[x[0]] = x[1]
        }
        query.password = data.get("password")
        query.confirmPassword = data.get('confirmPassword')
        console.log('query', query)
        //call service to reset password
        this.props.resetPassword({...query, resetPasswordToken: query.reset_token})

    }

    render() {
        let { classes } = this.props
        return (
            <div className={classes.background}>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography variant="display1" className={classes.titleText}>MATERIA MX</Typography>
                        <div className={classes.loginLogoDiv}><img className={classes.loginLogo} alt=""/></div>
                        <Typography variant="headline" className={classes.loginText}>Reset password</Typography>
                        <form className={classes.form} onSubmit={this.onSubmit.bind(this)}>
                            <FormControl 
                                required 
                                fullWidth
                            >
                                <Input
                                    id="password"
                                    name="password"
                                    required
                                    autoFocus
                                    type="password"
                                    placeholder='New Password'
                                    className={classes.inputField}
                                    startAdornment={
                                        <InputAdornment position="start" className={classes.iconStyle}>
                                            <FontAwesomeIcon icon={faKey} />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <FormControl 
                                required 
                                fullWidth
                                error={this.state.errorMsg ? true : false}
                            >
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    required
                                    type="password"
                                    placeholder='Confirm New Password'
                                    className={classes.inputField}
                                    startAdornment={
                                        <InputAdornment position="start" className={classes.iconStyle}>
                                            <FontAwesomeIcon icon={faKey} />
                                        </InputAdornment>
                                    }
                                />
                                <FormHelperText error={this.state.errorMsg ? true : false}>{this.state.errorMsg}</FormHelperText>
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="raised"
                                color="primary"
                                className={classes.submit}
                            >
                                Reset
                            </Button>
                        </form>
                    </Paper>
                </main>
            </div>
        )
    }
}

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withStyles(styles)
)(ResetPassword);