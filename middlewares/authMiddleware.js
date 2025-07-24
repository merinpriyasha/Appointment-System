import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).send({
        message: "No token provided",
        success: false,
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Auth Failed",
          success: false,
        });
      }

      req.body.userId = decoded.id;
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(401).send({
      message: "Auth Failed",
      success: false,
    });
  }
};

export default authMiddleware;
