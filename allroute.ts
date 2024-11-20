/**
 * this is all auth route customer need
 * to accesses them
 * @type {String[]}
 */
export const authRoute: string[] = ["/auth/signIn", "/auth/register"];
/**
 * this is all public route customer allow
 * to accesses them
 * @type {String[]}
 */
export const publicRoute: string[] = ["/"];
/**
 * this is all  route only admin allowed
 * to accesses them
 * @type {String[]}
 */
export const adminRoute: string[] = ["auth/admin", "/auth/setting"];
