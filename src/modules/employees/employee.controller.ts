import { Request, Response } from "express";
import employeeService from "./employee.service";

export const getEmployees = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const search = req.query.search as string | undefined;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await employeeService.getAll({
      search,
      page,
      limit,
    });

    res.json({
      message: "Employees fetched successfully",
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch employees",
      error,
    });
  }
};

export const getEmployeeById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id as string;

    const employee = await employeeService.getById(id);

    if (!employee) {
      res.status(404).json({
        message: "Employee not found",
      });
      return;
    }

    res.json({
      message: "Employee fetched successfully",
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch employee",
      error,
    });
  }
};

export const createEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const photoPath = req.file ? `uploads/${req.file.filename}` : null;

    const employee = await employeeService.create({
      ...req.body,
      photo_path: photoPath,
    });

    res.status(201).json({
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create employee",
      error,
    });
  }
};

export const updateEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id as string;

    const existingEmployee = await employeeService.getById(id);

    if (!existingEmployee) {
      res.status(404).json({
        message: "Employee not found",
      });
      return;
    }

    const photoPath = req.file ? `uploads/${req.file.filename}` : undefined;

    const employee = await employeeService.update(id, {
      ...req.body,
      photo_path: photoPath,
    });

    res.json({
      message: "Employee updated successfully",
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update employee",
      error,
    });
  }
};

export const deleteEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id as string;

    const deleted = await employeeService.softDelete(id);

    if (!deleted) {
      res.status(404).json({
        message: "Employee not found",
      });
      return;
    }

    res.json({
      message: "Employee soft deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete employee",
      error,
    });
  }
};
