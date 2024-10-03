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

```bash
cd gofinance-mauju
```

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Notes

Pada mengembangan website GoFinance ini, saya menggunakan https://fakestoreapi.com/ sebagai fake rest API.

Semua fitur seperti Register, Login, CRUD Product, dan CRUD Profile dapat digunakan dengan normal.

Namun dikarenakan data yang diberikan oleh Fake Store API tidak dapat berubah-ubah, maka untuk menguji fitur CRUD dapat dilihat melalui _Developer Console_.

Untuk login dapat menggunakan username dan password di bawah ini

```bash
 username = mor_2314
 password = 83r5^_

 # or

 username = johnd
 password = m38rmF$
```

Fitur pagination tidak berfungsi karna API dari [fake store API](ttps://fakestoreapi.com/) tidak menyediakan request untuk pagination.

## Deploy on Vercel

Website GoFinance sudah di-_deploy_ menggunakan [Vercel](https://vercel.com/), dan dapat dikunjungi dengan klik [di sini](https://gofinance-mauju.vercel.app/)
