require('dotenv').config();
const { Bot } = require("grammy");

// Telegram 봇 토큰
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

// 봇 초기화
await bot.init();

// /start 명령어 처리
bot.command("start", async (ctx) => {
  const keyboard = {
    inline_keyboard: [
      [{ text: "Play Game", web_app: { url: "https://mgdggame.vercel.app/" } }],  // 게임 링크 수정
      [{ text: "Follow X", url: "https://x.com/MSDG_official" }],
      // [{ text: "Join Official Telegram", url: "https://t.me/fnfs_official" }],
    ],
  };

  const message = `
✨ Our world is coming to life, and we can’t wait to share it with you!
🧩 Solve arcane puzzles, harness magical energy, and battle for supremacy.
⚔️ Prepare for a Play-to-Earn experience like never before in Mystic The Gathering!
  `;

  const gifUrl = 'https://msdgbot.vercel.app/msdgpic.png';  // public 폴더에 있는 GIF 파일 경로

  // ✅ GIF + 메시지 + 버튼을 한 번에 보냄
  await ctx.replyWithAnimation(gifUrl, {
    caption: message,
    reply_markup: keyboard,
    parse_mode: "Markdown",
  });
});

// ✅ Vercel 서버리스 API로 실행
export async function POST(req) {
  try {
    const body = await req.json();
    await bot.handleUpdate(body);
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Bot Error:", error);
    return new Response("Error", { status: 500 });
  }
}

