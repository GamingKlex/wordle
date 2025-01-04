// This script is run every 24 hours to update today's and yesterday's word.

import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const yesterdayFile = path.join(__dirname, "../public/YESTERDAY");
const todayFile = path.join(__dirname, "../public/TODAY");

console.log("Updating yesterday's word...");

const yesterdayWord = fs.readFileSync(todayFile, "utf-8");
fs.cpSync(todayFile, yesterdayFile, { force: true });

console.log("Updating today's word...");

const words = fs
  .readFileSync(path.join(__dirname, "../public/wordlist.txt"), "utf-8")
  .split("\n")
  .filter((word) => word !== yesterdayWord);
const word = words[Math.floor(Math.random() * words.length)];

fs.writeFileSync(todayFile, word.toUpperCase());

console.log("Done!");
