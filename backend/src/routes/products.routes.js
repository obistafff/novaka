import { Router } from "express";
import { listProducts, createProduct, updateProduct, deleteProduct } from "../controllers/products.controller.js";

const router = Router();

router.get("/", listProducts);

// dev/admin (sans auth pour l’instant)
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
