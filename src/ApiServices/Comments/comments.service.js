import api from "@/helpers/api";

export const CommentsService = {
  GetList() {
    let url = "comments";
    return api.get(url);
  },
  Get(id) {
    let url = `comments/${id}`;
    return api.get(url, id);
  },
  GetcommentsByPostId(id) {
    let url = `comments/post/${id}`;
    return api.get(url, id);
  },
  Add(items) {
    let url = "comments/add";
    return api.post(url, items);
  },
  Update(items, id) {
    let url = `comments/${id}`;
    return api.put(url, items);
  },
  Delete(id) {
    let url = `comments/${id}`;
    return api.delete(url);
  },
}; //
