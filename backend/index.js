const listen = require("./app");
const PORT = require("./utils/config");
const info = require("./utils/logger");

listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});
