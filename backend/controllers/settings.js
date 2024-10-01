const settingsRouter = require("express").Router();
const fs = require("fs"); // used for config file management

settingsRouter.get("/", (request, response) => {
  console.log("Fetching settings");
  fs.readFile("./settings.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading settings file:", err);
      return response
        .status(500)
        .json({ error: "Could not read settings file" });
    }

    // Parse the JSON content and return it
    try {
      const settings = JSON.parse(data);
      response.json(settings);
    } catch (parseError) {
      console.error("Error parsing settings file:", parseError);
      response.status(500).json({ error: "Could not parse settings file" });
    }
  });
});

settingsRouter.post("/", (request, response) => {
  const settingsData = JSON.stringify(request.body, null, 2);
  fs.writeFile("./settings.json", settingsData, (err) => {
    if (err) {
      console.error("Error writing to settings file:", err);
      return response.status(500).json({ error: "Failed to save settings" });
    }

    // Send the response only after the file write is successful
    response.status(200).send("Settings saved successfully!");
  });
});

module.exports = settingsRouter;
