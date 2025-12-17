import type { Request, Response } from "express";
export declare class AuthController {
    register(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<void>;
    logout(_: Request, res: Response): void;
    me(req: Request, res: Response): void;
}
//# sourceMappingURL=auth.controller.d.ts.map