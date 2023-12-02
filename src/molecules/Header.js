import { Box, Button, Divider, IconButton, TextField } from '@mui/material'
import React, { useRef, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
const Header = (props) => {
    const { handleSearch, deleteAll } = props;
    const Ref = useRef();
    const [input, setInput] = useState('');
    const searchClickHandler = () => {
        handleSearch(input, true);
    }

    const bulkDelete = () => {
        deleteAll()
    }
    return (
        <Box width={'100%'}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, px: 4 }}>
                <Box sx={{ display: 'flex', columnGap: 1 }}>
                    <TextField
                        value={input}
                        onChange={(e) => {
                            if (e.target.value.length === 0) {
                                handleSearch('', false);
                            }
                            setInput(e.target.value)
                        }}
                        label="Search"
                        placeholder='Search'
                        variant="outlined"
                        size='small'

                    />
                    <Button size='small' variant='contained' className='search-icon' onClick={searchClickHandler}>
                        Search
                    </Button>
                </Box>
                <IconButton onClick={bulkDelete}>
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

export default Header