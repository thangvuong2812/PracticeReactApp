import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, List, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';
const TodoList = ({todoList, deleteTodo}) => {
    const [loading, setLoading] = useState([]);
    const DeleteTodo = async id => {
        enterLoading(id)
        await deleteTodo(id);
        offLoading(id)
    }
    const enterLoading = (index) => {
        setLoading(prevs => {
            const newLoading = [...prevs];
            newLoading[index] = true;
            return newLoading;
        })
    };

    const offLoading = (index) => {
        setLoading(prevs => {
            const newLoading = [...prevs];
            newLoading[index] = false;
            return newLoading;
        })
    }
  return (
    // <ul>
    //     {todoList.map(todo => (
    //        <li key={todo.id}>{todo.title}</li> 
    //     ))}
    // </ul>

    <List
        grid={{gutter: 16, column: 4}}
        dataSource={todoList}
        renderItem={(todo) => (

            <List.Item>
                <Card size='small' extra={<Button key={todo.id} danger onClick={() => DeleteTodo(todo.id)} icon={<DeleteOutlined/> } type='primary' loading={loading[todo.id]}>Delete</Button>} title={todo.title} key={todo.id}>
                    {todo.body}
                </Card>
            </List.Item>
        )}
    />
  )
}

TodoList.propTypes = {
    todoList: PropTypes.array,
}

TodoList.defaultProps = {
    todoList: [],
}

export default TodoList