import { Router } from "express";
import multer from "multer";
import path from "path";
import {
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  getEmployees,
  updateEmployee,
} from "./employee.controller";
import { validateBody } from "../../middlewares/validate.middleware";
import {
  createEmployeeValidation,
  updateEmployeeValidation,
} from "../../validations/employee.validation";

const router = Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.get("/", getEmployees);
router.get("/:id", getEmployeeById);
router.post(
  "/",
  upload.single("photo"),
  validateBody(createEmployeeValidation),
  createEmployee
);
router.put(
  "/:id",
  upload.single("photo"),
  validateBody(updateEmployeeValidation),
  updateEmployee
);
router.delete("/:id", deleteEmployee);

export default router;
