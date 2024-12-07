import todoList from "../todo";

describe("Todo List Test Suite", () => {
  let todos;

  beforeEach(() => {
    todos = todoList();
  });

  test("should add a new todo", () => {
    const todo = {
      title: "Test todo",
      dueDate: "2023-12-06",
      completed: false,
    };
    todos.add(todo);
    expect(todos.all.length).toBe(1);
    expect(todos.all[0]).toEqual(todo);
  });

  test("should mark a todo as completed", () => {
    const todo = {
      title: "Test todo",
      dueDate: "2023-12-06",
      completed: false,
    };
    todos.add(todo);
    todos.markAsComplete(0);
    expect(todos.all[0].completed).toBe(true);
  });

  test("should retrieve overdue items", () => {
    const overdueTodo = {
      title: "Overdue todo",
      dueDate: "2023-12-05",
      completed: false,
    };
    todos.add(overdueTodo);
    const overdueItems = todos.overdue();
    expect(overdueItems.length).toBe(1);
    expect(overdueItems[0]).toEqual(overdueTodo);
  });

  test("should retrieve items due today", () => {
    const todayTodo = {
      title: "Today todo",
      dueDate: "2023-12-06",
      completed: false,
    };
    todos.add(todayTodo);
    const todayItems = todos.dueToday();
    expect(todayItems.length).toBe(1);
    expect(todayItems[0]).toEqual(todayTodo);
  });

  test("should retrieve items due later", () => {
    const laterTodo = {
      title: "Later todo",
      dueDate: "2023-12-07",
      completed: false,
    };
    todos.add(laterTodo);
    const laterItems = todos.dueLater();
    expect(laterItems.length).toBe(1);
    expect(laterItems[0]).toEqual(laterTodo);
  });

  test("should format todo list items correctly", () => {
    const todosArray = [
      { title: "Overdue task", dueDate: "2023-12-05", completed: false },
      { title: "Today task", dueDate: "2023-12-06", completed: true },
    ];

    const formattedList = todos.toDisplayableList(todosArray);
    expect(formattedList).toBe("[ ] Overdue task 2023-12-05\n[x] Today task");
  });
});
