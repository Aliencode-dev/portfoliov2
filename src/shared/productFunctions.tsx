export const SharePage = async (title: string, text: string, url: string) => {
  const data = {
    title,
    text,
    url,
  };
  if (navigator.share) {
    try {
      await navigator.share(data);
    } catch (err) {
      console.error("Error sharing:", err);
    }
  } else {
    alert("Web Share API is not supported in your browser.");
  }
};

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}
export function GetDarkestColor(
  imageUrl: string
): Promise<{ hex: string; rgb: number[] }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        let darkestPixelBrightness = Number.MAX_SAFE_INTEGER;
        let darkestPixel = [0, 0, 0];

        for (let i = 0; i < imageData.data.length; i += 4) {
          const r = imageData.data[i];
          const g = imageData.data[i + 1];
          const b = imageData.data[i + 2];

          // Calculate brightness (using a more perceptually accurate formula)
          const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

          // Update darkest pixel if found darker one
          if (brightness < darkestPixelBrightness) {
            darkestPixelBrightness = brightness;
            darkestPixel = [r, g, b];
          }
        }

        // Convert darkest pixel to hex color
        const hexColor = rgbToHex(
          darkestPixel[0],
          darkestPixel[1],
          darkestPixel[2]
        );

        resolve({ hex: hexColor, rgb: darkestPixel });
      } else {
        reject(new Error("Could not get canvas context"));
      }
    };

    img.onerror = function () {
      reject(new Error("Could not load image"));
    };

    img.src = imageUrl;
  });
}
