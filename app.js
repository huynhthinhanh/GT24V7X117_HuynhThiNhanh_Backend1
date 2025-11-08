const express = require("express");
const cors = require("cors");

const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

// Handle 404 response
app.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có route nào khớp với URL yêu cầu
    next(new ApiError(404, "Resource not found"));
});

// Middleware xử lý lỗi tập trung
// Trong các đoạn code xử lý ở các route, gọi next(error)sẽ chuyển về Middleware xử lý lỗi này
app.use((err, req, res, next) => {
    // Nếu lỗi có statusCode thì dùng, không thì mặc định là 500
    res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;
