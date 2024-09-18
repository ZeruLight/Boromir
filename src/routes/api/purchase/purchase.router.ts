import { Router } from "express";
import * as notImplementedController from "../notImplementedController";

const purchaseRouter = Router();

purchaseRouter.post("/list", notImplementedController.blankResponseEncrypted);

export default purchaseRouter;
