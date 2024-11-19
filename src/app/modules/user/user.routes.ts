import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.post("/", UserController.createUserHandler);
router.get("/", UserController.getAllUsersHandler);
router.get("/:id", UserController.getUserByIdHandler);
router.put("/:id", UserController.updateUserHandler);
router.delete("/:id", UserController.deleteUserHandler);

export default router;
