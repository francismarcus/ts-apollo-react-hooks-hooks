import React, { ReactElement } from 'react'
import { useTodosQuery } from './queries'
import { useDeleteTodoMutation } from './mutations'
import ChangeTitle from './ChangeTitle'
import { QueryResult } from '@apollo/react-common'

type Todo = {
    id: string
    title: string
    content: string
}

const Todos: React.FC = (): ReactElement => {
    const { loading, error, data }: QueryResult = useTodosQuery()
    const deleteTodo = useDeleteTodoMutation()

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.todos.map((todo: Todo) => (
        <div key={todo.id}>
            <h3> {todo.title} </h3>
            <p> {todo.content} </p>
            <ChangeTitle todo={todo} />
            <button onClick={() => deleteTodo(todo.id)}>
                Delete
            </button>

        </div>
    ))

}

export default Todos