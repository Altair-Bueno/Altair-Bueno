#!/usr/bin/env deno run --allow-read=. --no-check --no-config --no-lock --no-prompt -q
/**
 * Compile Handlebars templates using Deno
 * 
 * # Implementation details
 * 
 * Notice how we defer imports to improve startup performance
 */

// Async imports
const HandlebarsPromise = import("npm:handlebars")

// CLI
import { parse } from "https://deno.land/std/flags/mod.ts";
const args = parse(Deno.args);

if (args.h || args.help) {
  console.log("USAGE: ./hbs -d DATA [...FILES]");
  console.table({
    "-h, --help": "Print this help",
    "-d DATA": "Input data. Must be valid JSON",
    // https://handlebarsjs.com/api-reference/compilation.html#handlebars-compile-template-options
    "--hbs.OPTION=VALUE": "Pass `OPTION` to Handlebars",
    FILES: "List of files to compile with Handlebars",
  });
  Deno.exit(0);
}

// Async JSON load
const dataPromise = import(`${Deno.cwd()}/${args.d}`, {
  assert: { type: "json" },
});

// Helpers
function urlEncode(obj: Record<string, string>): string {
  return new URLSearchParams(obj).toString();
}

// Handlebars setup
const { default: Handlebars } = await HandlebarsPromise;
Handlebars.registerHelper("urlEncode", urlEncode);
// Data setup
const { default: data } = await dataPromise;

// Compile and run
const tasksPromises = args._.map(async (templatePath: string) => {
  const template = await Deno.readTextFile(templatePath);
  const compiledTemplate = Handlebars.compile(template, args.hbs);
  const output = compiledTemplate(data);
  return output;
});

const results = await Promise.all(tasksPromises);
console.log(...results);
