import conf from "../Conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    try {
      // Validate configuration
      if (!conf.appwriteUrl || !conf.appwriteProjectId) {
        throw new Error("Missing Appwrite configuration: URL or Project ID");
      }

      this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

      this.account = new Account(this.client);
    } catch (error) {
      // console.error("AuthService :: constructor error:", error);
      throw error; // Let caller handle if needed
    }
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      console.log("Account created successfully:", userAccount);
      return await this.login({ email, password });
    } catch (error) {
      console.error("AuthService :: createAccount error:", error);
      throw new Error("Failed to create account. Please try again.");
    }
  }

  async login({ email, password }) {
    try {
      const userLogin = await this.account.createEmailPasswordSession(
        email,
        password
      );
      console.log("Login successful:", userLogin);
      return userLogin;
    } catch (error) {
      console.error("AuthService :: login error:", error);
      throw new Error("Login failed. Please check your credentials.");
    }
  }

  async getCurrentUser() {
    try {
      const currentUser = await this.account.get();
      console.log("Fetched current user:", currentUser.name);
      return currentUser;
    } catch (error) {
      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      console.log("Logout successful.");
    } catch (error) {
      console.error("AuthService :: logout error:", error);
    }
  }

  async isLoggedIn() {
    try {
      const user = await this.getCurrentUser();
      return !!user;
    } catch (error) {
      console.error("AuthService :: isLoggedIn error:", error);
      return false;
    }
  }
}

const authService = new AuthService();
export default authService;
