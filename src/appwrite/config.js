import conf from "../Conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    if (!conf.appwriteUrl || !conf.appwriteProjectId) {
      throw new Error("Appwrite configuration is missing.");
    }

    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // ✅ Create a new post
  async createPost({ title, slug, content, status, featuredimage, userid }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredimage,
          status,
          userid,
        }
      );
    } catch (error) {
      console.log("Service :: createPost :: Error", error);
      throw new Error("Failed to create post.");
    }
  }

  // ✅ Update an existing post
  async updatePost(slug, { title, content, featuredimage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredimage,
          status,
        }
      );
    } catch (error) {
      console.error("Service :: updatePost :: Error", error);
      throw new Error("Failed to update post.");
    }
  }

  // ✅ Delete a post
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.error("Service :: deletePost :: Error", error);
      return false;
    }
  }

  // ✅ Get a specific post by slug
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.error("Service :: getPost :: Error", error);
      return null;
    }
  }

  // ✅ Get all posts (defaults to active)
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("Service :: getPosts :: Error", error);
      return [];
    }
  }

  // Storage Service
  // ✅ Upload a file
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Service :: uploadFile :: Error", error);
      return null;
    }
  }

  // ✅ Delete a file
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Service :: deleteFile :: Error", error);
      return false;
    }
  }

  // ✅ Get a file preview URL
  getFileView(fileId) {
    return this.bucket.getFileView(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
