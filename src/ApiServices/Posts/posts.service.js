import api from "@/helpers/api";

export const PostsService = {
  GetList() {
    let url = "posts";
    return api.get(url);
  },
  Get(id) {
    let url = `posts/${id}`;
    return api.get(url, id);
  },
  GetAllPostsByUserId(id) {
    let url = `posts//user/${id}`;
    return api.get(url);
  },
  GetPostComments(id) {
    let url = `posts/${id}/comments`;
    return api.get(url, id);
  },

  Add(items) {
    let url = "posts/add";
    return api.post(url, items);
  },
  Update(items, id) {
    let url = `posts/${id}`;
    return api.put(url, items);
  },
  Delete(id) {
    let url = `posts/${id}`;
    return api.delete(url);
  },

  LimitAndSkipposts(filter) {
    let url = `posts?limit=${filter.limit}&skip=${filter.skip}`;
    return api.get(url);
  },
  SearchPosts(phone) {
    let url = `posts/search?q=${phone}`;
    return api.get(url);
  },
  Filterposts() {
    let url = `posts/filter?key=hair.color&value=Brown`;
    return api.get(url);
  },
};
//
