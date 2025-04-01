const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json({ limit: '100mb' }));

app.get('/', (req, res) => {
    res.redirect("https://discord.gg/skyapps");
});

app.post('/transcripts/v1/:channelId', (req, res) => {
    const { channelId } = req.params;
    const transcriptContent = req.body.content;

    if (!transcriptContent) {
        return res.status(400).json({ error: 'Conteúdo do transcript não fornecido.' });
    }

    const dirPath = path.join(__dirname, 'transcripts');
    const filePath = path.join(dirPath, `transcript-${channelId}.html`);

    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }

    fs.writeFile(filePath, transcriptContent, 'utf8', err => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao salvar o transcript.' });
        }
        const link = `https://skyapps.squareweb.app/transcripts/v1/${channelId}/view`;
        res.status(200).json({ message: 'Transcript salvo com sucesso.', link });
    });
});

app.get('/transcripts/v1/:channelId/view', (req, res) => {
    const { channelId } = req.params;
    const filePath = path.join(__dirname, 'transcripts', `transcript-${channelId}.html`);

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).sendFile(path.join(__dirname, '404.html'));
    }
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(PORT, () => {
    console.clear();
    console.log(`
███████╗██╗  ██╗██╗   ██╗     █████╗ ██████╗ ██████╗ ███████╗
██╔════╝██║ ██╔╝╚██╗ ██╔╝    ██╔══██╗██╔══██╗██╔══██╗██╔════╝
███████╗█████╔╝  ╚████╔╝     ███████║██████╔╝██████╔╝███████╗
╚════██║██╔═██╗   ╚██╔╝      ██╔══██║██╔═══╝ ██╔═══╝ ╚════██║
███████║██║  ██╗   ██║       ██║  ██║██║     ██║     ███████║
╚══════╝╚═╝  ╚═╝   ╚═╝       ╚═╝  ╚═╝╚═╝     ╚═╝     ╚══════╝
                                                                
            > Sky Apps Transcript API is running <
            > Access at: http://localhost:${PORT} <
            > Sky Apps: https://discord.gg/skyapps <
    `.trim());
});
