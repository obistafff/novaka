import { Router } from "express";
import {
  createOrder,
  listOrders,
} from "../controllers/orders.controller.js";

const router = Router();

/**
 * Admin / debug: list all orders
 * GET /api/orders
 */
router.get("/", listOrders);

/**
 * Checkout mock: create a new order
 * POST /api/orders
 */
router.post("/", createOrder);

export default router;
