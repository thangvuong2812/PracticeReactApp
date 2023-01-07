import { Button, Col, Input, Row } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TodoList from './components/TodoList'

const data = [
    {
        id: 1,
        title: 'do something1'
    },
    {
        id: 2,
        title: 'do something2'
    },
    {
        id: 3,
        title: 'do something3'
    },
    {
        id: 4,
        title: 'do something4'
    },
    {
        id: 5,
        title: 'do something5'
    },
    {
        id: 6,
        title: 'do something6'
    },
]
function TodoFeature(props) {
    const [todoList, setTodoList] = useState([]);
    const [todo, setTodo] = useState('');
    const AddTodo = (todo) => {
        const lastEle = todoList.slice(-1)[0];
    
        const newTodo = {id: lastEle?.id + 1 || 0 ,title: todo};

        setTodoList([...todoList, newTodo]);
        setTodo('');
    }

    const onChangeInput = e => {
        
        const title = e.target.value;
        setTodo(title);
    }

    async function DeleteTodo (id) {
        const newTodoList = todoList.filter(o => o.id !== id);
        const deletedPosts = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(res => {
            console.log(res.status)
            if(res.status === 200)
            {
                setTodoList(newTodoList);
                return true;
            }
            return false;
        })
        .catch(err => {
            console.log(err);
            return false;
        })
        console.log(newTodoList);
        console.log(deletedPosts);
        return deletedPosts;
    }

    useEffect(() => {

        async function posts() {
            await axios.get("https://jsonplaceholder.typicode.com/posts").
            then(res => {
                setTodoList(res.data);
            })
        }
        posts();
        return () => {
            
        };
    }, []);
  return (
    <div>
        <h3>Todo List</h3>
        <Row gutter={16}>
            <Col span={24} order={1}>
                <TodoList deleteTodo={DeleteTodo} todoList={todoList}/>
            </Col>
            <Col span={6} order={2}>
                <Row>
                    <Col span={24}>
                        <Input.Group>
                            <Input value={todo} onChange={onChangeInput} style={{width: 'calc(100% - 200px)'}} placeholder="Type to add todo ..."/>
                            <Button onClick={() => AddTodo(todo)} type='primary'>Add</Button>
                        </Input.Group>
                    </Col>
                    
                </Row>
            </Col>
        </Row>
    </div>
  )
}


export default TodoFeature
