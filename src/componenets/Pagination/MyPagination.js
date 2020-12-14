import React from 'react';
import TablePagination from "@material-ui/core/TablePagination";

const MyPagination = props => {
    return (
        <>
            <TablePagination
                rowsPerPageOptions={[3, 5, 10]}
                component="div"
                count={props.rows.length}
                rowsPerPage={props.rowsPerPage}
                page={props.page}
                onChangePage={props.handleChangePage}
                onChangeRowsPerPage={props.handleChangeRowsPerPage}
                labelRowsPerPage={'Элементов на странице:'}
                nextIconButtonText={'Следующая страница'}
                backIconButtonText={'Предыдущая страница'}
            />
        </>
    );
};

export default MyPagination;