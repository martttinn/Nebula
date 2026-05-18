// Regenera el índice derivado del change-log repo-local.
// Se usa desde `npm run changes:index`.
const { buildChangeLogIndex } = require("./change-log-lib");

function main() {
  const { indexPath, entriesCount, groupsCount } = buildChangeLogIndex(process.cwd());

  process.stdout.write(
    `Indice generado en ${indexPath}. Entradas: ${entriesCount}. Grupos: ${groupsCount}.\n`,
  );
}

try {
  main();
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exit(1);
}
