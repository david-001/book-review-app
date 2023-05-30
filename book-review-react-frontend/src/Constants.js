import axios from "axios";
const SPRINGBOOT_SERVER_URL = "http://localhost:8080/";
const OPEN_LIBRARY_API_URL = "http://openlibrary.org";
const OPEN_LIBRARY_BOOK_URL = "http://openlibrary.org/search.json?q=";
const OPEN_LIBRARY_COVER_URL = "http://covers.openlibrary.org/b/isbn/";
const OPEN_LIBRARY_AUTHOR_URL =
  "https://openlibrary.org/search/authors.json?q=";

// axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
//   "token"
// )}`;

export default SPRINGBOOT_SERVER_URL;
export {
  axios,
  OPEN_LIBRARY_API_URL,
  OPEN_LIBRARY_BOOK_URL,
  OPEN_LIBRARY_COVER_URL,
  OPEN_LIBRARY_AUTHOR_URL,
  SPRINGBOOT_SERVER_URL,
};
