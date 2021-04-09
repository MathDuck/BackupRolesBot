const { Command } = require("discord-akairo");
const { inspect } = require("util");

class EvalCommand extends Command {
  constructor() {
    super("eval", {
      aliases: ["eval"],
      args: [
        {
          id: "code",
          match: "content",
          prompt: { start: "what do you want to execute as code?" },
        },
      ],
      ownerOnly: true,
      category: "owner",
    });
  }

  exec(message, args) {
    if (message.deletable) message.delete();
    const input = args.code;
    try {
      let output = eval(input);
      if (typeof output !== "string") output = inspect(output);
      if (output.length > 1950) output = `${output.substr(0, 1950)}...`;
      message.channel.send(`Input: eval(${input});\nOutput:\n${output}`, {
        code: "js",
      });
    } catch (error) {
      message.channel.send(`**Erreur:** \n\`${error}\``);
    }
  }
}

module.exports = EvalCommand;
