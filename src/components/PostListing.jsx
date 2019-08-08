import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import { AutoSizer, Column, SortDirection, Table } from "react-virtualized";
import {callAPi} from '../utils/callApi'
import InfoDialog from '../common/InfoDialog';

const styles = theme => ({
    table: {
        fontFamily: theme.typography.fontFamily
    },
    flexContainer: {
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box"
    },
    tableRow: {
        cursor: "pointer"
    },
    tableRowHover: {
        "&:hover": {
            backgroundColor: theme.palette.grey[200]
        }
    },
    tableCell: {
        flex: 1
    },
    noClick: {
        cursor: "initial",
        fontWeight: 900,
        fontSize: "inherit"
    }
});

const MyTable = (props) => {
    const getRowClassName = ({ index }) => {
        const { classes, rowClassName, onRowClick } = props;

        return classNames(classes.tableRow, classes.flexContainer, rowClassName, {
            [classes.tableRowHover]: index !== -1 && onRowClick != null
        });
    };

    const cellRenderer = ({ cellData, columnIndex = null }) => {
        const { columns, classes, rowHeight, onRowClick } = props;
        return (
            <TableCell
                component="div"
                className={classNames(classes.tableCell, classes.flexContainer, {
                    [classes.noClick]: onRowClick == null
                })}
                variant="body"
                style={{ height: rowHeight }}
                align={
                    (columnIndex != null && columns[columnIndex].numeric) || false
                        ? "right"
                        : "left"
                }
            >
                {cellData}
            </TableCell>
        );
    };

    const headerRenderer = ({ label, columnIndex, dataKey, sortBy, sortDirection }) => {
        const { headerHeight, columns, classes, sort } = props;
        const direction = {
            [SortDirection.ASC]: "asc",
            [SortDirection.DESC]: "desc"
        };

        const inner =
            !columns[columnIndex].disableSort && sort != null ? (
                <TableSortLabel
                    active={dataKey === sortBy}
                    direction={direction[sortDirection]}
                >
                    {label}
                </TableSortLabel>
            ) : (
                label
            );

        return (
            <TableCell
                component="div"
                className={classNames(
                    classes.tableCell,
                    classes.flexContainer,
                    classes.noClick
                )}
                variant="head"
                style={{ height: headerHeight }}
                align={columns[columnIndex].numeric || false ? "right" : "left"}
            >
                {inner}
            </TableCell>
        );
    };

        const { classes, columns, ...tableProps } = props;
        return (
            <AutoSizer>
                {({ height, width }) => (
                    <Table
                        className={classes.table}
                        height={height}
                        width={width}
                        {...tableProps}
                        rowClassName={getRowClassName}
                    >
                        {columns.map(
                            (
                                { cellContentRenderer = null, className, dataKey, ...other },
                                index
                            ) => {
                                let renderer;
                                if (cellContentRenderer != null) {
                                    renderer = cellRendererProps =>
                                        cellRenderer({
                                            cellData: cellContentRenderer(cellRendererProps),
                                            columnIndex: index
                                        });
                                } else {
                                    renderer = cellRenderer;
                                }

                                return (
                                    <Column
                                        key={dataKey}
                                        headerRenderer={headerProps =>
                                            headerRenderer({
                                                ...headerProps,
                                                columnIndex: index
                                            })
                                        }
                                        className={classNames(classes.flexContainer, className)}
                                        cellRenderer={renderer}
                                        dataKey={dataKey}
                                        {...other}
                                    />
                                );
                            }
                        )}
                    </Table>
                )}
            </AutoSizer>
        );
}

MyTable.propTypes = {
    classes: PropTypes.object.isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            cellContentRenderer: PropTypes.func,
            dataKey: PropTypes.string.isRequired,
            width: PropTypes.number.isRequired
        })
    ).isRequired,
    headerHeight: PropTypes.number,
    onRowClick: PropTypes.func,
    rowClassName: PropTypes.string,
    rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    sort: PropTypes.func
};

MyTable.defaultProps = {
    headerHeight: 70,
    rowHeight: 56
};

const CreateTable = withStyles(styles)(MyTable);

const PostListing = ({ history:{push}}) =>  {
    const [postList, setPostList] = useState([]);
    const [open,setDialog] = useState(false);
    const params = {
        url: '/listing',
        method: "get",
    }

    useEffect(()=>{
            callAPi(params).then((result)=>{
                if(result.status=== 200){
                    let {data} = result;
                    data = data.map(o=>({...o,createdAt:new Date(o.createdAt).toGMTString()}));
                    setPostList(data);
                    setDialog(true);
                    setTimeout(()=> {
                        setDialog(false);
                    },2500);
                }
            })
    },[]);

    const updatePost = (e)=> {
        push(`/post/update/${e.rowData['_id']}`);
    }

    return (
            <Paper style={{ height: 600, width: "100%" }}>
                <CreateTable
                    rowCount={postList.length}
                    rowGetter={({ index }) => postList[index]}
                    onRowClick={updatePost}
                    columns={[
                        {
                            width: 30,
                            flexGrow: 0.25,
                            label: "Id",
                            dataKey: "_id"
                        },
                        {
                            width: 30,
                            flexGrow: 0.25,
                            label: "Post",
                            dataKey: "text"
                        },
                        {
                            width: 30,
                            flexGrow: 0.25,
                            label: "Like",
                            dataKey: "like",
                            numeric: true
                        },
                        {
                            width: 30,
                            flexGrow: 0.25,
                            label: "Created At",
                            dataKey: "createdAt",
                            numeric: true
                        }
                    ]}
                />
                <InfoDialog
                    open={open}
                    handleClose={(e)=>setDialog(false)}
                    title={"Message"}
                    text={"Click on the row to edit it"}
                />
            </Paper>
        );
}

export default PostListing;



