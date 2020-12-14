import React, {useState} from 'react';
import FormElement from "../../componenets/UI/Form/FormElement";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../store/actions/usersActions";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import PopupModal from "../../componenets/UI/PopupModal/PopupModal";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    login: {
        backgroundColor: '#fff',
        padding: theme.spacing(3),
    }
}));

const Login = props => {

    const classes = useStyles();

    const dispatch = useDispatch();
    const error = useSelector(state => state.users.loginError);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const state = ({username, password});

    const submit = event => {
        event.preventDefault();
        const formData = new FormData();
        for ( let key in state ) {
            formData.append(key, state[key]);
        }
        dispatch(loginUser(formData, props, clear))
    };

    const clear = () => {
        setUsername('');
        setPassword('');
    };

    return (
        <>
            <PopupModal
                open={props.open}
                close={props.close}
                children={(
                    <div className={classes.login}>
                        <Box pt={2} pb={2}>
                            <Typography variant="h4">Вход</Typography>
                        </Box>
                        <form onSubmit={submit}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <FormElement
                                        required
                                        propertyName="usernameLogin"
                                        title="Имя"
                                        value={username}
                                        onChange={event => setUsername(event.target.value)}
                                        placeholder="Введите имя"
                                        autoComplete="new-usernameLogin"
                                    />
                                </Grid>
                                {error && (
                                    <Grid item>
                                        <Alert severity="error">{error.error}</Alert>
                                    </Grid>
                                )}
                                <Grid item style={{display: 'flex', alignItems: 'center'}}>
                                    <FormElement
                                        propertyName="password"
                                        title="Пароль"
                                        value={password}
                                        onChange={event => setPassword(event.target.value)}
                                        type="password"
                                        autoComplete="current-password"
                                        placeholder="Введите пароль"
                                    />
                                </Grid>
                                <Grid item>
                                    <Button type="submit" color="primary" variant="contained">
                                        Войти
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                )}
            />
        </>
    );
};

export default Login;