import jwt from "jsonwebtoken";
export default async function getUserData(req) {
  const cookies = req.headers.cookie;

  const token = cookies.trim().startsWith("login_token=")
    ? cookies
        .split(";")
        .find((cookie) => cookie.trim().startsWith("login_token="))
        .split("=")[1]
    : null;
  const secretKey = `${process.env.SECRET_KEY}`;

  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
}
