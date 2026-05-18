// Crea un nuevo grupo de change-log con la plantilla canónica del repo.
// Se usa desde `npm run changes:group:new`.
const { createChangeGroup, parseCliArgs } = require("./change-log-lib");

function main() {
  const args = parseCliArgs(process.argv.slice(2));

  const filePath = createChangeGroup({
    groupId: args["group-id"],
    groupType: args["group-type"],
    title: args.title,
    dateStart: args["date-start"],
    dateEnd: args["date-end"],
    status: args.status || "open",
    customer: args.customer,
  });

  process.stdout.write(`Grupo creado en ${filePath}\n`);
}

try {
  main();
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exit(1);
}
