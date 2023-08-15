import api from "@/helpers/api";

export const UsersService = {
  GetList() {
    let url = "users";
    return api.get(url);
  },
  Get(id) {
    let url = `users/${id}`;
    return api.get(url, id);
  },
  GetUserCartsByUserId(id) {
    let url = `users/${id}/carts`;
    return api.get(url, id);
  },
  GetUserPostsByUserId(id) {
    let url = `users/${id}/posts`;
    return api.get(url, id);
  },
  GetUserPostsByUserId(id) {
    let url = `users/${id}/todos`;
    return api.get(url, id);
  },

  Add(items) {
    let url = "users/add";
    return api.post(url, items);
  },
  Update(items, id) {
    let url = `users/${id}`;
    return api.put(url, items);
  },
  Delete(id) {
    let url = `users/${id}`;
    return api.delete(url);
  },

  LimitAndSkipUsers(filter) {
    let url = `users?limit=${filter.limit}&skip=${filter.skip}`;
    return api.get(url);
  },
  SearchUsers(search) {
    let url = `users/search?q=${search}`;
    return api.get(url);
  },
  FilterUsers(filter) {
    let url = `users/filter?color=${filter.hair.color}&firstName=${filter.firstName}&lastName=${filter.lastName}`;
    return api.get(url);
  },
};
//
