import Head from 'next/head'
import styles from "./../styles/Home.module.css";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import StreamIcon from '@mui/icons-material/Stream';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Button from '@mui/material/Button';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import store from '../store/store';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoveToComponent from '../components/movetocomponent';

export default function Home() {
  const storetasks = store((state: any) => state.tasks)
  const addTaskToStore = (taskarray: any) => {
    return;
  }

  const [currentTaskTitle, setCurrentTaskTitle] = useState<string>("");
  const [currentTaskDescription, setCurrentTaskDescription] = useState<string>("");

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAddTaskClick = () => {
    let currentTaskList = storetasks
    let createTaskObject = {
      task_id: Date.now(),
      task_title: currentTaskTitle,
      task_description: currentTaskDescription
    }
    currentTaskList.push(createTaskObject)
    addTaskToStore(currentTaskList)
    setOpen(false);
  }
  useEffect(() => {
    console.log("taskslist", storetasks)
  }, [])

  const handleTitleChange = (e: any) => {
    setCurrentTaskTitle(e.target.value)
  }

  const handleDescriptionChange = (e: any) => {
    setCurrentTaskDescription(e.target.value)
  }

  return (
    <>
      <Head>
        <title>Todo App with Zustand</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className={styles.main}>
          <p className={styles.apptitle}>Todo app with <a href='https://zustand-demo.pmnd.rs/'>Zustand</a> ????</p>
        </div>
        <div className={styles.typespanel}>

          <div className={styles.typepanelinternal}>
            <Stack direction="row" spacing={1}>
              <Chip icon={<PendingActionsIcon />} label="Pending" variant="outlined" style={{ cursor: "pointer" }} />
              <Chip icon={<StreamIcon />} label="Ongoing" variant="outlined" style={{ cursor: "pointer" }} />
              <Chip icon={<DoneAllIcon />} label="Completed" variant="outlined" style={{ cursor: "pointer" }} />
              <Button variant="contained" startIcon={<AddTaskIcon />} onClick={handleClickOpen} style={{marginLeft:"auto"}}>
                Add task
              </Button>
            </Stack>
          </div>




          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add a Task</DialogTitle>
            <DialogContent style={{ width: "500px" }}>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Task title"
                type="text"
                fullWidth
                onChange={(e) => handleTitleChange(e)}
                variant="standard"
              />
              <TextField
                autoFocus
                margin="dense"
                id="description"
                label="Task description"
                type="text"
                multiline
                onChange={(e) => handleDescriptionChange(e)}
                maxRows={10}
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleAddTaskClick} variant="contained">Add task</Button>
            </DialogActions>
          </Dialog>











          <div className={styles.tasklist}>
            {
              storetasks.length == 0 && <h3 style={{ textAlign: "center", marginTop: "50%" }}>There are no tasks ????</h3>
            }
            <TaskCards tasks={storetasks} />
          </div>
        </div>
      </div>
    </>
  )
}


function TaskCards(props: any) {
  return (
    <>
      {
        props.tasks && props.tasks.length != 0 && props.tasks.map((item: any) => {
          return (
            <div>
              <h1>{item.task_title}</h1>
              <p>{item.task_description}</p>
              <div style={{ display: "flex" }}>
                <div>
                  <MoveToComponent/>
                </div>
                <div style={{ marginLeft: "auto", display: "flex" }}>
                  <Stack direction="row" spacing={2}>
                    <Button variant="text" startIcon={<EditIcon />}>
                      Edit
                    </Button>
                    <Button variant="text" startIcon={<DeleteIcon />} color="error">
                      Remove
                    </Button>
                  </Stack>
                </div>
              </div>
              <hr />
            </div>
          )
        })
      }
    </>
  )
}