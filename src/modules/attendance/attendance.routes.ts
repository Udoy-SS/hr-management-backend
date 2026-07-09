import { Router } from "express";
import {
  createOrUpdateAttendance,
  deleteAttendance,
  getAttendanceById,
  getAttendanceList,
  updateAttendance,
} from "./attendance.controller";
import { validateBody } from "../../middlewares/validate.middleware";
import {
  createAttendanceValidation,
  updateAttendanceValidation,
} from "../../validations/attendance.validation";

const router = Router();

router.get("/", getAttendanceList);
router.get("/:id", getAttendanceById);
router.post(
  "/",
  validateBody(createAttendanceValidation),
  createOrUpdateAttendance
);
router.put("/:id", validateBody(updateAttendanceValidation), updateAttendance);
router.delete("/:id", deleteAttendance);

export default router;
