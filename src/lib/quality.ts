// Utterly stolen from StackOverflow (https://stackoverflow.com/a/54905752)
import Debug from "debug";

function getFormattedDate(): string {
  const d = new Date();

  const year = d.getFullYear();
  const month = ("0" + (d.getMonth() + 1)).slice(-2);
  const day = ("0" + d.getDate()).slice(-2);
  const hour = ("0" + d.getHours()).slice(-2);
  const minute = ("0" + d.getMinutes()).slice(-2);
  const second = ("0" + d.getSeconds()).slice(-2);
  const millis = ("0" + d.getMilliseconds()).slice(-3);

  return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second + "." + millis;
}

export function addTimestampsToDebugLogging() {
  const origFormatArgs = Debug.formatArgs;

  // override default debug.formatArgs() implementation
  // requires access to "this"
  Debug.formatArgs = function(args) {
    const name = this.namespace;

    args[0] = `[${getFormattedDate()}] ${args[0]}`;

    // call original implementation
    origFormatArgs.call(this, args);
  };
}
