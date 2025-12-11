import { MIGRATION_LIST } from "./migration-list.const.ts";
import {
  hasMigration,
  type MigrationState,
  type MigrationInfo,
  type MigrationDefinition,
  type MigrationTechnicalInfo,
} from "./migration.type.ts";

import clonedeep from "lodash.clonedeep";
import type { CharacterDocument } from "../../api/firebase-characters-service.ts";

export class MigrationUtils {
  public migrate(userId: string, characterDoc: CharacterDocument) {
    characterDoc.meta ??= {
      characterFormMigration: {
        appliedVersion: 0,
        list: [],
      },
    };

    if (this.isMigrationsUpToDate(characterDoc.meta.characterFormMigration)) {
      return;
    }

    const migrationsToRun = this.getMigrationsToRun(
      characterDoc.meta.characterFormMigration,
    );

    return this.runMigrations(userId, characterDoc, migrationsToRun);
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

    const appliedVersion = migrationState.list.at(-1)?.version ?? 0;
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
    characterDoc: CharacterDocument,
    migrationList: MigrationDefinition[],
  ) {
    const characterDocClone = clonedeep(characterDoc);

    migrationList.forEach((migration) => {
      migration.apply(characterDocClone.data);
      this.setMigrationInfo(userId, characterDocClone, {
        name: migration.name,
        version: migration.version,
      });
    });
    return characterDocClone;
  }

  private setMigrationInfo(
    userId: string,
    characterDoc: CharacterDocument,
    data: MigrationTechnicalInfo,
  ) {
    const migrationInfo = this.migrationFactory(userId, data);
    if (!hasMigration(characterDoc)) {
      throw new Error(`Cannot set migration "meta.characterFormMigration"`);
    }

    characterDoc.meta.characterFormMigration.list.push(migrationInfo);
    characterDoc.meta.characterFormMigration.appliedVersion =
      this.actualMigration.version;
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
