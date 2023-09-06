import { Router } from "express";
import * as dictionaryController from "../../controllers/dictionaryController";

const dictionaryRouter = Router();

dictionaryRouter.post("/equipment/get", dictionaryController.getEquipment);

export default dictionaryRouter;
