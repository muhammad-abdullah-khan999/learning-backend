import { Router } from 'express'
import { postURLShortener, getShortenerPage, redirectToShortLink } from '../controllers/postshortener.controller.js';

const router = Router();

router.get("/report", (req, res) => {
    const student = [
        {name: "Abdullah",grade: "12th",favouriteSubject: "Computer"},
        {name: "Jason",grade: "11th",favouriteSubject: "Physics"},
        {name: "Robert",grade: "10th",favouriteSubject: "History"},
        {name: "Messi",grade: "9th",favouriteSubject: "Maths"},
        {name: "Thomas",grade: "8th",favouriteSubject: "English"},       
    ]
    return res.render("report", {student})
})

router.get("/", getShortenerPage );

router.post("/", postURLShortener)
 
router.get("/:shortCode", redirectToShortLink );

export const shortenerRoutes = router;