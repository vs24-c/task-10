import { Router } from "express";
import Controller from "../controller/productsController.mjs";

const router = Router();
router.get("/", (req, res) => {
  res.render("index", {
    user: req.user,
    title: "Main Phone"
  });
});

export default router;
