import { DMMF } from '@prisma/generator-helper';
import { generateTables } from './table';
import { generateEnums } from './enums';
import { generateRelations } from './relations';
import { generateManyToManyTables } from './many-to-many-tables';
import { generateProject, ProjectOptions } from './project';

export const autoGeneratedComment = `//// ------------------------------------------------------
//// THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
//// ------------------------------------------------------`;

export function generateDBMLSchema(
  dmmf: DMMF.Document,
  allowManyToMany: boolean = true,
  mapToDbSchema: boolean = false,
  projectOptions?: ProjectOptions
): string {
  const tables = generateTables(dmmf.datamodel.models, mapToDbSchema);
  const manyToManyTables = allowManyToMany
    ? generateManyToManyTables(dmmf.datamodel.models)
    : [];
  const enums = generateEnums(dmmf.datamodel.enums);
  const refs = generateRelations(dmmf.datamodel.models);
  const project = projectOptions ? generateProject(projectOptions) : [];

  return [
    autoGeneratedComment,
    ...project,
    ...tables,
    ...manyToManyTables,
    ...enums,
    ...refs,
  ].join('\n\n');
}
