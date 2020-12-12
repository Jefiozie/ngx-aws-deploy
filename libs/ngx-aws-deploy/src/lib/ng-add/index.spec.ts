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
    appTree = await schematicRunner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'workspace',
        workspaceOptions
      )
      .toPromise();
  });

  describe('generating files', () => {
    beforeEach(async () => {
      appTree = await schematicRunner
        .runExternalSchematicAsync(
          '@schematics/angular',
          'application',
          appOptions,
          appTree
        )
        .toPromise();
    });

    it('should add "deploy" target to the project', async () => {
      appTree = await schematicRunner
        .runSchematicAsync('ng-add', defaultOptions, appTree)
        .toPromise();

      const angularJson = JSON.parse(appTree.read('/angular.json').toString());

      expect(angularJson.projects[PROJECT_NAME].architect.deploy).toStrictEqual(
        {
          builder: '@jefiozie/ngx-aws-deploy:deploy',
        }
      );
    });

    it('should add "deploy" target if there are multiple projects', async () => {
      appTree = await schematicRunner
        .runExternalSchematicAsync(
          '@schematics/angular',
          'application',
          { ...appOptions, name: OTHER_PROJECT_NAME },
          appTree
        )
        .toPromise();

      appTree = await schematicRunner
        .runSchematicAsync(
          'ng-add',
          { ...defaultOptions, project: OTHER_PROJECT_NAME },
          appTree
        )
        .toPromise();

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
        schematicRunner
          .runSchematicAsync('ng-add', defaultOptions, appTree)
          .toPromise()
      ).rejects.toThrowError(
        'The specified Angular project is not defined in this workspace.'
      );
    });

    it('should throw if angular.json not found', async () => {
      appTree.delete('/angular.json');

      await expect(
        schematicRunner
          .runSchematicAsync('ng-add', defaultOptions, appTree)
          .toPromise()
      ).rejects.toThrowError(
        'Unable to locate a workspace file for workspace path.'
      );
    });

    it('should throw if specified project is not application', async () => {
      appTree = await schematicRunner
        .runExternalSchematicAsync(
          '@schematics/angular',
          'application',
          appOptions,
          appTree
        )
        .toPromise();

      const angularJson = JSON.parse(appTree.read('/angular.json').toString());
      angularJson.projects[PROJECT_NAME].projectType = 'pokemon';
      appTree.overwrite('/angular.json', JSON.stringify(angularJson, null, 2));

      await expect(
        schematicRunner
          .runSchematicAsync('ng-add', defaultOptions, appTree)
          .toPromise()
      ).rejects.toThrowError(
        'Deploy requires an Angular project type of "application" in angular.json.'
      );
    });

    it('should throw if app does not have architect configured', async () => {
      appTree = await schematicRunner
        .runExternalSchematicAsync(
          '@schematics/angular',
          'application',
          appOptions,
          appTree
        )
        .toPromise();

      const angularJson = JSON.parse(appTree.read('/angular.json').toString());
      angularJson.projects[PROJECT_NAME] = { projectType: 'application' };
      appTree.overwrite('/angular.json', JSON.stringify(angularJson, null, 2));

      await expect(
        schematicRunner
          .runSchematicAsync('ng-add', defaultOptions, appTree)
          .toPromise()
      ).rejects.toThrowError('Project target "build" not found.');
    });

    it('should throw if the build target does not have "outputPath" configured', async () => {
      appTree = await schematicRunner
        .runExternalSchematicAsync(
          '@schematics/angular',
          'application',
          appOptions,
          appTree
        )
        .toPromise();

      const angularJson = JSON.parse(appTree.read('/angular.json').toString());
      delete angularJson.projects[PROJECT_NAME].architect.build.options
        .outputPath;
      appTree.overwrite('/angular.json', JSON.stringify(angularJson, null, 2));

      await expect(
        schematicRunner
          .runSchematicAsync('ng-add', defaultOptions, appTree)
          .toPromise()
      ).rejects.toThrowError(
        `Cannot read the output path (architect.build.options.outputPath) of the Angular project "${PROJECT_NAME}" in angular.json.`
      );
    });
  });
});
