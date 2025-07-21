class ColorExtractor {
    constructor() {
        this.imageInput = document.getElementById('imageInput');
        this.previewImg = document.getElementById('previewImg');
        this.imagePreview = document.getElementById('imagePreview');
        this.colorPalette = document.getElementById('colorPalette');
        this.colorsContainer = document.getElementById('colorsContainer');
        
        this.initEventListeners();
    }

    initEventListeners() {
        this.imageInput.addEventListener('change', (e) => this.handleImageUpload(e));
    }

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            this.previewImg.src = e.target.result;
            this.imagePreview.classList.remove('hidden');
            this.extractColors(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    extractColors(imageSrc) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = img.width;
            canvas.height = img.height;
            
            ctx.drawImage(img, 0, 0);
            
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const colors = this.analyzeColors(imageData.data);
            
            this.displayColors(colors);
        };
        
        img.src = imageSrc;
    }

    analyzeColors(pixelData) {
        const colorMap = new Map();
        const step = 4; // Her 4. pixel'i al (performans için)
        
        for (let i = 0; i < pixelData.length; i += step * 4) {
            const r = pixelData[i];
            const g = pixelData[i + 1];
            const b = pixelData[i + 2];
            const a = pixelData[i + 3];
            
            // Şeffaf pixelleri atla
            if (a < 128) continue;
            
            // Renkleri grupla (benzer renkleri birleştir)
            const groupedColor = this.groupColor(r, g, b);
            const colorKey = `${groupedColor.r},${groupedColor.g},${groupedColor.b}`;
            
            if (colorMap.has(colorKey)) {
                colorMap.set(colorKey, colorMap.get(colorKey) + 1);
            } else {
                colorMap.set(colorKey, 1);
            }
        }
        
        // En yaygın renkleri al
        const sortedColors = Array.from(colorMap.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8);
        
        const totalPixels = sortedColors.reduce((sum, [, count]) => sum + count, 0);
        
        return sortedColors.map(([colorKey, count]) => {
            const [r, g, b] = colorKey.split(',').map(Number);
            return {
                rgb: { r, g, b },
                hex: this.rgbToHex(r, g, b),
                percentage: ((count / totalPixels) * 100).toFixed(1)
            };
        });
    }

    groupColor(r, g, b, step = 30) {
        return {
            r: Math.round(r / step) * step,
            g: Math.round(g / step) * step,
            b: Math.round(b / step) * step
        };
    }

    rgbToHex(r, g, b) {
        return "#" + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }).join("");
    }

    displayColors(colors) {
        this.colorsContainer.innerHTML = '';
        
        colors.forEach((color, index) => {
            const colorItem = document.createElement('div');
            colorItem.className = 'color-item';
            colorItem.style.backgroundColor = '#f9f9f9';
            
            colorItem.innerHTML = `
                <div class="color-box" style="background-color: ${color.hex}"></div>
                <div class="color-code">${color.hex}</div>
                <div class="percentage">${color.percentage}%</div>
            `;
            
            // Renk kodunu kopyalama özelliği
            colorItem.addEventListener('click', () => this.copyToClipboard(color.hex, colorItem));
            
            this.colorsContainer.appendChild(colorItem);
        });
        
        this.colorPalette.classList.remove('hidden');
    }

    async copyToClipboard(text, element) {
        try {
            await navigator.clipboard.writeText(text);
            element.classList.add('copied');
            setTimeout(() => element.classList.remove('copied'), 1000);
        } catch (err) {
            console.error('Kopyalama hatası:', err);
        }
    }
}

// Uygulamayı başlat
document.addEventListener('DOMContentLoaded', () => {
    new ColorExtractor();
});