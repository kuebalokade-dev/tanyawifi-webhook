import express from "express";

const app = express();
app.use(express.json());

// ✅ Webhook verifikasi Meta
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "tanyawifi_token";
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// ✅ Webhook pesan masuk
app.post("/webhook", (req, res) => {
  console.log("Pesan masuk:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(10000, () => console.log("✅ Webhook aktif di port 10000"));
