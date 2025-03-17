const express = require("express");
const router = express.Router();
const Category = require("../schemas/category");

// CREATE - Thêm category mới
router.post("/", async (req, res) => {
    try {
        const { name, description } = req.body;
        const newCategory = new Category({ name, description });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ - Lấy danh sách category
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// READ - Lấy category theo ID
router.get("/:id", async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "Category không tồn tại" });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE - Cập nhật category theo ID
router.put("/:id", async (req, res) => {
    try {
        const { name, description } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true }
        );
        if (!updatedCategory) return res.status(404).json({ message: "Category không tồn tại" });
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE - Xóa category theo ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) return res.status(404).json({ message: "Category không tồn tại" });
        res.json({ message: "Xóa category thành công!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
