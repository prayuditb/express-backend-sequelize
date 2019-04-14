import { Request, Response, NextFunction } from "express"
import jsonewbtoken from "jsonwebtoken"

export default (role?: string) => (req: Request, res: Response, next: NextFunction) => {
  const auth = req.header("Authorization");
  const response: ResponseObject = {
    status_code: 401,
    message: "Unauthenticated",
    dev_message: "Authorization header is required",
    data: [],
  };
  if (!auth) {
    res.json(response);
    return;
  }
  const token = auth.split(" ")[1];
  jsonewbtoken.verify(token, process.env.SECRET, (err: Error, decoded: any) => {
    if (err) {
      res.json(response);
      return;
    }
    if (req.body) {
      req.body.decodedToken = decoded;
    }
    next();
  });
}