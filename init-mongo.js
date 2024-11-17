db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE || "realtime-posts");

db.createUser({
  user: process.env.MONGO_USERNAME || "realtime-posts",
  pwd: process.env.MONGO_PASSWORD || "relatime-posts",
  roles: [
    {
      role: "readWrite",
      db: process.env.MONGO_INITDB_DATABASE || "realtime-posts"
    }
  ]
});
