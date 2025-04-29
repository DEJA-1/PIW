import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/Home.jsx"),
  route("new", "routes/NewBook.jsx"),
  route("edit/:id", "routes/EditBook.jsx")
];
