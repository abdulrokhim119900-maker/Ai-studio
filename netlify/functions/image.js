exports.handler = async (event) => {
      try {
            const { prompt } = JSON.parse(event.body || "{}");

            const response = await fetch(process.env.MEGALLM_URL, {
                  method: "POST",
                  headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.MEGALLM_KEY}`,
                  },
                  body: JSON.stringify({
                        model: process.env.MEGALLM_MODEL,
                        prompt,
                        type: "image",
                  }),
            });

            const data = await response.json();

            return {
                  statusCode: 200,
                  body: JSON.stringify(data),
            };
      } catch (e) {
            return {
                  statusCode: 500,
                  body: JSON.stringify({ error: e.message }),
            };
      }
};