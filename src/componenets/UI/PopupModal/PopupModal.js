import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const PopupModal = props => {

    const classes = useStyles();

    return (
        <div>
            <Modal
                className={classes.modal}
                open={props.open}
                onClose={props.close}
            >
                {props.children}
            </Modal>
        </div>
    );
};

export default PopupModal;