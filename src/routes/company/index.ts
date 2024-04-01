import express from 'express';
//import {verifyToken} from "../../middleware/verifyToken";
import { addCompany, companiesByState, getCompanies ,getCompany, companyBranches} from '../../controllers/comapny/index';

const router = express.Router();

router.post('/', addCompany).get('/byState', companiesByState).get("/",getCompanies).get("/single",getCompany).get("/branches", companyBranches);

export default router;