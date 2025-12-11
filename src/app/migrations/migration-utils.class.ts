import { CHARACTER_FORM_MIGRATION_LIST } from "./migration-list.const.ts";
import {
  type MigrationState,
  type MigrationInfo,
  type MigrationDefinition,
} from "./migration.type.ts";

import clonedeep from "lodash.clonedeep";
import type { CharacterDocument } from "../../api/firebase-characters-service.ts";
import type { FormType } from "../../modules/game-form/types/form/form.type.ts";

export class MigrationUtils {
  protected migrationList: MigrationDefinition<FormType>[] =
    CHARACTER_FORM_MIGRATION_LIST;

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

    const migratedCharacterForm = this.runMigrations(
      characterDoc.data,
      migrationsToRun,
    );
    const updatedMigrationState = this.setMigrationState(
      userId,
      characterDoc.meta.characterFormMigration,
      migrationsToRun,
    );
    characterDoc.data = migratedCharacterForm;
    characterDoc.meta.characterFormMigration = updatedMigrationState;
    return characterDoc;
  }

  public setDefaultMigrationState(userId: string): MigrationState {
    const appliedVersion = this.migrationList.at(-1)?.version ?? 0;
    const list = this.migrationList.map((m) =>
      this.migrationInfoFactory(userId, m),
    );
    return {
      appliedVersion,
      list,
    };
  }

  private isMigrationsUpToDate(migrationState: MigrationState) {
    return migrationState.appliedVersion >= this.actualMigration.version;
  }

  private getMigrationsToRun(
    migrationState: MigrationState,
  ): MigrationDefinition<FormType>[] {
    if (migrationState.list.length === 0) {
      return this.migrationList;
    }

    const appliedVersion = migrationState.list.at(-1)?.version ?? 0;
    const appliedMigrationIndex = this.migrationList.findIndex(
      (migration) => migration.version === appliedVersion,
    );
    return this.migrationList.slice(appliedMigrationIndex + 1);
  }

  private runMigrations(
    characterForm: FormType,
    migrationList: MigrationDefinition<FormType>[],
  ) {
    let currentCharacterForm = characterForm;

    for (const migration of migrationList) {
      currentCharacterForm = migration.apply(currentCharacterForm);
    }

    return currentCharacterForm;
  }

  private setMigrationState(
    userId: string,
    migrationState: MigrationState,
    migrationList: MigrationDefinition<FormType>[],
  ): MigrationState {
    const migrationInfoListClone = clonedeep(migrationState.list);
    for (const migration of migrationList) {
      migrationInfoListClone.push(this.migrationInfoFactory(userId, migration));
    }

    const appliedVersion = migrationInfoListClone.at(-1)?.version ?? 0;

    return {
      appliedVersion,
      list: migrationInfoListClone,
    };
  }

  private get actualMigration() {
    return this.migrationList[this.migrationList.length - 1];
  }

  private migrationInfoFactory(
    userId: string,
    migration: MigrationDefinition<FormType>,
  ): MigrationInfo {
    return {
      name: migration.name,
      version: migration.version,
      migratedAt: Date.now(),
      migratedBy: userId,
    };
  }
}

export const migrationUtils = new MigrationUtils();
