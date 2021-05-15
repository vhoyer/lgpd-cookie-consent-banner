export function Cookies() {
  this.all = () => document.cookie.split(';').map(s => s.trim());

  this.get = (name) => {
    const selected = this.all().find(row => row.startsWith(`${name}=`));
    if (!selected) return;
    return selected.split('=')[1];
  }

  this.set = (name, value) => {
    const newCookie = `${name}=${value}`;
    const rest = this.all().filter(row => !row.startsWith(`${name}=`));

    const newString = [
      newCookie,
      ...rest,
    ].join('; ');

    document.cookie = newString;
  }
}
