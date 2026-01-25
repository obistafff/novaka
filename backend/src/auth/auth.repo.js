import crypto from "crypto";
import argon2 from "argon2";
import { getMongoDb } from "../db/mongo.js";

const USERS = "users";
const SESSIONS = "sessions";

function now() {
  return new Date();
}

function addDays(d) {
  const dt = new Date();
  dt.setDate(dt.getDate() + d);
  return dt;
}

export async function ensureAuthIndexes() {
  const db = await getMongoDb();
  await db.collection(USERS).createIndex({ email: 1 }, { unique: true });
  await db.collection(SESSIONS).createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
}

export async function createUser({ email, password }) {
  const db = await getMongoDb();
  const pepper = process.env.PASSWORD_PEPPER || "dev";
  const passwordHash = await argon2.hash(password + pepper, { type: argon2.argon2id });

  const doc = {
    email: email.toLowerCase(),
    passwordHash,
    createdAt: now(),
    role: "user",
  };

  const res = await db.collection(USERS).insertOne(doc);
  return { id: String(res.insertedId), email: doc.email, role: doc.role, createdAt: doc.createdAt };
}

export async function findUserByEmail(email) {
  const db = await getMongoDb();
  return db.collection(USERS).findOne({ email: email.toLowerCase() });
}

export async function verifyPassword(userDoc, password) {
  const pepper = process.env.PASSWORD_PEPPER || "dev";
  return argon2.verify(userDoc.passwordHash, password + pepper);
}

export async function createSession({ userId, ip, userAgent }) {
  const db = await getMongoDb();
  const ttlDays = Number(process.env.SESSION_TTL_DAYS || 14);
  const sid = crypto.randomBytes(32).toString("hex");

  const doc = {
    sid,
    userId,
    ip: ip || null,
    userAgent: userAgent || null,
    createdAt: now(),
    expiresAt: addDays(ttlDays),
  };

  await db.collection(SESSIONS).insertOne(doc);
  return { sid, expiresAt: doc.expiresAt };
}

export async function findSession(sid) {
  const db = await getMongoDb();
  return db.collection(SESSIONS).findOne({ sid });
}

export async function deleteSession(sid) {
  const db = await getMongoDb();
  await db.collection(SESSIONS).deleteOne({ sid });
}
