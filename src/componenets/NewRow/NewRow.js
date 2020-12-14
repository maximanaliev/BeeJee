import React, {useState} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import FormElement from "../UI/Form/FormElement";
import Button from "@material-ui/core/Button";
import {useDispatch} from "react-redux";
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import withStyles from "@material-ui/core/styles/withStyles";
import {addData} from "../../store/actions/actions";
import Grid from "@material-ui/core/Grid";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const Accordion = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        borderBottom: '2px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
            borderBottom: 'none',
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        borderBottom: '2px solid rgba(0, 0, 0, .125)',
    },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
        textAlign: "left",
        fontWeight: "bold",
        color: '#115293'
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    btn: {
        fontSize: "15px",
        textTransform: "none",
    },
    textarea: {
        width: '100%',
        padding: theme.spacing(1),
        borderRadius: 4,
        borderColor: 'rgb(0, 0, 0, 0.2)',
        '&:focus': {
            outlineColor: '#115293',
        }
    },
}));

const NewRow = props => {

    const classes = useStyles();

    const dispatch = useDispatch();

    const [expanded, setExpanded] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const state = {username, text, email};

    const submit = event => {
        event.preventDefault();
        const formData = new FormData();
        for ( let key in state ) {
            formData.append(key, state[key]);
        }
        dispatch(addData(formData, {dataAddSuccess}, {params: props.params}))
    };

    const dataAddSuccess = () => {
        setExpanded(null);
        setUsername('');
        setText('');
        setEmail('');
    };

    return (
        <>
            <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                >
                    <Typography className={classes.heading}>
                        Добавить
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container justify="center">
                        <Grid item xs={6} md={6} lg={4}>
                            <form onSubmit={submit}>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <FormElement
                                            required
                                            propertyName="username"
                                            value={username}
                                            title="Имя"
                                            onChange={event => setUsername(event.target.value)}
                                            placeholder="имя"
                                            autoComplete="new-username"
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <FormElement
                                            required
                                            type="email"
                                            propertyName="email"
                                            value={email}
                                            title="Email"
                                            onChange={event => setEmail(event.target.value)}
                                            placeholder="email"
                                            autoComplete="new-email"
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <TextareaAutosize
                                            className={classes.textarea}
                                            required
                                            value={text}
                                            onChange={event => setText(event.target.value)}
                                            placeholder="Описание*"
                                            autoComplete="new-text"
                                            rowsMin={5}
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <Button
                                            className={classes.btn}
                                            type="submit"
                                            variant="outlined"
                                            color="primary"
                                        >
                                            Добавить в таблицу
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default NewRow;