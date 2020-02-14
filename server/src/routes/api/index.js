import { Router } from "express";
import auth from "./auth";
import users from "./users";
import products from "./products";
import passport from "passport";

const router = Router();

router.use("/auth/", auth);
router.use("/users/", passport.authenticate("jwt", { session: false }), users);
router.use(
  "/products/",
  passport.authenticate("jwt", { session: false }),
  products
);

export default router;
