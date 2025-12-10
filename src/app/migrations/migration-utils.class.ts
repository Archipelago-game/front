import type { FormType } from "../../modules/game-form/types/form/form.type.ts";
import { MIGRATION_LIST } from "./migration-list.const.ts";
import type {
  Migration,
  MigrationItem,
  MigrationTechnicalInfo,
} from "./migration.type.ts";
import { FirebasePatch } from "./firebase-patch.ts";

export class MigrationUtils {
  public migrate(userId: number, character: FormType) {
    if (!("_migration" in character)) {
      character._migration = { list: [], currentVersion: 0 };
    }

    if (this.isMigrationsUpToDate(character._migration)) {
      return;
    }

    const migrationsToRun = this.getMigrationsToRun(character._migration);
    this.runMigrations(userId, character, migrationsToRun);
  }

  private getMigrationsToRun(migration: Migration) {
    if (migration.list.length === 0) {
      return MIGRATION_LIST;
    }
    const appliedMigration = migration.list[migration.list.length - 1];
    const appliedVersion = appliedMigration.version;
    const appliedMigrationIndex = MIGRATION_LIST.findIndex(
      (migration) => migration.version === appliedVersion,
    );
    return MIGRATION_LIST.slice(appliedMigrationIndex + 1);
  }

  private isMigrationsUpToDate(migration: Migration) {
    const actualMigration = this.actualMigrationInfo;
    return migration.currentVersion >= actualMigration.version;
  }

  private runMigrations(
    userId: number,
    character: FormType,
    migrationList: MigrationTechnicalInfo[],
  ) {
    migrationList.forEach((migration) => {
      FirebasePatch[migration.name](character);
      this.setMigrationInfo(userId, character, migration);
    });
  }

  private setMigrationInfo(
    userId: number,
    character: FormType,
    data: MigrationTechnicalInfo,
  ) {
    const migration = this.migrationFactory(userId, data);
    character._migration.list.push(migration);
    character._migration.currentVersion = this.actualMigrationInfo.version;
  }

  private get actualMigrationInfo() {
    return MIGRATION_LIST[MIGRATION_LIST.length - 1];
  }

  private migrationFactory(
    userId: number,
    data: MigrationTechnicalInfo,
  ): MigrationItem {
    return {
      migratedAt: Date.now(),
      migratedBy: userId,
      ...data,
    };
  }
}

export function migrationUtilsFactory() {
  let state: MigrationUtils | null;
  return () => {
    if (!state) {
      state = new MigrationUtils();
    }
    return state;
  };
}
