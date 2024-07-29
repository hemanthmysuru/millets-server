import { Request, Response } from "express";

class HomeController {
    public getHome(req: Request, res: Response) {
        res.send("Hello, world...!");
    }
}

export default HomeController;
