# install mongodb on ubuntu 20.04
https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-20-04
1. link untuk menginstall mongodb di compute engine os ubuntu 20.04

1. Untuk menghubungkan MongoDB yang berjalan di Compute Engine di Google Cloud dengan local Compute Engine, Anda dapat mengikuti langkah-langkah berikut:
- Pastikan kedua Compute Engine (Compute Engine di Google Cloud dan local Compute Engine) dapat saling terhubung melalui jaringan. Pastikan tidak ada pembatasan firewall yang menghalangi koneksi antara kedua mesin.
- Dari local Compute Engine, buka terminal atau koneksi SSH ke instance Compute Engine di Google Cloud yang menjalankan MongoDB.
- Di instance Compute Engine di Google Cloud, buka berkas konfigurasi MongoDB (mongod.conf) dengan menggunakan editor teks seperti Nano atau Vim.
- Cari bagian "bindIp" dalam berkas konfigurasi MongoDB. Secara default, nilainya adalah "127.0.0.1", yang berarti MongoDB hanya akan menerima koneksi dari localhost. Anda perlu mengubah nilainya agar MongoDB menerima koneksi dari alamat IP Compute Engine di Google Cloud dan juga dari alamat IP local Compute Engine. Untuk mengizinkan koneksi dari alamat IP yang spesifik, Anda dapat menambahkan alamat IP tersebut ke dalam nilai "bindIp" atau menggantinya dengan "0.0.0.0" untuk mengizinkan koneksi dari semua alamat IP. Misalnya, jika alamat IP local Compute Engine adalah 192.168.0.100 dan alamat IP Compute Engine di Google Cloud adalah 10.0.0.2, Anda bisa mengkonfigurasi "bindIp" menjadi: "bindIp: 127.0.0.1,192.168.0.100,10.0.0.2".
```
sudo nano /etc/mongod.conf

cara mengubahnya to 0.0.0.0
```
- Simpan perubahan pada berkas konfigurasi MongoDB dan restart layanan MongoDB untuk menerapkan perubahan tersebut. Anda dapat menggunakan perintah sudo service mongod restart atau sudo systemctl restart mongod tergantung pada distribusi Linux yang Anda gunakan.
- Setelah layanan MongoDB diinstance Compute Engine di Google Cloud sudah di-restart, MongoDB akan menerima koneksi dari alamat IP yang telah diizinkan.
- Dari local Compute Engine, Anda dapat menggunakan klien MongoDB seperti MongoDB Shell atau aplikasi lain yang mendukung MongoDB untuk terhubung ke MongoDB di Compute Engine di Google Cloud menggunakan alamat IP publik atau privat Compute Engine tersebut. Misalnya, jika alamat IP publik Compute Engine adalah 34.128.102.39, Anda dapat menggunakan perintah mongo --host 34.128.102.39 pada local Compute Engine untuk terhubung ke MongoDB.
- Pastikan untuk mengamankan koneksi dan mengimplementasikan langkah-langkah keamanan tambahan yang diperlukan untuk melindungi database MongoDB Anda, seperti mengaktifkan autentikasi dan mengenkripsi komunikasi dengan SSL/TLS.
![Alt text](image.png)
tara sudah terhubung ke local

As mentioned previously, the systemctl status command checks the status of the MongoDB service:
```
sudo systemctl status mongod
```
You can stop the service anytime by typing:
```
sudo systemctl stop mongod
```
To start the service when it’s stopped, run:
```
sudo systemctl start mongod
```
You can also restart the server when it’s already running:
```
sudo systemctl restart mongod
```
In Step 2, you enabled MongoDB to start automatically with the server. If you ever wish to disable this automatic startup, type:
```
sudo systemctl disable mongod
```
Then to re-enable it to start up at boot, run the enable command again:
```
sudo systemctl enable mongod
```

# cara menginstall nodenya dari nvm
https://www.dicoding.com/academies/342/tutorials/20917 disini

> dont forget to restart ssh connection after install nvm because nvm command not found

