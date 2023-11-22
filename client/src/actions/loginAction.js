import axios from "axios";
import { redirect } from "react-router-dom";
export default async function loginAction({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const user = { email, password };
  try {
    const res = await axios.post("http://localhost:3001/users/login", user);
    console.log(res);
    const { name, token } = res.data;
    localStorage.setItem("userInfo", JSON.stringify({ email, name, token }));
    axios.defaults.headers.common["Authorization"] = token;
    // delete axios.defaults.headers.common['Authorization'];
    return redirect("/");
  } catch (err) {
    return err.response.data.message;
  }
}
