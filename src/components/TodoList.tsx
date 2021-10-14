import { FC, useEffect } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

const TodoList: FC = () => {
  const { fetchTodos, setTodoPage } = useActions();
  const { todos, loading, error, page, limit } = useTypedSelector(
    state => state.todoReducer
  );
  const pages = [1, 2, 3, 4, 5];

  useEffect(() => {
    fetchTodos(page, limit);
  }, [page]);

  if (loading) {
    return <h1>Идёт загрузка...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          {todo.id} - {todo.title}
        </div>
      ))}
      <div style={{ display: 'flex', marginTop: 10 }}>
        {pages.map(p => (
          <div
            onClick={e => setTodoPage(p)}
            style={{
              border: '1px solid teal',
              backgroundColor: p === page ? 'teal' : '',
              fontWeight: p === page ? 700 : 400,
              padding: 10,
              cursor: 'pointer',
            }}
          >
            {p}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
