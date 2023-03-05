export class UserUtil {
  public static isDataMatch(
    username: string,
    currentUsername: string
  ): boolean {
    return username === currentUsername;
  }
}
