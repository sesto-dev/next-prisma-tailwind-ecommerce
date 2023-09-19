export function omitUser<User, Key extends keyof User>(
   user: User,
   ...keys: Key[]
): Omit<User, Key> {
   for (let key of keys) {
      delete user['password']
   }
   return user
}
