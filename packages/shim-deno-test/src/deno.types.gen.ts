// deno-lint-ignore-file
// deno-fmt-ignore-file
// DO NOT EDIT - This file is automatically maintained by `npm run generate-deno-types`
import { URL } from "url";

/**
 * Register a test which will be run when `deno test` is used on the command
 * line and the containing module looks like a test module.
 * `fn` can be async if required.
 * ```ts
 * import {assert, fail, assertEquals} from "https://deno.land/std/testing/asserts.ts";
 *
 * Deno.test({
 *   name: "example test",
 *   fn(): void {
 *     assertEquals("world", "world");
 *   },
 * });
 *
 * Deno.test({
 *   name: "example ignored test",
 *   ignore: Deno.build.os === "windows",
 *   fn(): void {
 *     // This test is ignored only on Windows machines
 *   },
 * });
 *
 * Deno.test({
 *   name: "example async test",
 *   async fn() {
 *     const decoder = new TextDecoder("utf-8");
 *     const data = await Deno.readFile("hello_world.txt");
 *     assertEquals(decoder.decode(data), "Hello world");
 *   }
 * });
 * ```
 */
export declare function test(t: TestDefinition): void;

export interface TestDefinition {
  fn: (t: TestContext) => void | Promise<void>;
  name: string;
  ignore?: boolean;
  /**
   * If at least one test has `only` set to true, only run tests that have
   * `only` set to true and fail the test suite.
   */
  only?: boolean;
  /**
   * Check that the number of async completed ops after the test is the same
   * as number of dispatched ops. Defaults to true.
   */
  sanitizeOps?: boolean;
  /**
   * Ensure the test case does not "leak" resources - ie. the resource table
   * after the test has exactly the same contents as before the test. Defaults
   * to true.
   */
  sanitizeResources?: boolean;
  /**
   * Ensure the test case does not prematurely cause the process to exit,
   * for example via a call to `Deno.exit`. Defaults to true.
   */
  sanitizeExit?: boolean;
  /**
   * Specifies the permissions that should be used to run the test.
   * Set this to "inherit" to keep the calling thread's permissions.
   * Set this to "none" to revoke all permissions.
   *
   * Defaults to "inherit".
   */
  permissions?: PermissionOptions;
}

export interface TestContext {
  /**
   * Run a sub step of the parent test or step. Returns a promise
   * that resolves to a boolean signifying if the step completed successfully.
   * The returned promise never rejects unless the arguments are invalid.
   * If the test was ignored the promise returns `false`.
   */
  step(t: TestStepDefinition): Promise<boolean>;
  /**
   * Run a sub step of the parent test or step. Returns a promise
   * that resolves to a boolean signifying if the step completed successfully.
   * The returned promise never rejects unless the arguments are invalid.
   * If the test was ignored the promise returns `false`.
   */
  step(name: string, fn: (t: TestContext) => void | Promise<void>): Promise<boolean>;
}

export interface TestStepDefinition {
  fn: (t: TestContext) => void | Promise<void>;
  name: string;
  ignore?: boolean;
  /**
   * Check that the number of async completed ops after the test step is the same
   * as number of dispatched ops. Defaults to the parent test or step's value.
   */
  sanitizeOps?: boolean;
  /**
   * Ensure the test step does not "leak" resources - ie. the resource table
   * after the test has exactly the same contents as before the test. Defaults
   * to the parent test or step's value.
   */
  sanitizeResources?: boolean;
  /**
   * Ensure the test step does not prematurely cause the process to exit,
   * for example via a call to `Deno.exit`. Defaults to the parent test or
   * step's value.
   */
  sanitizeExit?: boolean;
}

export type PermissionOptions = "inherit" | "none" | PermissionOptionsObject;

export interface PermissionOptionsObject {
  /**
   * Specifies if the `env` permission should be requested or revoked.
   * If set to `"inherit"`, the current `env` permission will be inherited.
   * If set to `true`, the global `env` permission will be requested.
   * If set to `false`, the global `env` permission will be revoked.
   *
   * Defaults to `false`.
   */
  env?: "inherit" | boolean | string[];
  /**
   * Specifies if the `hrtime` permission should be requested or revoked.
   * If set to `"inherit"`, the current `hrtime` permission will be inherited.
   * If set to `true`, the global `hrtime` permission will be requested.
   * If set to `false`, the global `hrtime` permission will be revoked.
   *
   * Defaults to `false`.
   */
  hrtime?: "inherit" | boolean;
  /**
   * Specifies if the `net` permission should be requested or revoked.
   * if set to `"inherit"`, the current `net` permission will be inherited.
   * if set to `true`, the global `net` permission will be requested.
   * if set to `false`, the global `net` permission will be revoked.
   * if set to `string[]`, the `net` permission will be requested with the
   * specified host strings with the format `"<host>[:<port>]`.
   *
   * Defaults to `false`.
   *
   * Examples:
   *
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   *
   * Deno.test({
   *   name: "inherit",
   *   permissions: {
   *     net: "inherit",
   *   },
   *   async fn() {
   *     const status = await Deno.permissions.query({ name: "net" })
   *     assertEquals(status.state, "granted");
   *   },
   * });
   * ```
   *
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   *
   * Deno.test({
   *   name: "true",
   *   permissions: {
   *     net: true,
   *   },
   *   async fn() {
   *     const status = await Deno.permissions.query({ name: "net" });
   *     assertEquals(status.state, "granted");
   *   },
   * });
   * ```
   *
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   *
   * Deno.test({
   *   name: "false",
   *   permissions: {
   *     net: false,
   *   },
   *   async fn() {
   *     const status = await Deno.permissions.query({ name: "net" });
   *     assertEquals(status.state, "denied");
   *   },
   * });
   * ```
   *
   * ```ts
   * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
   *
   * Deno.test({
   *   name: "localhost:8080",
   *   permissions: {
   *     net: ["localhost:8080"],
   *   },
   *   async fn() {
   *     const status = await Deno.permissions.query({ name: "net", host: "localhost:8080" });
   *     assertEquals(status.state, "granted");
   *   },
   * });
   * ```
   */
  net?: "inherit" | boolean | string[];
  /**
   * Specifies if the `ffi` permission should be requested or revoked.
   * If set to `"inherit"`, the current `ffi` permission will be inherited.
   * If set to `true`, the global `ffi` permission will be requested.
   * If set to `false`, the global `ffi` permission will be revoked.
   *
   * Defaults to `false`.
   */
  ffi?: "inherit" | boolean | Array<string | URL>;
  /**
   * Specifies if the `read` permission should be requested or revoked.
   * If set to `"inherit"`, the current `read` permission will be inherited.
   * If set to `true`, the global `read` permission will be requested.
   * If set to `false`, the global `read` permission will be revoked.
   * If set to `Array<string | URL>`, the `read` permission will be requested with the
   * specified file paths.
   *
   * Defaults to `false`.
   */
  read?: "inherit" | boolean | Array<string | URL>;
  /**
   * Specifies if the `run` permission should be requested or revoked.
   * If set to `"inherit"`, the current `run` permission will be inherited.
   * If set to `true`, the global `run` permission will be requested.
   * If set to `false`, the global `run` permission will be revoked.
   *
   * Defaults to `false`.
   */
  run?: "inherit" | boolean | Array<string | URL>;
  /**
   * Specifies if the `write` permission should be requested or revoked.
   * If set to `"inherit"`, the current `write` permission will be inherited.
   * If set to `true`, the global `write` permission will be requested.
   * If set to `false`, the global `write` permission will be revoked.
   * If set to `Array<string | URL>`, the `write` permission will be requested with the
   * specified file paths.
   *
   * Defaults to `false`.
   */
  write?: "inherit" | boolean | Array<string | URL>;
}

/**
 * Register a test which will be run when `deno test` is used on the command
 * line and the containing module looks like a test module.
 * `fn` can be async if required.
 *
 * ```ts
 * import {assert, fail, assertEquals} from "https://deno.land/std/testing/asserts.ts";
 *
 * Deno.test("My test description", (): void => {
 *   assertEquals("hello", "hello");
 * });
 *
 * Deno.test("My async test description", async (): Promise<void> => {
 *   const decoder = new TextDecoder("utf-8");
 *   const data = await Deno.readFile("hello_world.txt");
 *   assertEquals(decoder.decode(data), "Hello world");
 * });
 * ```
 */
export declare function test(name: string, fn: (t: TestContext) => void | Promise<void>): void;

/**
 * Register a test which will be run when `deno test` is used on the command
 * line and the containing module looks like a test module.
 * `fn` can be async if required. Declared function must have a name.
 *
 * ```ts
 * import {assert, fail, assertEquals} from "https://deno.land/std/testing/asserts.ts";
 *
 * Deno.test(function myTestName(): void {
 *   assertEquals("hello", "hello");
 * });
 *
 * Deno.test(async function myOtherTestName(): Promise<void> {
 *   const decoder = new TextDecoder("utf-8");
 *   const data = await Deno.readFile("hello_world.txt");
 *   assertEquals(decoder.decode(data), "Hello world");
 * });
 * ```
 */
export declare function test(fn: (t: TestContext) => void | Promise<void>): void;

/**
 * Register a test which will be run when `deno test` is used on the command
 * line and the containing module looks like a test module.
 * `fn` can be async if required.
 *
 * ```ts
 * import {assert, fail, assertEquals} from "https://deno.land/std/testing/asserts.ts";
 *
 * Deno.test("My test description", { permissions: { read: true } }, (): void => {
 *   assertEquals("hello", "hello");
 * });
 *
 * Deno.test("My async test description", { permissions: { read: false } }, async (): Promise<void> => {
 *   const decoder = new TextDecoder("utf-8");
 *   const data = await Deno.readFile("hello_world.txt");
 *   assertEquals(decoder.decode(data), "Hello world");
 * });
 * ```
 */
export declare function test(name: string, options: Omit<TestDefinition, "fn" | "name">, fn: (t: TestContext) => void | Promise<void>): void;

/**
 * Register a test which will be run when `deno test` is used on the command
 * line and the containing module looks like a test module.
 * `fn` can be async if required.
 *
 * ```ts
 * import {assert, fail, assertEquals} from "https://deno.land/std/testing/asserts.ts";
 *
 * Deno.test({ name: "My test description", permissions: { read: true } }, (): void => {
 *   assertEquals("hello", "hello");
 * });
 *
 * Deno.test({ name: "My async test description", permissions: { read: false } }, async (): Promise<void> => {
 *   const decoder = new TextDecoder("utf-8");
 *   const data = await Deno.readFile("hello_world.txt");
 *   assertEquals(decoder.decode(data), "Hello world");
 * });
 * ```
 */
export declare function test(options: Omit<TestDefinition, "fn">, fn: (t: TestContext) => void | Promise<void>): void;

/**
 * Register a test which will be run when `deno test` is used on the command
 * line and the containing module looks like a test module.
 * `fn` can be async if required. Declared function must have a name.
 *
 * ```ts
 * import {assert, fail, assertEquals} from "https://deno.land/std/testing/asserts.ts";
 *
 * Deno.test({ permissions: { read: true } }, function myTestName(): void {
 *   assertEquals("hello", "hello");
 * });
 *
 * Deno.test({ permissions: { read: false } }, async function myOtherTestName(): Promise<void> {
 *   const decoder = new TextDecoder("utf-8");
 *   const data = await Deno.readFile("hello_world.txt");
 *   assertEquals(decoder.decode(data), "Hello world");
 * });
 * ```
 */
export declare function test(options: Omit<TestDefinition, "fn" | "name">, fn: (t: TestContext) => void | Promise<void>): void;
