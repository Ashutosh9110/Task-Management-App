import { ZodError } from "zod";
export function errorMiddleware(err, _req, res, _next) {
    if (err instanceof ZodError) {
        return res.status(400).json({
            message: "Validation failed",
            errors: err.flatten()
        });
    }
    if (err instanceof Error) {
        if (err.message === "Invalid credentials") {
            return res.status(401).json({ message: err.message });
        }
        if (err.message === "Email already in use") {
            return res.status(409).json({ message: err.message });
        }
    }
    console.error("Unhandled error:", err);
    return res.status(500).json({
        message: "Internal server error"
    });
}
