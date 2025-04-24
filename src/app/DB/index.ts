import { Sequelize } from "sequelize";
import config from "../config";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: config.database.host,
  port: config.database.port,
  username: config.database.user,
  password: config.database.password,
  database: config.database.name,
  logging: false,
});

export { sequelize };

// Seed super admin
import { User } from "../modules/auth/auth.model";
import { UserRole } from "../modules/auth/auth.types";

const superUser = {
  name: "Super Admin",
  email: "mdekramulhassan168@gmail.com",
  password: config.super_admin_password,
  role: UserRole.SUPER_ADMIN,
  isActive: true,
};

const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExists = await User.findOne({
      where: { role: UserRole.SUPER_ADMIN },
    });

    if (!isSuperAdminExists) {
      await User.create(superUser);
      console.log("Super admin created successfully");
    }
  } catch (error) {
    console.error("Error seeding super admin:", error);
  }
};

export default seedSuperAdmin;
