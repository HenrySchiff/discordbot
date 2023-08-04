import { Client, GatewayIntentBits, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js'
import { formatDistanceToNow } from 'date-fns'
import dotenv from 'dotenv'
dotenv.config()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
		GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
    ]
})

const createTimerEmbed = (time) => {
    return new EmbedBuilder()
        .setColor('e28743')
        .setTitle('MISSING: IMCRUSTY')
        .setImage('https://cdn.discordapp.com/avatars/488837632483393557/7bb148467d5fab9cca5833cef25bd2db.webp?size=80')
        .addFields({ name: 'Last seen:', value: `${time} ago` })
}


const createInviteButton = () => {
    const button = new ButtonBuilder()
        .setCustomId('invite')
        .setLabel('Invite Drew')
        .setStyle(ButtonStyle.Primary);

    return new ActionRowBuilder()
        .addComponents(button)
}


const updateMessage = (message) => {
    const banDate = 1690819680000
    var timePassed = Date.now() - banDate

    const oneSecond = 1000
    const oneMinute = oneSecond * 60
    const oneHour = oneMinute * 60
    const oneDay = oneHour * 24
  
    const days = Math.floor(timePassed / oneDay)
    timePassed %= oneDay

    const hours = Math.floor(timePassed / oneHour)
    timePassed %= oneHour
  
    const minutes = Math.floor(timePassed / oneMinute)
    timePassed %= oneMinute
  
    const seconds = Math.floor(timePassed / oneSecond)

    const time = [];
    if (days > 0) time.push(`${days} day${days > 1 ? 's' : ''}`);
    if (hours > 0) time.push(` ${hours} hour${hours > 1 ? 's' : ''}`);
    if (minutes > 0) time.push(` ${minutes} minute${minutes > 1 ? 's' : ''}`);
    if (seconds > 0) time.push(` ${seconds} second${seconds > 1 ? 's' : ''}`);

    message.edit({
        embeds: [createTimerEmbed(time.toString())]
    })
}


client.on("messageCreate", async (message) => {
    console.log(message.content)

    if (message.content === '/drewtimer') {
        const timerMessage = await message.channel.send({
            embeds: [createTimerEmbed(" ")],
            // components: [createInviteButton()]
        })

        setInterval(() => {
            updateMessage(timerMessage)
        }, 1000)
    }
})

client.login(process.env.DISCORD_TOKEN)