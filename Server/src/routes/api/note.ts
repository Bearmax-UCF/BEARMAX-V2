import { Router } from "express";
import requireJwtAuth from "../../middleware/requireJwtAuth";
import PhysicianNotes from "../../models/PhysicianNotes";
const router = Router();

router.get("/", requireJwtAuth, async (req, res, next) => {
	try {
		
		const allNotes = await PhysicianNotes.find({
			userID: req.user?._id.toString(),
		});
		res.status(200).json({allNotes});
	} catch (err) {
		next(err);
	}
});

router.post("/", requireJwtAuth, async (req, res, next) => {
	try {
		const { title, date, note } = req.body;
		const userID = req.user?._id.toString();
		if (!title || !date || !note)
			return res.status(400).send({ message: "Missing one or more fields." });
		const newNote = new PhysicianNotes({title, date, note, userID});
		newNote.save();

		res.status(200).json({ newNote });
	} catch (err) {
		next(err);
	}
});

router.patch("/:id", requireJwtAuth, async (req, res, next) => {
	const id = req.params.id;
	try {
		const { title, note} = req.body;

		if (!id) return res.status(400).send({ message: "Missing id." });

		if (!title && !note) 
			return res.status(400).send({ message: "Missing at least one field" });

		await PhysicianNotes.findByIdAndUpdate(id, { title, note });
		res.status(200).send();
	} catch (err) {
		next(err);
	}
});

router.delete("/:id", requireJwtAuth, async (req, res, next) => {
	try {
		const id = req.params.id;
		if (!id) 
			return res.status(400).json({ message: "Missing id." });
		const note = await PhysicianNotes.findByIdAndDelete(id);
		res.status(200).json(note);
	} catch (err) {
		next(err);
	}
});

export const basePath = "/note";

export default router;
