import express from "express"
import { JwtAuth } from "../middleware/jwtAuth.js"


const router = express.Router()
router.post("/", JwtAuth, (req, res) => {
    res.json({
        ok: true
    })
})


export default router