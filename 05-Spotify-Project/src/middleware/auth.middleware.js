import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

async function artistMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role == "user") {
      return res.status(403).json({
        success: false,
        message:
          "Forbidden Only registered artist are permitted to create or upload music",
      });
    }
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Error:- ", err);
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
}

async function userMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if ("user" !== decoded.role && "artist" !== decoded.role) {
      return res.status(403).json({
        success: true,
        message: "You don't have acess",
      });
    }
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Error - ", err);
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
}

export { artistMiddleware, userMiddleware };
