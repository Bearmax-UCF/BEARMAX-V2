import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();

fs.readdirSync(path.resolve(__dirname + "/")).forEach(file => {
  if (file !== "index.ts") {
    const filePath = `./${file.slice(0, -3)}`;
    import(filePath).then(api => {
      router.use(api.basePath || `/${file.slice(0,-3).toLowerCase()}`, api.default);
    });
  }
});

export default router;
