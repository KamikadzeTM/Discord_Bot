require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();
const PREFIX = '$';
const jokes = [
    "I don't drink anymore... 'course, I don't drink any less either!",
    "Oh, I'm just a social drinker. Every time someone says, 'I'll have a drink', I say, 'So shall I'!",
    "It's like my father always used to say: 'Shut up, and get out.' ",
    "Some day, I hope to find the nuggets on a chicken.",
    "I don't have a drinkin' problem! I drink, I get drunk, I fall down. No problem!",
    "I invented a new word: Plagiarism!",
    "It is said: To err is human...<laughs> Stupid humans.",
    "It is said: everywhere is in walking distance, if you have the time.",
    "It is said: If you cannot beat them, join them. I say, if you cannot beat them, beat them. Because they will be expecting you to join them, so you will have the element of surprise.",
    "Why do people care what type of sheep I dream about?!?"
];

client.on('ready', ()=>{
    console.log(`${client.user.username} has logged in.`)
});

client.on('message', (message)=>{
    if(message.author.bot)return;
    console.log(`${message.author.tag}: ${message.content}`);
    if (message.content === '/roll'){
        message.reply(Math.floor((Math.random() * 100)+1));
    }

    if (message.content === '/chill'){
        message.reply('https://www.youtube.com/watch?v=HntrakyHmKg&t');
    }

    if (message.content === '/joke'){
        message.reply(jokes[Math.floor(Math.random() * jokes.length)]);
    }
})

// test
client.on('message', (message)=>{
    if(message.author.bot) return;
    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);

        if (CMD_NAME === 'kick') {
            if (!message.member.hasPermission('KICK_MEMBERS')){
                return message.reply('You don\'t have permission to kick members');
            }
            if (args.length === 0) {
                return message.reply('Please enter ID.');
            }
            const member = message.guild.members.cache.get(args[0]);
            if (member){
                member
                .kick()
                .then((member)=>{
                    message.channel.send(`${member} was kicked.`)
                })
                .catch((member)=>{
                    message.channel.send(`${member} was not abled to be kicked.`)
                })
            } else {
                message.channel.send('This member was not found.');
            }
        } 
        else if (CMD_NAME === 'ban'){
            if (!message.member.hasPermission('BAN_MEMBERS')){
                return message.reply('You don\'t have permission to ban members');
            }
            if (args.length === 0) return message.reply('Please provide an ID');
            message.guild.members.ban(args[0])
            .catch(err => console.log(err));
        }

        
        
    }
})
client.login(process.env.DISCORDJS_BOT_TOKEN);
