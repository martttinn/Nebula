// Valida la coherencia estructural y de referencias del change-log repo-local.
// Se usa desde `npm run changes:validate`.
const { validateChangeLog } = require("./change-log-lib");

function main() {
  const { errors, warnings, entries, groups } = validateChangeLog(process.cwd());

  if (errors.length > 0) {
    process.stderr.write("Validacion change-log fallida:\n");
    for (const error of errors) {
      process.stderr.write(`- ${error}\n`);
    }
    process.exit(1);
  }

  if (warnings.length > 0) {
    process.stdout.write("Warnings change-log:\n");
    for (const warning of warnings) {
      process.stdout.write(`- ${warning}\n`);
    }
  }

  process.stdout.write(
    `Change-log valido. Entradas: ${entries.length}. Grupos: ${groups.length}.\n`,
  );
}

main();
