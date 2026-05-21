module.exports = async function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Send a POST request.' });

    try {
        const { text, fileData, fileType, type } = req.body; 
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const mainChatId = process.env.TELEGRAM_CHAT_ID;
        const personalChatId = process.env.TELEGRAM_PERSONAL_CHAT_ID; // Must be numbers, NOT a link!

        if (!botToken || !mainChatId) {
            return res.status(500).json({ error: "Server missing core Telegram credentials." });
        }

        // Build a collection of target recipients
        const targetChatIds = [mainChatId];
        if (personalChatId) {
            targetChatIds.push(personalChatId);
        }

        const caption = `🔔 NEW [${type.toUpperCase()}] ALERT\n\n${text}`;
        let base64Data = null;
        let buffer = null;
        
        if (fileData) {
            base64Data = fileData.split(',')[1];
            buffer = Buffer.from(base64Data, 'base64');
        }

        let apiErrors = [];

        // Loop through the main group ID and your personal ID
        for (const chatId of targetChatIds) {
            let telegramUrl = `https://api.telegram.org/bot${botToken}/`;
            let fetchOptions = { method: 'POST' };

            if (fileData) {
                let formData = new FormData();
                formData.append('chat_id', chatId);
                
                if (fileType && fileType.startsWith('video/')) {
                    const blob = new Blob([buffer], { type: fileType });
                    formData.append('video', blob, 'upload.mp4');
                    formData.append('caption', caption);
                    telegramUrl += 'sendVideo';
                } else {
                    const blob = new Blob([buffer], { type: fileType || 'image/jpeg' });
                    formData.append('photo', blob, 'upload.jpg');
                    formData.append('caption', caption);
                    telegramUrl += 'sendPhoto';
                }
                fetchOptions.body = formData;
            } else {
                telegramUrl += 'sendMessage';
                fetchOptions.headers = { 'Content-Type': 'application/json' };
                fetchOptions.body = JSON.stringify({
                    chat_id: chatId,
                    text: caption
                });
            }

            try {
                const response = await fetch(telegramUrl, fetchOptions);
                const result = await response.json();
                
                // If Telegram rejects the request, save the exact error reason
                if (!result.ok) {
                    apiErrors.push(`[Target ${chatId} Failed]: ${result.description}`);
                }
            } catch (err) {
                apiErrors.push(`[Target ${chatId} Failed]: Network/Fetch Error`);
            }
        }
        
        // If there were any errors, send them to the frontend so you can see them!
        if (apiErrors.length > 0) {
            return res.status(500).json({ error: apiErrors.join(" | ") });
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Telegram Webhook Error:", error);
        return res.status(500).json({ error: error.message });
    }
};
        
