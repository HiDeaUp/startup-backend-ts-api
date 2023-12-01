import { User } from "../models/user/user.type";

declare global {
  namespace Express {
    export interface Request {
      user?: User; // Add the custom property (adjust IUser according to your user model)
    }
  }
}
