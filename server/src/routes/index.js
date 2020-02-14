import { Router } from "express";
import api from "./api";

const router = Router();

const API_VERSION = "/api/v1";

router.use(API_VERSION, api);

export default router;
