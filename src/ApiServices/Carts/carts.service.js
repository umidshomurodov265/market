import api from "@/helpers/api";

export const CartsService = {
  GetList() {
    let url = "carts";
    return api.get(url);
  },
  Get(id) {
    let url = `carts/${id}`;
    return api.get(url, id);
  },
  GetCartsOfUser(id) {
    let url = `carts/user/${id}`;
    return api.get(url, id);
  },
  Add(items) {
    let url = "carts/add";
    return api.post(url, items);
  },
  Update(items, id) {
    let url = `carts/${id}`;
    return api.put(url, items);
  },
  Delete(id) {
    let url = `carts/${id}`;
    return api.delete(url);
  },
}; //
