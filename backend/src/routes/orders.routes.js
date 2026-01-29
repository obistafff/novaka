import { Router } from "express";
import {
  createOrder,
  listOrders,
  updateOrderStatus,
} from "../controllers/orders.controller.js";

import { requireAuth, requireAdmin } from "../middlewares/auth.js";

const router = Router();

// admin only (admin/orders)
router.get("/", requireAuth, requireAdmin, listOrders);
router.patch("/:id", requireAuth, requireAdmin, updateOrderStatus);

// public (checkout)
router.post("/", createOrder);

export default router;
