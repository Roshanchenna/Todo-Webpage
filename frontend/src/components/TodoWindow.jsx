import './TodoWindow.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { BASE_URL } from '../config';

const TodoWindow = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [editTodo, setEditTodo] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/todos`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTodos(response.data.todos || []);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo((prevTodo) => ({ ...prevTodo, [name]: value }));
  };

  const handleAddTodo = async () => {
    if (!newTodo.title || !newTodo.description) {
      return;
    }

    try {
      await axios.post(`${BASE_URL}/user/todos`, newTodo, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchTodos();
      setNewTodo({ title: '', description: '' });
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleEditClick = (todo) => {
    setEditTodo(todo);
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
    setEditTodo(null);
  };

  const handleEditSave = async () => {
    try {
      await axios.patch(`${BASE_URL}/user/todos/${editTodo._id}`, editTodo, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchTodos();
      setOpenEditDialog(false);
      setEditTodo(null);
    } catch (error) {
      console.error('Error editing todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/user/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <Container style={{ marginTop: '50px' }}>
      <Paper className="todo-paper" elevation={3} style={{ padding: '20px', minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
        <TextField
          label="Todo Title"
          fullWidth
          margin="normal"
          name="title"
          value={newTodo.title}
          onChange={handleInputChange}
        />
        <TextField
          label="Todo Description"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          name="description"
          value={newTodo.description}
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTodo}
          style={{ marginTop: '10px' }}
          className="todo-add-button"
        >
          Add Todo
        </Button>

        <List className="todo-list"style={{ marginTop: '20px', flex: '1', overflowY: 'auto' }}>
          {todos.map((todo, index) => (
            <ListItem key={todo._id}>
              <ListItemText primary={`${index + 1}. ${todo.title}`} secondary={todo.description} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(todo)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTodo(todo._id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        {/* Edit Dialog */}
        <Dialog open={openEditDialog} onClose={handleEditClose}>
          <DialogTitle>Edit Todo</DialogTitle>
          <DialogContent>
            <TextField
              label="Todo Title"
              fullWidth
              margin="normal"
              name="title"
              value={editTodo?.title || ''}
              onChange={(e) => setEditTodo((prevTodo) => ({ ...prevTodo, title: e.target.value }))}
            />
            <TextField
              label="Todo Description"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              name="description"
              value={editTodo?.description || ''}
              onChange={(e) => setEditTodo((prevTodo) => ({ ...prevTodo, description: e.target.value }))}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default TodoWindow;
