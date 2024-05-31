const express = require('express');
const router = express.Router()

let data = []


const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

router.post('/create', (req, res) => {
  const { title, description, active } = req.body

  if (!title || active === undefined) {
    return res.status(400).json({ error: 'Title, description, and active status are required' });
  }

  let newTask = {
    id: uid(),
    title: title,
    description: description,
    active: active
  }

  data.push(newTask)
  res.status(201).json({ message: 'Task created successfully', task: newTask });
})

router.get('/tasks', (req, res) => {
  res.status(200).json(data)
})

router.put('/edit/:id', (req, res) => {
  const { id } = req.params
  const { title, description, active } = req.body

  const taskIndex = data.findIndex((e) => e.id == id)


  if (taskIndex === -1) {
    return res.status(400).json({ error: "Invalid task id" })
  }
  if (title !== undefined) data[taskIndex].title = title;
  if (description !== undefined) data[taskIndex].description = description;
  if (active !== undefined) data[taskIndex].active = active;
  res.status(200).json({ message: "task updated sucesfully!" })

})

router.delete('/delete/:id', (req, res) => {
  const { id } = req.params
  console.log(id)
  const taskIndex = data.findIndex((e) => e.id == id)

  if (taskIndex === -1) {
    return res.status(400).json({ error: "Invalid task id" })
  }

  data.splice(taskIndex, 1)

  res.status(200).json({ message: "Task deleted sucesfully" })

})

router.delete('/clear', (req, res) => {
  console.log("clearing")
  data.splice(0, data.length)
  res.status(200).json({ message: "all tasks deleted" })
})

module.exports = router
