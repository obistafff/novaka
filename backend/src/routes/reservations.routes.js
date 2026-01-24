import { Router } from "express";
import {
  createReservation,
  getReservations,
} from "../controllers/reservations.controller.js";

const router = Router();

router.get("/", getReservations);
router.post("/", createReservation);

export default router;
