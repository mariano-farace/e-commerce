import { verify } from "jsonwebtoken";

// TODO usar authorization header!
// TODO escribir esto en una carpeta middleware
const verifyToken = (req, res, next) => {
  // TODO escribir usando async await
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      } else {
        // attach user to request
        req.user = user;
        next();
      }
    });
    next();
  } else {
    return res.status(401).json({ message: "Forbidden" });
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    // This function is passed as the "next" argument to verifyToken
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    // This function is passed as the "next" argument to verifyToken
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  });
};

export default {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
