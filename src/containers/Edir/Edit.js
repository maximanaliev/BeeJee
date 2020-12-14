import React, {useEffect, useState} from 'react';
import PopupModal from "../../componenets/UI/PopupModal/PopupModal";
import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import {useDispatch} from "react-redux";
import {updateData} from "../../store/actions/actions";

const useStyles = makeStyles((theme) => ({
    edit: {
        backgroundColor: '#fff',
        padding: theme.spacing(3),
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
    select: {
        width: '100%',
        margin: '8px 0',
    }
}));

const Edit = props => {

    const classes = useStyles();

    const dispatch = useDispatch();

    const [option, setOption] = useState('');
    const [text, setText] = useState('');

    useEffect(() => {
        props.oneData && setOption(JSON.stringify(props.oneData.status));
        props.oneData && setText(props.oneData.text);
    }, [props]);

    const state = {status: Number(option), text, token: props.token};

    const submit = event => {
        event.preventDefault();
        const formData = new FormData();
        for ( let key in state ) {
            formData.append(key, state[key]);
        }
        dispatch(updateData(
            formData,
            props.oneData && props.oneData.id,
            {params: props.params},
            {updateSuccess}
            ))
    };

    const updateSuccess = () => {
        props.close();
    };

    return (
        <PopupModal
            open={props.open}
            close={props.close}
            children={(
                <div className={classes.edit}>
                    <form onSubmit={submit}>
                        <TextField
                            className={classes.select}
                            required
                            select
                            value={option === '0' ? 'На рассмотрении' : 'Сделано'}
                            onChange={event => setOption(event.target.value === 'Сделано' ? '1' : '0')}
                            SelectProps={{
                                native: true,
                            }}
                            variant="outlined"
                        >
                            <option>
                                Сделано
                            </option>
                            <option>
                                На рассмотрении
                            </option>
                        </TextField>
                        <TextareaAutosize
                            className={classes.textarea}
                            required
                            value={text}
                            onChange={event => setText(event.target.value)}
                            placeholder="Описание*"
                            autoComplete="new-text"
                            rowsMin={5}
                        />
                        <Button
                            className={classes.btn}
                            type="submit"
                            variant="outlined"
                            color="primary"
                        >
                            Редактировать
                        </Button>
                    </form>
                </div>
            )}
        />
    );
};

export default Edit;