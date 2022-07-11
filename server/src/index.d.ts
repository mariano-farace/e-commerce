// Declaration Merging to add user to req object
import IUser from "../models/User";

declare global {
  namespace Express {
    interface Request {
      currentUser: IUser;
    }
  }
}
