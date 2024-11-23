import { Router } from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";

const router = Router();

router.post(
  "/",
  validateRequest(UserValidation.createUserSchema),
  UserController.createUserHandler
);
router.post(
  "/login",
  validateRequest(UserValidation.loginUserSchema),
  UserController.loginUserHandler
);
router.get("/", UserController.getAllUsersHandler);
router.get("/:id", UserController.getUserByIdHandler);
router.put(
  "/:id",
  validateRequest(UserValidation.updateUserSchema),
  UserController.updateUserHandler
);
router.delete("/:id", UserController.deleteUserHandler);

export default router;
