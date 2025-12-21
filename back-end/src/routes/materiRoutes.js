router.get("/", verifyToken, materiController.getMateri);
router.get("/:id", verifyToken, materiController.getMateriById);
router.post("/", verifyToken, adminOnly, materiController.createMateri);
router.put("/:id", verifyToken, adminOnly, materiController.updateMateri);
router.delete("/:id", verifyToken, adminOnly, materiController.deleteMateri);
