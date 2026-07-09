import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../database/db";

class AuthService {
  async login(email: string, password: string) {
    const user = await db("hr_users").where({ email }).first();

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return null;
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET || "default_secret",
      {
        expiresIn: "1d",
      }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}

export default new AuthService();
