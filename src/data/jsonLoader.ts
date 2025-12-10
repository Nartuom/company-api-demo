import fs from "fs";
import path from "path";

export function jsonLoader<T>(dirPath: string): T[] {
    // read all files
    const files = fs.readdirSync(dirPath);

    const results: T[] = [];

    for (const file of files) {
        // skip non-json
        if (!file.endsWith(".json")) continue;

        const fullPath = path.join(dirPath, file);

        try {
            // read file contents
            const raw = fs.readFileSync(fullPath, "utf-8");

            // parse JSON
            const parsed = JSON.parse(raw);

            // data files might contain an object or an array
            if (Array.isArray(parsed)) {
                results.push(...parsed);
            } else {
                results.push(parsed);
            }
        } catch (err) {
            console.warn(`Skipping invalid JSON file: ${fullPath}`);
        }
    }
    return results;
}