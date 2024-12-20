import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';

import { Schema } from './schema';

const PROJECT_NAME = 'pie-ka-chu';
const OTHER_PROJECT_NAME = 'pi-catch-you';

describe('ng-add', () => {
  const collectionPath = require.resolve('../../../collection.json');
  const schematicRunner = new SchematicTestRunner(
    'ngx-aws-deploy',
    collectionPath
  );

  const workspaceOptions = {
    name: 'workspace',
    newProjectRoot: 'projects',
    version: '11.0.0',
  };

  const appOptions = {
    name: PROJECT_NAME,
    inlineStyle: false,
    inlineTemplate: false,
    routing: false,
    skipTests: true,
    style: 'scss',
  };

  const defaultOptions: Schema = {
    project: PROJECT_NAME,
    region: 'A-REGION',
    bucket: 'A-BUCKET',
  };

  let appTree: UnitTestTree;

  beforeEach(async () => {
    appTree = await schematicRunner.runExternalSchematic(
      '@schematics/angular',
      'workspace',
      workspaceOptions
    );
  });

  describe('generating files', () => {
    beforeEach(async () => {
      appTree = await schematicRunner.runExternalSchematic(
        '@schematics/angular',
        'application',
        appOptions,
        appTree
      );
    });

    it('should add "deploy" target to the project', async () => {
      appTree = await schematicRunner.runSchematic(
        'ng-add',
        defaultOptions,
        appTree
      );

      const angularJson = JSON.parse(appTree.read('/angular.json').toString());

      expect(angularJson.projects[PROJECT_NAME].architect.deploy).toStrictEqual(
        {
          builder: '@jefiozie/ngx-aws-deploy:deploy',
        }
      );
    });

    it('should add "deploy" target if there are multiple projects', async () => {
      appTree = await schematicRunner.runExternalSchematic(
        '@schematics/angular',
        'application',
        { ...appOptions, name: OTHER_PROJECT_NAME },
        appTree
      );

      appTree = await schematicRunner.runSchematic(
        'ng-add',
        { ...defaultOptions, project: OTHER_PROJECT_NAME },
        appTree
      );

      const angularJson = JSON.parse(appTree.read('/angular.json').toString());

      expect(Object.keys(angularJson.projects).length).toEqual(2);

      expect(() => {
        angularJson.projects[PROJECT_NAME].architect.deploy.builder;
      }).toThrow();

      expect(
        angularJson.projects[OTHER_PROJECT_NAME].architect.deploy
      ).toStrictEqual({
        builder: '@jefiozie/ngx-aws-deploy:deploy',
      });
    });
  });

  describe('error handling', () => {
    it('fails if project not defined', async () => {
      await expect(
        schematicRunner.runSchematic('ng-add', defaultOptions, appTree)
      ).rejects.toThrowError(
        'The specified Angular project is not defined in this workspace.'
      );
    });

    it('should throw if angular.json not found', async () => {
      appTree.delete('/angular.json');

      await expect(
        schematicRunner.runSchematic('ng-add', defaultOptions, appTree)
      ).rejects.toThrowError(
        'Unable to locate a workspace file for workspace path.'
      );
    });

    it('should throw if specified project is not application', async () => {
      appTree = await schematicRunner.runExternalSchematic(
        '@schematics/angular',
        'application',
        appOptions,
        appTree
      );

      const angularJson = JSON.parse(appTree.read('/angular.json').toString());
      angularJson.projects[PROJECT_NAME].projectType = 'pokemon';
      appTree.overwrite('/angular.json', JSON.stringify(angularJson, null, 2));

      await expect(
        schematicRunner.runSchematic('ng-add', defaultOptions, appTree)
      ).rejects.toThrowError(
        'Deploy requires an Angular project type of "application" in angular.json.'
      );
    });

    it('should throw if app does not have architect configured', async () => {
      appTree = await schematicRunner.runExternalSchematic(
        '@schematics/angular',
        'application',
        appOptions,
        appTree
      );

      const angularJson = JSON.parse(appTree.read('/angular.json').toString());
      angularJson.projects[PROJECT_NAME] = { projectType: 'application' };
      appTree.overwrite('/angular.json', JSON.stringify(angularJson, null, 2));
      console.log(angularJson);
      await expect(
        schematicRunner.runSchematic('ng-add', defaultOptions, appTree)
      ).rejects.toThrowError(
        'Project "pie-ka-chu" is missing a required property "root"'
      );
    });

    it('should throw if the build target does not have "outputPath" configured', async () => {
      appTree = await schematicRunner.runExternalSchematic(
        '@schematics/angular',
        'application',
        appOptions,
        appTree
      );

      const angularJson = JSON.parse(appTree.read('/angular.json').toString());
      delete angularJson.projects[PROJECT_NAME].architect.build.options
        .outputPath;
      appTree.overwrite('/angular.json', JSON.stringify(angularJson, null, 2));

      await expect(
        schematicRunner.runSchematic('ng-add', defaultOptions, appTree)
      ).rejects.toThrowError(
        `Cannot read the output path (architect.build.options.outputPath) of the Angular project "${PROJECT_NAME}" in angular.json.`
      );
    });
  });
});
