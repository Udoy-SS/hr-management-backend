import { Request, Response } from "express";
import attendanceService from "./attendance.service";

export const getAttendanceList = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const attendance = await attendanceService.getAll({
      employee_id: req.query.employee_id as string | undefined,
      date: req.query.date as string | undefined,
      from: req.query.from as string | undefined,
      to: req.query.to as string | undefined,
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
    });

    res.json({
      message: "Attendance fetched successfully",
      data: attendance.data,
      pagination: attendance.pagination,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch attendance",
      error,
    });
  }
};

export const getAttendanceById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id as string;

    const attendance = await attendanceService.getById(id);

    if (!attendance) {
      res.status(404).json({
        message: "Attendance not found",
      });
      return;
    }

    res.json({
      message: "Attendance fetched successfully",
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch attendance",
      error,
    });
  }
};

export const createOrUpdateAttendance = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { employee_id, date, check_in_time } = req.body;

    const employee = await attendanceService.employeeExists(employee_id);

    if (!employee) {
      res.status(404).json({
        message: "Employee not found",
      });
      return;
    }

    const attendance = await attendanceService.createOrUpdate({
      employee_id,
      date,
      check_in_time,
    });

    res.status(201).json({
      message: "Attendance saved successfully",
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save attendance",
      error,
    });
  }
};

export const updateAttendance = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id as string;

    const existingAttendance = await attendanceService.getById(id);

    if (!existingAttendance) {
      res.status(404).json({
        message: "Attendance not found",
      });
      return;
    }

    const attendance = await attendanceService.update(id, req.body);

    res.json({
      message: "Attendance updated successfully",
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update attendance",
      error,
    });
  }
};

export const deleteAttendance = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id as string;

    const deleted = await attendanceService.delete(id);

    if (!deleted) {
      res.status(404).json({
        message: "Attendance not found",
      });
      return;
    }

    res.json({
      message: "Attendance deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete attendance",
      error,
    });
  }
};
