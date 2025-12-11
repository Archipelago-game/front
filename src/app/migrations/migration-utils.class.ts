import type { FormType } from "../../modules/game-form/types/form/form.type.ts";
import { MIGRATION_LIST } from "./migration-list.const.ts";
import {
  hasMigration,
  type MigrationState,
  type MigrationInfo,
  type MigrationDefinition,
  type MigrationTechnicalInfo,
} from "./migration.type.ts";

import * as lodash from "lodash";
// todo метод формирования MigrationState для нового персонажа

export class MigrationUtils {
  public migrate(userId: string, character: FormType) {
    character._migration ??= { list: [], appliedVersion: 0 };

    if (this.isMigrationsUpToDate(character._migration)) {
      return;
    }

    const migrationsToRun = this.getMigrationsToRun(character._migration);
    return this.runMigrations(userId, character, migrationsToRun);
  }

  public createDefaultMigration(userId: string): MigrationState {
    const appliedVersion = MIGRATION_LIST.at(-1)?.version ?? 0;
    const list = MIGRATION_LIST.map((m) =>
      this.migrationFactory(userId, {
        name: m.name,
        version: m.version,
      }),
    );
    return {
      appliedVersion,
      list,
    };
  }

  private getMigrationsToRun(migrationState: MigrationState) {
    if (migrationState.list.length === 0) {
      return MIGRATION_LIST;
    }

    const appliedVersion = migrationState.list.at(-1) ?? 0;
    const appliedMigrationIndex = MIGRATION_LIST.findIndex(
      (migration) => migration.version === appliedVersion,
    );
    return MIGRATION_LIST.slice(appliedMigrationIndex + 1);
  }

  private isMigrationsUpToDate(migrationState: MigrationState) {
    return migrationState.appliedVersion >= this.actualMigration.version;
  }

  private runMigrations(
    userId: string,
    character: FormType,
    migrationList: MigrationDefinition[],
  ) {
    const characterClone = lodash.cloneDeep(character);
    migrationList.forEach((migration) => {
      migration.apply(character);
      this.setMigrationInfo(userId, characterClone, {
        name: migration.name,
        version: migration.version,
      });
    });
    return characterClone;
  }

  private setMigrationInfo(
    userId: string,
    character: FormType,
    data: MigrationTechnicalInfo,
  ) {
    const migrationInfo = this.migrationFactory(userId, data);
    if (!hasMigration(character)) {
      throw new Error(`Cannot set migration "_migration"`);
    }

    character._migration.list.push(migrationInfo);
    character._migration.appliedVersion = this.actualMigration.version;
  }

  private get actualMigration() {
    return MIGRATION_LIST[MIGRATION_LIST.length - 1];
  }

  private migrationFactory(
    userId: string,
    data: MigrationTechnicalInfo,
  ): MigrationInfo {
    return {
      migratedAt: Date.now(),
      migratedBy: userId,
      ...data,
    };
  }
}

export const migrationUtils = new MigrationUtils();
