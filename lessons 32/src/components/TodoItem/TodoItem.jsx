import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box } from '@mui/material';

const TodoItem = ({ _id, text, checked, onDelete, onToggle, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false); 
  const [newText, setNewText] = useState(text); 

  const handleSave = () => {
    if (newText.trim()) {
      onEdit(_id, newText); 
      setIsEditing(false); 
    }
  };

  const handleCancel = () => {
    setNewText(text); 
    setIsEditing(false); 
  };

  return (
    <ListItem
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: checked ? '#e8f5e9' : '#fff',
        marginBottom: '8px',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        padding: '10px',
        '&:hover': {
          backgroundColor: '#f1f1f1',
        },
      }}
    >
      <Checkbox
        edge="start"
        checked={checked}
        onChange={(e) => onToggle(_id, e.target.checked)}
        color="primary"
      />

      {isEditing ? (
        <Box sx={{ flexGrow: 1, marginLeft: '10px' }}>
          <TextField
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
          />
        </Box>
      ) : (
        <span
          style={{
            flexGrow: 1,
            marginLeft: '10px',
            textDecoration: checked ? 'line-through' : 'none',
            color: checked ? '#757575' : '#000',
          }}
        >
          {text}
        </span>
      )}

      {isEditing ? (
        <>
          <IconButton aria-label="save" color="primary" onClick={handleSave}>
            <SaveIcon />
          </IconButton>
          <IconButton aria-label="cancel" color="error" onClick={handleCancel}>
            <CancelIcon />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton
            aria-label="edit"
            color="primary"
            onClick={() => setIsEditing(true)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => onDelete(_id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      )}
    </ListItem>
  );
};

export default TodoItem;
