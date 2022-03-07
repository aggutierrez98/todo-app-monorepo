import { TodoList } from "@c/TodoList";
import { BottonAddTodo } from "@c/BottonAddTodo";
import { UserInfoCard } from "@c/UserInfoCard";

function TodoApp() {

  return (
    <div
      id="app"
      className="flex mt-4 w-full sm:w-500 md:w-700 2xl:w-1200 p-1 cellphone:p-5 flex-col ">
      <UserInfoCard />
      <BottonAddTodo />
      <TodoList />
    </div>
  );
}

export default TodoApp;
