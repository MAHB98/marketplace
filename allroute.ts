/**
 * this is all auth route customer need
 * to accesses them
 * @type {String[]}
 */
export const authRoute: string[] = ["/signIn", "/register"];
/**
 * this is all public route customer allow
 * to accesses them
 * @type {String[]}
 */
export const publicRoute: string[] = ["/", "/cart", "/newProduct"];
/**
 * this is all  route only admin allowed
 * to accesses them
 * @type {String[]}
 */
export const adminRoute: string[] = ["/admin", "/setting"];
/**
 * this is all  route only admin allowed
 * to accesses them
 * @type {String[]}
 */
export const apiRoute: string[] = ["/api/product", "/api/shoppingCart"];
