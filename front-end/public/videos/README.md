# Video Folder untuk Kamus Interaktif

Folder ini berisi video-video untuk setiap huruf (A-Z) dalam BISINDO (Bahasa Isyarat Indonesia).

## Struktur File

Setiap video harus dinamai dengan format: **[HURUF].mp4**

Contoh:

- `A.mp4` - Video untuk huruf A
- `B.mp4` - Video untuk huruf B
- `C.mp4` - Video untuk huruf C
- ... dan seterusnya hingga Z

## Cara Menambahkan Video

1. Siapkan video gerakan tangan untuk setiap huruf A-Z
2. Konversi ke format MP4 (H.264 codec)
3. Letakkan file di folder ini dengan nama `[HURUF].mp4`
4. Reload aplikasi di browser

## Spesifikasi Video yang Disarankan

- **Format**: MP4 (H.264)
- **Resolusi**: 1280x720 atau 1920x1080 (16:9)
- **Durasi**: 3-10 detik
- **Frame Rate**: 30 FPS
- **Ukuran File**: < 5 MB per video

## Contoh

Jika Anda memiliki video untuk huruf A, B, dan C:

```
public/videos/
├── A.mp4
├── B.mp4
├── C.mp4
├── ...
└── Z.mp4
```

## Fitur

Ketika pengguna mengklik tombol huruf pada halaman Kamus, video akan ditampilkan dalam modal dengan:

- Player video dengan kontrol (play, pause, volume, fullscreen)
- Informasi huruf dan gesture emoji
- Responsive design untuk semua ukuran layar

---

**Catatan**: Aplikasi akan otomatis mencoba memuat video dari path `/videos/[HURUF].mp4`. Jika video tidak ditemukan, akan menampilkan pesan error di player.
