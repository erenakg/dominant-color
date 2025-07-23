# 🎨 Resim Renk Paleti Çıkarıcı

Resimlerdeki dominant renkleri analiz eden ve görsel bir palet halinde sunan web uygulaması.

![Dominant Color Extractor](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## ✨ Özellikler

- 📸 **Resim Yükleme**: Drag & drop veya dosya seçerek resim yükleme
- 🎨 **Renk Analizi**: Resimdeki en yaygın 20 rengi otomatik çıkarma
- 🔍 **Detaylı Görüntüleme**: Her rengin hex kodu ve yüzdelik oranı
- 📋 **Kopyalama**: Renk kodlarına tıklayarak panoya kopyalama
- 📱 **Responsive Tasarım**: Mobil ve masaüstü uyumlu
- 🌈 **Animasyonlu Arkaplan**: Sürekli değişen gradyan efektleri

## 🚀 Hızlı Başlangıç

### Gereksinimler
- Modern web tarayıcısı (Chrome, Firefox, Safari, Edge)
- JavaScript desteği

### Kurulum

1. **Projeyi klonlayın:**
```bash
git clone https://github.com/kullaniciadi/dominant-color.git
cd dominant-color
```

2. **Tarayıcıda açın:**
```bash
# index.html dosyasını çift tıklayarak açın
# veya live server kullanın
```

## 📁 Dosya Yapısı

```
dominant-color/
├── index.html          # Ana HTML dosyası
├── style.css           # CSS stilleri ve animasyonlar
├── script.js           # JavaScript renk analiz algoritması
└── README.md           # Bu dosya
```

## 🛠️ Teknolojiler

- **HTML5**: Yapısal içerik ve dosya yükleme
- **CSS3**: Responsive tasarım ve animasyonlar
- **JavaScript (ES6+)**: Canvas API ile renk analizi
- **Canvas API**: Resim işleme ve pixel analizi

## 📖 Kullanım

1. **Resim Seçin**: "Resim seçmek için tıklayın" alanına tıklayın
2. **Dosya Yükleyin**: JPG, PNG, GIF formatlarında resim seçin
3. **Sonuçları Görün**: Otomatik olarak renk paleti oluşturulur
4. **Renk Kodunu Kopyalayın**: İstediğiniz renk kutusuna tıklayın

## ⚙️ Algoritma Detayları

### Renk Analizi
- **Pixel Örnekleme**: Performans için her 4. pixel analiz edilir
- **Renk Gruplandırma**: Benzer renkler 20'lik adımlarla gruplandırılır
- **Şeffaflık Filtresi**: Alpha değeri 128'den düşük pixeller atlanır
- **Sıralama**: En yaygın 20 renk yüzdelik oranlarıyla listelenir

### Renk Dönüşümü
```javascript
// RGB'den Hex'e dönüşüm
rgbToHex(r, g, b) {
    return "#" + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }).join("");
}
```

## 🎨 Özelleştirme

### Renk Sayısını Değiştirme
```javascript
// script.js - analyzeColors fonksiyonunda
.slice(0, 20); // 20'yi istediğiniz sayıyla değiştirin
```

### Animasyon Hızını Değiştirme
```css
/* style.css - body elementinde */
animation: gradientShift 12s ease infinite; /* 12s'yi değiştirin */
```

### Renk Gruplandırma Hassasiyeti
```javascript
// script.js - groupColor fonksiyonunda
groupColor(r, g, b, step = 20) // step değerini değiştirin
```

## 🌐 Tarayıcı Desteği

| Tarayıcı | Versiyon |
|----------|----------|
| Chrome   | 60+      |
| Firefox  | 55+      |
| Safari   | 11+      |
| Edge     | 79+      |


## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request açın

## 🐛 Bilinen Sorunlar

- Çok büyük resimler (>10MB) performans sorunlarına neden olabilir
- CORS politikası nedeniyle bazı online resimler yüklenemeyebilir


## 🙏 Teşekkürler

- HTML5 Canvas API
- CSS Grid Layout
- ES6+ JavaScript özellikleri