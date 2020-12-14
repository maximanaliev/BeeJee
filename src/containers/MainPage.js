import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useDispatch, useSelector} from "react-redux";
import {fetchData} from "../store/actions/actions";
import NewRow from "../componenets/NewRow/NewRow";
import Preloader from "../componenets/UI/Preloader";
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import EnhancedTableHead from "../componenets/Addition/Enhanced";
import Edit from "./Edir/Edit";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    container: {
        maxHeight: 450,
    },
    lastRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 75,
        padding: theme.spacing(2),
    },
    arrows: {
        width: 150,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
}));

const MainPage = props => {

    const classes = useStyles();

    const user = useSelector(state => state.users.user);
    const data = useSelector(state => state.data.data);
    const total = useSelector(state => state.data.total);
    const preloader = useSelector(state => state.data.dataLoading);
    const dispatch = useDispatch();

    // console.log(user.message.token);

    const [page, setPage] = useState(1);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [openEdit, setOpenEdit] = useState(false);
    const [oneData, setOneData] = useState(null);

    const params = props.match.params.page ?
        props.match.params.page : undefined;

    const createData = (id, label) => {
        return {id, label};
    };

    let headCells = [
        createData('status', 'Статус'),
        createData('username', 'Имя'),
        createData('email', 'Email'),
        createData('text', 'Описание'),
    ];

    const rows = [];
    for (let i in data) {
        if (data.hasOwnProperty(i)) {
            rows.push(data[i])
        }
    }

    useEffect(() => {
        dispatch(fetchData({params: params}));
        setPage(params ? parseInt(params) : 1)
    }, [dispatch, params]);

    const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    };

    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    };

    const handleOpenEdit = id => {
        setOpenEdit(true);
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].id === id){
                setOneData(rows[i]);
            }
        }
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    return (
        <div className={classes.root}>
            <NewRow
                params={params}
            />
            {preloader ?
                <Preloader/> :
                <Paper className={classes.paper}>
                    <TableContainer className={classes.container}>
                        <Table
                            className={classes.table}
                        >
                            <EnhancedTableHead
                                headCells={headCells}
                                classes={classes}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                            />
                            <TableBody>
                                {stableSort(rows, getComparator(order, orderBy))
                                    .map((row, i) => {
                                        return (
                                            <TableRow
                                                hover
                                                key={i}
                                            >
                                                {headCells.map((column) => {
                                                    const value = row[column.id];
                                                    const box = (row.status === 0 ?
                                                        <CheckBoxOutlineBlankOutlinedIcon/> :
                                                        <CheckBoxOutlinedIcon/>);
                                                    return (
                                                        <TableCell key={column.id}>
                                                            {column.id === 'status' ? box : value}
                                                        </TableCell>
                                                    );
                                                })}
                                                {user ?
                                                <TableCell>
                                                    <Button
                                                        onClick={() => handleOpenEdit(row.id)}
                                                    >
                                                        Редактировать
                                                    </Button>
                                                </TableCell> : null}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className={classes.lastRow}>
                        <span>Общее количество строк: {total}</span>
                        <div className={classes.arrows}>
                            <Button
                                component={NavLink}
                                to={page <=2 ? '/' : `/${page - 1}`}
                                disabled={page <= 1}
                            >
                                <ChevronLeftIcon/>
                            </Button>
                            <span>{page}</span>
                            <Button
                                component={NavLink}
                                to={`/${page + 1}`}
                                disabled={page >= Math.ceil(total / 3)}
                            >
                                <ChevronRightIcon/>
                            </Button>
                        </div>
                    </div>
                </Paper>
            }
            <Edit
                open={openEdit}
                close={handleCloseEdit}
                oneData={oneData}
                params={params}
                token={user && user.message.token}
            />
        </div>
    );
};

export default MainPage;