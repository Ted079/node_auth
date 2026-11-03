import { Router } from "express";

// import { checkAuth } from "../middleware/checkAuth";
import { login, register } from "../controllers/user.contoller.js";

const router = Router();


//auth
router.post("/register", register);
router.post("/login", login);

//current user
// router.get("/me", checkAuth, getMe);




