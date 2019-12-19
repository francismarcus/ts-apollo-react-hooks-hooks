import { gql } from "apollo-boost";
import { useMutation, MutationOptions } from "@apollo/react-hooks";
import { getTodosQuery } from "./queries";
import { ExecutionResult } from '@apollo/react-common'
import { DataProxy } from 'apollo-cache'

type Todo = {
  id: string;
  title: string;
  content?: string
};


export const deleteTodoMutation = gql`
  mutation DeleteTodo($id: String!) {
    deleteTodo(id: $id)
  }
`;

export const useDeleteTodoMutation = () => {
  const [mutate] = useMutation<MutationOptions>(deleteTodoMutation);

  return (id: string): Promise<ExecutionResult> => {
    return mutate({
      variables: { id },
      update: (cache: DataProxy ) => {
        const state: any = cache.readQuery({
          query: getTodosQuery
        });

        cache.writeQuery({
          query: getTodosQuery,
          data: {
            todos: state.todos.filter((todo: Todo) => todo.id !== id)
          }
        });
      }
    });
  };
};

export const changeTodoTitleMutation = gql`
  mutation ChangeTodoTitle($input: ChangeTodoInput!) {
    changeTodoTitle(input: $input) {
      id
      title
    }
  }
`;

export const useChangeTodoTitleMutation = () => {
  const [mutate] = useMutation(changeTodoTitleMutation);

  return ({ id, title }: { id: string; title: string }): Promise<ExecutionResult> => {
    return mutate({
      variables: { input: { id, title } },
      optimisticResponse: {
        __typename: "Mutation",
        changeTodoTitle: {
          __typename: "Todo",
          id,
          title
        }
      }
    });
  };
};

export type ChangeTodoTitleMutationHook = ReturnType<typeof useChangeTodoTitleMutation>
export type DeleteTodoMutationHook = ReturnType<typeof useDeleteTodoMutation>