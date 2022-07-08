export class StringUtil {
  static toTitleCase(value: string) {
    const words = value.split(" ");
    const first = words.shift();
    const capitalized = first?.charAt(0).toUpperCase() ?? "" + first?.substring(1) ?? "";
    return `${capitalized} ${words.join(" ")}`
  }
}
