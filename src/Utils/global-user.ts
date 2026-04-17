import type { UserType } from "../APi/User/user-type.js";

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}
