import jwt from "jsonwebtoken";

export default async function getUserData(req) {
  let cookies = req.headers.cookie;

  const loginTokenCookie = cookies
      ? cookies
          .split(";")
          .find((cookie) => cookie.trim().startsWith("login_token="))
      : null;

  if (loginTokenCookie) {
    const token = loginTokenCookie.split("=")[1];
    const secretKey = `${process.env.SECRET_KEY}`;

    try {
      return jwt.verify(token, secretKey);
    } catch (error) {
      return null;
    }
  } else {
    return null;
  }
}
