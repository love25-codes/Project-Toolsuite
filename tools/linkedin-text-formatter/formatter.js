const input = document.getElementById("input");
const output = document.getElementById("output");

function transformText(style) {
    const text = input.value;

    if (!text.trim()) {
        output.value = "";
        return;
    }

    output.value = [...text]
        .map(char => convertChar(char, style))
        .join("");
}

function convertChar(char, style) {
    const code = char.charCodeAt(0);

    const isUpper = code >= 65 && code <= 90;
    const isLower = code >= 97 && code <= 122;

    if (!isUpper && !isLower) return char;

    const index = isUpper ? code - 65 : code - 97;

    const maps = {
        bold: {
            upper: 0x1D5D4,
            lower: 0x1D5EE
        },
        italic: {
            upper: 0x1D608,
            lower: 0x1D622
        },
        boldItalic: {
            upper: 0x1D63C,
            lower: 0x1D656
        }
    };

    const base = isUpper
        ? maps[style].upper
        : maps[style].lower;

    return String.fromCodePoint(base + index);
}

document.getElementById("boldBtn").addEventListener("click", () => {
    transformText("bold");
});

document.getElementById("italicBtn").addEventListener("click", () => {
    transformText("italic");
});

document.getElementById("boldItalicBtn").addEventListener("click", () => {
    transformText("boldItalic");
});

document.getElementById("copyBtn").addEventListener("click", async () => {
    if (!output.value) return;

    await navigator.clipboard.writeText(output.value);

    if (window.showNotification) {
        showNotification("Copied to clipboard!", "success");
    }
});

document.getElementById("clearBtn").addEventListener("click", () => {
    input.value = "";
    output.value = "";
});