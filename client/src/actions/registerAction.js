import { redirect } from "react-router-dom";
import axios from "axios";
export default async function registerAction({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const name = formData.get("name");
  const password = formData.get("password");
  const user = { email, name, password };
  try {
    await axios.post("http://localhost:3001/users/register", user);
    return redirect("/login");
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
}
