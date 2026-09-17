require("dotenv").config();

globalThis.DOMMatrix ??= class DOMMatrix {
  constructor(a = 1, b = 0, c = 0, d = 1, e = 0, f = 0) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;
  }

  multiplySelf() { return this; }
  preMultiplySelf() { return this; }
  invertSelf() { return this; }
  translate() { return this; }
  scale() { return this; }
  setTransform() { return this; }
};

const app = require("./src/app.js");
const PORT = process.env.PORT || 8888;
const connectDB = require("./src/config/db.js");
connectDB();

app.listen(PORT, () => {
  console.log("server is running is port", PORT);
});