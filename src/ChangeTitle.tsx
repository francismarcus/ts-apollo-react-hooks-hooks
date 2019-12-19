import React, { useState } from 'react';
import { useChangeTodoTitleMutation } from './mutations';

type Todo = {
    id: string
    title: string
};

const ChangeTitle = ({ todo }: { todo: Todo }) => {
    let changeTitle = useChangeTodoTitleMutation();
    let [title, setTitle] = useState(todo.title);

    return (
        <div>
            <input value={title} onChange={e => setTitle(e.target.value)} />
            <button onClick={(): Promise<any> => changeTitle({ id: todo.id, title })}>
                Change title
      </button>
        </div>
    );
};

export default ChangeTitle;