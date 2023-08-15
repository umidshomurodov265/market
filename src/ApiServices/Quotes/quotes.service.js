import api from "@/helpers/api";

export const QuotesService = {
  GetList() {
    let url = "quotes";
    return api.get(url);
  },
  Get(id) {
    let url = `quotes/${id}`;
    return api.get(url, id);
  },
  GetRandomQuote() {
    let url = `quotes/random`;
    return api.get(url);
  },
  LimitAndSkipQuotes(filter) {
    let url = `quotes?limit=${filter.limit}&skip=${filter.skip}`;
    return api.get(url);
  },
}; //
