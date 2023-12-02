import { Box, Button, IconButton } from '@mui/material'
import React, { useRef, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid'

const Body = (props) => {
    const { data: rows, deleteHandler: handleDelete, deleteSelectHandler } = props;
    const apiRef = useRef('');
    const deleteHandler = (params, e) => {
        e.stopPropagation();
        handleDelete(params);
    }
    const [currentPage, setCurrentPage] = useState(0);
    const [selectionModel, setSelectionModel] = useState([]);
    const columns = [
        { field: 'name', headerName: 'Name', width: 200, editable: true },
        { field: 'email', headerName: 'Email', width: 250, editable: true },
        { field: 'role', headerName: 'Role', width: 130, editable: true },
        {
            field: 'action', headerName: 'Action', width: 130, renderCell: (params) => {
                return (
                    <Box sx={{ display: 'flex', columnGap: 1 }}>
                        <IconButton className='edit' size='small' onClick={(e) => { e.stopPropagation() }}>
                            <EditIcon fontSize='small' />
                        </IconButton>
                        <IconButton className='delete' size='small' onClick={(e) => { deleteHandler(params, e) }}>
                            <DeleteIcon fontSize='small' />
                        </IconButton>
                    </Box>
                )
            }
        }
    ];
    const handleRow = (e) => {
        setSelectionModel(e.slice(10 * currentPage, 10 * currentPage + 10));
    }
    const handleSelectionModelChange = (newSelection) => {
        console.log(newSelection)
        setSelectionModel(prev => prev.slice(10));
    };
    const handleGridRowsUpdated = () => {
        setSelectionModel(prev => prev.slice(10))
    };
    const pageChange = (e) => {
        setCurrentPage(e.page)
    }
    const deleteSelected = () => {
        deleteSelectHandler(selectionModel)
        setSelectionModel([]);
    }
    return (
        <Box sx={{ px: 3 }}>
            <DataGrid
                apiRef={apiRef}
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                rowSelectionModel={selectionModel}
                onRowSelectionModelChange={handleRow}
                onSelectionModelChange={handleSelectionModelChange}
                onRowsRendered={handleGridRowsUpdated}
                onPaginationModelChange={pageChange}
            />
            <Button onClick={deleteSelected} variant='contained' className='delete' sx={{ display: 'block', position: 'absolute', bottom: 8, left: '30%' }}>Delete selected</Button>
        </Box>
    )
}

export default Body