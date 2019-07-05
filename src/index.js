import React, { useState } from "react";
import ReactDOM from "react-dom";

import reshader from "reshader";
import { SketchPicker } from "react-color";

import Button from "@material-ui/core/Button";
import { CopyToClipboard } from "react-copy-to-clipboard";

import "./styles.css";

const width = 20;
const offset = 20;

function rectangle(color) {
  return (
    <svg
      x="0"
      y={offset}
      width={width}
      height={width}
      style={{ margin: "1rem" }}
    >
      <rect width={width} height={width} style={{ fill: color }} />
    </svg>
  );
}

function getSvg(colors) {
  return `
  <svg
    height="${width}"
    width="${colors.length * (width + offset)}"
  >
${colors
  .map(
    (color, index) =>
      `<rect width="${width}" height="${width}" y="0" x="${index *
        (offset + width)}" style="fill: ${color}" />`
  )
  .join(" \n")}
</svg>
  `;
}

function createPalette(color) {
  const { palette } = reshader(color, { numberOfVariations: 4 });
  return palette;
}

function App() {
  const [color, setColor] = useState("#ff0000");
  const palette = createPalette(color);
  const svgPalette = getSvg(palette);

  return (
    <div className="layout">
      <h1>Palette2Figma</h1>
      <p>
        Create your palette and use it in figma by just using CTRL-C and CTRL-V
      </p>

      <SketchPicker onChange={color => setColor(color.hex)} />

      <div>{palette.map(color => rectangle(color))}</div>

      <CopyToClipboard
        text={svgPalette}
        // onCopy={() => this.setState({ copied: true })}
      >
        <Button type="primary">Copy to Clipboard</Button>
      </CopyToClipboard>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
