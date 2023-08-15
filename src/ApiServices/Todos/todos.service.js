import api from "@/helpers/api";

export const TodosService = {
  GetList() {
    let url = "todos";
    return api.get(url);
  },
  Get(id) {
    let url = `todos/${id}`;
    return api.get(url, id);
  },
  GetRandomTodo() {
    let url = `todos/random`;
    return api.get(url);
  },
  LimitAndSkipTodos(filter) {
    let url = `todos?limit=${filter.limit}&skip=${filter.skip}`;
    return api.get(url);
  },
  GetAllTodosByUserId(id) {
    let url = `todos/user/${id}`;
    return api.get(url, id);
  },
  Add(items) {
    let url = "todos/add";
    return api.post(url, items);
  },
  Update(items, id) {
    let url = `todos/${id}`;
    return api.put(url, items);
  },
  Delete(id) {
    let url = `todos/${id}`;
    return api.delete(url);
  },
}; //
