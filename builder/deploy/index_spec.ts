import { Architect, Target } from '@angular-devkit/architect';
import { WorkspaceNodeModulesArchitectHost } from '@angular-devkit/architect/node';
import { TestingArchitectHost } from '@angular-devkit/architect/testing';
import { schema, workspaces } from '@angular-devkit/core';
import { NodeJsAsyncHost } from '@angular-devkit/core/node';
import * as path from 'path';

describe('Command Runner Builder', () => {
  let architect: Architect;
  let architectHost: TestingArchitectHost;

  const root = path.resolve(__dirname, '../../'); // tslint:disable-line:no-any
  const workspaceRoot = path.join(root, 'builder-test/');
  const deployTarget: Target = { project: 'builder-test', target: 'deploy' };

  beforeEach(async () => {
    const registry = new schema.CoreSchemaRegistry();
    registry.addPostTransform(schema.transforms.addUndefinedDefaults);
    const workspacePath = path.normalize(workspaceRoot);
    console.log(workspacePath);
    const { workspace } = await workspaces.readWorkspace(
      workspacePath,
      workspaces.createWorkspaceHost(new NodeJsAsyncHost()),
    );

    architectHost = new TestingArchitectHost(
      workspaceRoot,
      workspaceRoot,
      new WorkspaceNodeModulesArchitectHost(workspace as any, workspaceRoot),
    );
    architect = new Architect(architectHost, registry);
  });

  it('should just run', async () => {
    const run = await architect.scheduleTarget(deployTarget);
    const output = await run.result;
    expect(output.success).toBe(true);
    await run.stop();
  }, 30000);
});
