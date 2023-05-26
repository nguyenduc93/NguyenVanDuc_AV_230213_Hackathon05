const express = require("express");
const router = express.Router();
const database = require("../utils/database");

router.get("/", async (req, res) => {
  try {
    let data = await database.execute("SELECT * FROM hackathonmd3.advance");
    let [tasks] = data;
    res.json({
      status: "success",
      tasks,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

router.post("/", async (req, res) => {
  const { Content, DateT, StatusA, NameTo } = req.body;
  try {
    let data = await database.execute(
      `INSERT INTO hackathonmd3.advance (Content, DateT, StatusA, NameTo ) VALUES (?, ?, ?, ?)`,
      [Content, DateT, StatusA, NameTo]
    );
    res.json({
      status: "success",
    });
  } catch (error) {
    res.json({ error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { Content, DateT, StatusA, NameTo } = req.body;
  console.log(Content);
  try {
    let result = await database.execute(
      `UPDATE hackathonmd3.advance SET Content = ?, DateT = ?, StatusA = ?, NameTo = ? WHERE TastId = ${id}`,
      [Content, DateT, StatusA, NameTo]
    );
    res.status(200).json({
      status: "Ok",
      message: "Cập nhật thành công",
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      error: "Lỗi server trong quá trình xử lý yêu cầu",
    });
  }
});

router.delete("/:id", async (req, res) => {
  let { id } = req.params;

  try {
    let data = await database.execute(
      `delete from hackathonmd3.advance where TastId=${id}`
    );
    res.json({
      status: "success",
      message: "Delete successfully",
    });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
