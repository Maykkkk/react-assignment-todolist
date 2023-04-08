import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, DatePicker, Select } from 'antd';
import './App.css';

const { TextArea } = Input;
const { Option } = Select;

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm] = Form.useForm();
  //const [editModalVisible, setEditModalVisible] = useState(false);

  const onFinish = (values) => {
    const newTask = {
      ...values,
      status: "OPEN"
    };
    setTodoList([...todoList, newTask]);
  };

  const onDelete = (index) => {
    const newList = [...todoList];
    newList.splice(index, 1);
    setTodoList(newList);
  };

  const onTaskComplete = (index) => {
    const newList = [...todoList];
    newList[index].completed = !newList[index].completed;
    setTodoList(newList);
  };

  const onStatusChange = (index, value) => {
    const newList = [...todoList];
    newList[index].status = value;
    setTodoList(newList);
  };

//   const onEdit = (index) => {
//     setEditingIndex(index);
//     editForm.setFieldsValue(todoList[index]);
//     setEditModalVisible(true);
//   };

//   const onSaveEdit = () => {
//     editForm.validateFields().then((values) => {
//       const newList = [...todoList];
//       newList[editingIndex] = values;
//       setTodoList(newList);
//       setEditingIndex(null);
//       editForm.resetFields();
//       setEditModalVisible(false);
//     });
//   };

//   const onCancelEdit = () => {
//     setEditingIndex(null);
//     editForm.resetFields();
//     setEditModalVisible(false);
//   };

  const renderTasks = () => {
    return todoList.map((todo, index) => {
      return (
        <div key={index} className="task-item">
          <Checkbox
            className={todo.completed ? 'task-completed' : ''}
            checked={todo.completed}
            onChange={() => onTaskComplete(index)}
          >
            {todo.title}
          </Checkbox>
          <Select
            defaultValue={todo.status}
            className="status-select"
            onChange={(value) => onStatusChange(index, value)}
          >
            <Option value="OPEN">OPEN</Option>
            <Option value="WORKING">WORKING</Option>
            <Option value="DONE">DONE</Option>
            <Option value="OVERDUE">OVERDUE</Option>
          </Select>
          <Button className="edit-btn" type="primary" onClick={() => onEdit(index)}>Edit</Button>
          <Button className="delete-btn" type="primary" danger onClick={() => onDelete(index)}>Delete</Button>
          <div className="task-details">
            <p><strong>Description:</strong> {todo.description}</p>
            <p><strong>Due Date:</strong> {todo.dueDate?.format('MM/DD/YYYY')}</p>
            <p><strong>Tags:</strong> {todo.tags}</p>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="container">
      <h1 className="title">Todo List</h1>
      <Form name="basic" onFinish={onFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please input a title for your task!',
            },
            {
              max: 100,
              message: 'Title must not exceed 100 characters',
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please input a description for your task!',
            },
            {
              max: 1000,
              message: 'Description must not exceed 1000 characters',
            }
          ]}
        >
          <TextArea rows={3} />
        </Form.Item>

        <Form.Item
          label="Due Date"
          name="dueDate"
          rules={[
            {
              required: true,
              message: 'Please select a due date for your task!',
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="Tags"
          name="tags"
          rules={[
            {
              max: 100,
              message: 'Tags must not exceed 100 characters',
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="add-task-btn">
            Add Task
          </Button>
        </Form.Item>
      </Form>

      <div className="task-list">{renderTasks()}</div>
    </div>
  );
};

export default App;
