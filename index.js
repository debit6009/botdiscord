const Discord = require("discord.js");

const TOKEN = "NTMwMTYwODQ4OTkyMjA2ODY4.Dw7ZoQ.ODaBt_KiRRT3NlCnw1UZ3BKnzpQ";
const PREFIX = ".";

var bot = new Discord.Client;

bot.on("ready", function () {
    console.log("ready");
    bot.user.setGame("ivicaaa");
});

bot.on('guildMemberAdd', function (message) {
    let guild = message.guild;
    let member = message;


    const embed = new Discord.RichEmbed()
        .setColor(0xffffff)
        .setTitle(`Dobrodoslica`)
        .setDescription(`Dobrodosao ${member}, na nas Team AXE Discord`)
        .setFooter(`Galaxy | Development`)
        .setThumbnail(`https://i.imgur.com/Va1K00v.png`);

    member.guild.channels.find('name', 'join-leave').send({ embed: embed });


});


bot.on("message", function (message) {
    if (message.author.equals(bot.user)) return;

    if (message.content == "hello") {
        message.channel.sendMessage("Pusi kurac");
    }


    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case "goran":
            var embed = new Discord.RichEmbed()
                .addField("Keno je supak", "keno je supcina")
                .setColor("#AC3737")
                .setTitle("Keno je najbolji igrac u FORTNITE");
            message.channel.sendEmbed(embed);
            break;
        case "kick":
            let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if (!kUser) return message.channel.send("Can't find user!");
            let kReason = args.join(" ").slice(22);
            if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
            if (kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

            let kickEmbed = new Discord.RichEmbed()
                .setDescription("~Kick~")
                .setColor("#e56b00")
                .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
                .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
                .addField("Kicked In", message.channel)
                .addField("Tiime", message.createdAt)
                .addField("Reason", kReason);

            let kickChannel = message.guild.channels.find(`name`, "incidents");
            if (!kickChannel) return message.channel.send("Can't find incidents channel.");

            message.guild.member(kUser).kick(kReason);
            kickChannel.send(kickEmbed);


            return;
            break;
        case "lara":
            var embed = new Discord.RichEmbed()
                .setTitle("LARIN IZBOR")
                .setDescription("Glumci:")
                .addField("Lara, Jakov, Dinqe, Lejla", "to su nase ustase")
                .setColor("#AC3737")
                .setThumbnail("https://i.imgur.com/4qi4Kgh.jpg")
            message.channel.sendEmbed(embed);
            break;
        case "prune":
            let args = message.content.split(" ").slice(1);
            let author = message.member;
            if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ti nemas permisiju");
            if (!args[0]) {
                message.delete();
                message.channel.send("Niste ljepo ukucali komandu");
                return;
            }
            if (args[0] > 100) {
                message.delete();
                message.channel.send("Maximalno mozes izbrisati 100 poruka od jednom");
                return;
            }

            message.delete();
            message.channel.bulkDelete(args[0]);
            var embed = new Discord.RichEmbed()
                .setTitle("Moderation")
                .setDescription("Chat-Selection")
                .addField("Uspjesno je izbrisano", args[0] + " poruka !")
                .setColor("#FB00FF")
                .setThumbnail("https://img.icons8.com/metro/1600/checkmark.png")
            message.channel.sendEmbed(embed);

            break;
        case "ban":
            if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Ti nemas permisiju");
            let memberToBan = message.mentions.members.first();
            let banReason = message.content.split(" ").slice(1);

            if (!banReason[1]) {
                var embed = new Discord.RichEmbed()
                    .setTitle("Error")
                    .setDescription("Ban-Selection")
                    .addField("Molimo vas da koristite ovaj format komande", ".ban <userID> [reason]")
                    .setColor("#FB00FF")
                    .setThumbnail("https://img.icons8.com/metro/1600/close-window.png")
                message.channel.sendEmbed(embed);
                return;
            }
            if (!memberToBan) {
                var embed = new Discord.RichEmbed()
                    .setTitle("Error")
                    .setDescription("Ban-Selection")
                    .addField("Molimo vas da koristite ovaj format komande", ".ban <userID> [reason]")
                    .setColor("#FB00FF")
                    .setThumbnail("https://img.icons8.com/metro/1600/close-window.png")
                message.channel.sendEmbed(embed);
                return;
            }
            if (message.guild.members.find(`id`, memberToBan.id)) {
                memberToBan.ban(banReason);
                var embed = new Discord.RichEmbed()
                    .setTitle("Moderation")
                    .setDescription("Ban-Selection")
                    .addField("Uspjesno ste banovali", memberToBan)
                    .setColor("#FB00FF")
                    .setThumbnail("https://img.icons8.com/metro/1600/checkmark.png")
                message.channel.sendEmbed(embed);
                return;
            }
            break;
        default:
            message.channel.sendMessage("Komanda ne postoji ili ste je pogresno ukucali");
    }
});

bot.login(TOKEN);