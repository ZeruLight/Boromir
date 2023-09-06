import { Router } from "express";
import * as bannerController from "../../controllers/bannerController";

const bannerRouter = Router();

bannerRouter.post("/dllist/get", bannerController.getBannerDllist);

export default bannerRouter;
