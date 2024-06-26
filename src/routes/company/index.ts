import express = require('express');
//import {verifyToken} from "../../middleware/verifyToken";
const { addCompany, companiesByState, getCompanies, getCompany, companyBranches, getBranchesBystate, companiesByLocation } = require('../../controllers/comapny/index');

const router = express.Router();

router.post('/', addCompany).get('/byState', companiesByState).get("/", getCompanies).get("/single", getCompany).get("/branches", companyBranches).get("/branchbystate", getBranchesBystate).get("/companiesByLocation", companiesByLocation);

module.exports = router;