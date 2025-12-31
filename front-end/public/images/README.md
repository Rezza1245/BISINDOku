# Gesture Images untuk BISINDO Kamus

Folder ini berisi image files untuk gesture/gerakan tangan setiap huruf A-Z dalam BISINDO.

## Struktur File

Setiap image harus dinamai dengan huruf yang sesuai:

```
public/images/
├── A.png  ← Gambar gesture untuk huruf A
├── B.png  ← Gambar gesture untuk huruf B
├── C.png  ← Gambar gesture untuk huruf C
├── ... (D sampai Y)
└── Z.png  ← Gambar gesture untuk huruf Z
```

## Spesifikasi Image

| Properti    | Rekomendasi                         |
| ----------- | ----------------------------------- |
| Format      | PNG (dengan transparent background) |
| Ukuran      | 100x100px sampai 200x200px          |
| Background  | Transparent (.png)                  |
| Color Space | RGB                                 |
| Kualitas    | High quality, clear hand gesture    |
| Style       | Consistent across all images        |

## Penggunaan di Aplikasi

Image digunakan di beberapa tempat:

1. **Alphabet Grid Buttons** - Ukuran 35x35px
2. **Word Cards** - Ukuran 40x40px
3. **Detail Modal** - Ukuran 80x80px
4. **Video Info** - Ukuran 40x40px

## Cara Membuat Image

### Option 1: Dari Foto

1. Rekam video gerakan tangan untuk setiap huruf
2. Extract frame terbaik sebagai image
3. Edit dengan photo editor (background transparent)
4. Export sebagai PNG 200x200px

### Option 2: Dari Video

```bash
# Extract frame dari video A.mp4
ffmpeg -i A.mp4 -vf "select=eq(n\,0)" -q:v 1 A.png
```

### Option 3: Dari Ilustrator

1. Buat hand gesture illustration di software (Adobe Illustrator, Figma, Inkscape)
2. Export sebagai PNG
3. Ensure transparent background

### Option 4: Download dari Internet

- Search "BISINDO hand gesture letter A-Z"
- Pastikan license memungkinkan penggunaan
- Edit untuk konsistensi (ukuran, style)

## Best Practices

✅ Transparent background (untuk better integration)
✅ Consistent styling across all letters
✅ Clear, recognizable hand gestures
✅ High quality, not pixelated
✅ Same size ratio untuk semua image
✅ Consistent lighting/angle

## Responsive Sizing

CSS sudah handle responsive sizing:

- Mobile (<768px): Resize otomatis
- Tablet (768-992px): Resize otomatis
- Desktop (>992px): Full size

---

**Catatan**: Image akan di-invert warna (negative) saat button active untuk better visibility.
