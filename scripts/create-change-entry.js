// Crea una nueva entrada de change-log y la enlaza con su grupo.
// Se usa desde `npm run changes:entry:new`.
const { createChangeEntry, parseCliArgs } = require("./change-log-lib");

function main() {
  const args = parseCliArgs(process.argv.slice(2));

  const filePath = createChangeEntry({
    changeId: args["change-id"],
    groupId: args["group-id"],
    title: args.title,
    slug: args.slug,
  });

  process.stdout.write(`Entrada creada en ${filePath}\n`);
}

try {
  main();
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exit(1);
}
