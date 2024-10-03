## Introduction

Halo, nama saya **Muhammad Farhan Hamidie**.

GoFinance merupakan website yang saya kembangkan untuk mengikuti proses rekrutmen posisi Frontend Developer di PT Mauju Teknologi Inovasi.

Tech Stack:

- Typescript
- Next.js
- Tailwindcss

## Getting Started

Clone poject:

```bash
git clone https://github.com/muhammadfarhan19/gofinance-mauju
```

Pindah direktori

```bash
cd gofinance-mauju
```

Install dependency

```bash
yarn
# or
npm install
```

Menjalankan server:

```bash
npm run dev
# or
yarn dev
```

Buka [http://localhost:3000](http://localhost:3000) dengan browser untuk melihat hasilnya.

## Notes

Pada pengembangan website GoFinance ini, saya menggunakan [Fake Store API](https://fakestoreapi.com/) sebagai fake REST API. Semua fitur seperti Register, Login, CRUD Product, dan CRUD Profile dapat digunakan dengan normal. Namun, karena data di Fake Store API tidak dapat diubah meskipun melakukan operasi CRUD, hasil perubahan tidak akan terlihat pada data yang ditampilkan oleh website.

Untuk memastikan semua fitur berfungsi dengan baik, Anda bisa memeriksa Developer Console di bagian Network untuk melihat proses request.

```bash
 username = mor_2314
 password = 83r5^_

 # or

 username = kevinryan
 password = kev02937@
```

Fitur pagination tidak berfungsi karna API dari [Fake Store API](https://fakestoreapi.com/) tidak menyediakan request untuk pagination.

## Deploy on Vercel

Website GoFinance sudah di-_deploy_ menggunakan [Vercel](https://vercel.com/), dan dapat dikunjungi dengan klik [di sini](https://gofinance-mauju.vercel.app/)
