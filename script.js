function count() {
    let A = parseFloat(document.getElementById("Nilai1").value)
    let B = parseFloat(document.getElementById("Nilai2").value)
    let C = parseFloat(document.getElementById("Nilai3").value)
    let isidata = [A, B, C];

    let maxdata = Math.max(...isidata);
    let mindata = Math.min(...isidata);

    function Med(isidata) {
        isidata.sort(function(a, b) {
            return a - b;
        });
        let mid = isidata.length / 2;
        return mid % 1 ? isidata[mid - 0.5] : (isidata[mid - 1] + isidata[mid]) / 2;
    }

    function Mean(isidata) {
        let total = 0,
            i;
        for (i = 0; i < isidata.length; i += 1) {
            total += isidata[i];
        }
        return total / isidata.length;
    }

    document.getElementsByClassName('max')[0].innerHTML = maxdata;
    document.getElementsByClassName('min')[0].innerHTML = mindata;
    document.getElementsByClassName('median')[0].innerHTML = Med(isidata);
    document.getElementsByClassName('mean')[0].innerHTML = Mean(isidata);

}

function HapusData() {
    document.getElementById("Nilai1").value = "";
    document.getElementById("Nilai2").value = "";
    document.getElementById("Nilai3").value = "";
    document.getElementsByClassName('max')[0].innerHTML = "";
    document.getElementsByClassName('min')[0].innerHTML = "";
    document.getElementsByClassName('median')[0].innerHTML = "";
    document.getElementsByClassName('mean')[0].innerHTML = "";
}
var tabel = document.getElementById('tabel'),
    nim = document.getElementById('nim'),
    nama = document.getElementById('nama'),
    prodi = document.getElementById('prodi'),
    btnTambah = document.getElementById('btnTambah'),
    form = document.getElementById('form'),
    pesan = document.getElementById('pesan'),
    email = document.getElementById('email'),
    db;

function tambahBaris(e) {
    // Periksa apakah NIM sudah ada frmUtama
    if (tabel.rows.namedItem(nim.value)) {
        alert('Error: Nim sudah terdaftar!');
        e.preventDefault();
        return;
    }

    // Membuat baris baru
    var baris = tabel.insertRow();
    baris.id = nim.value;
    baris.insertCell().appendChild(document.createTextNode(nama.value));
    baris.insertCell().appendChild(document.createTextNode(nim.value));
    baris.insertCell().appendChild(document.createTextNode(prodi.value));
    baris.insertCell().appendChild(document.createTextNode(email.value));

    // Membuat tombol hapus untuk setiap baris
    class tombol {
        constructor(btnHapus) {
            this.btnHapus = document.createElement('input');
            this.btnHapus.type = 'button';
            this.btnHapus.value = 'hapus?';
            this.btnHapus.id = nim.value;
            baris.insertCell().appendChild(this.btnHapus);
        }
        get Details() {
            return baris.insertCell().appendChild(this.btnHapus)
        }

        set Details(Details) {
            this.btnHapus.value = Details;
        }
    }
    const tombolini = new tombol();
    tombolini.Details = 'Hapus'
    console.log(tombol.Details);

    // Tambah ke database
    tambahKeDatabase({
        nim: nim.value,
        nama: nama.value,
        prodi: prodi.value,
        email: email.value
    });

    e.preventDefault();
}

form.addEventListener('submit', tambahBaris, false);
tabel.addEventListener('click', hapusBaris, true);

function kesalahanHandler(e) {
    alert('Kesalahan Database: ' + e.target.errorCode + '<br>');
}

function buatDatabase() {
    var request = window.indexedDB.open('latihan', 1);
    request.onerror = kesalahanHandler;
    request.onupgradeneeded = function(e) {
        var db = e.target.result;
        db.onerror = kesalahanHandler;
        var objectstore = db.createObjectStore('mahasiswa', { keyPath: 'nim' });
    }
    request.onsuccess = function(e) {
        db = e.target.result;
        db.onerror = kesalahanHandler;
        bacaDariDatabase();
    }
}

buatDatabase();


function buatTransaksi() {
    var transaction = db.transaction(['mahasiswa'], 'readwrite');
    transaction.onerror = kesalahanHandler;
    return transaction;
}

function tambahKeDatabase(mahasiswa) {
    var objectstore = buatTransaksi().objectStore('mahasiswa');
    var request = objectstore.add(mahasiswa);
    request.onerror = kesalahanHandler;
    request.onsuccess = alert('Mahasiswa ' + mahasiswa.nim + ' telah ditambahkan ke database lokal.');
}

function bacaDariDatabase() {
    var objectstore = buatTransaksi().objectStore('mahasiswa');
    objectstore.openCursor().onsuccess = function(e) {
        var result = e.target.result;
        if (result) {
            var baris = tabel.insertRow();
            baris.id = result.value.nim;
            baris.insertCell().appendChild(document.createTextNode(result.value.nama));
            baris.insertCell().appendChild(document.createTextNode(result.value.nim));
            baris.insertCell().appendChild(document.createTextNode(result.value.prodi));
            baris.insertCell().appendChild(document.createTextNode(result.value.email));
            var btnHapus = document.createElement('input');
            btnHapus.type = 'button';
            btnHapus.value = 'Hapus';
            btnHapus.id = result.value.nim;
            baris.insertCell().appendChild(btnHapus);
            result.continue();
        }
    }
}

function hapusDariDatabase(nim) {
    var objectstore = buatTransaksi().objectStore('mahasiswa');
    var request = objectstore.delete(nim);
    request.onerror = kesalahanHandler;
    request.onsuccess = alert('Mahasiswa ' + nim + ' berhasil dihapus dari database lokal.');
}

function hapusBaris(e) {
    if (e.target.type == 'button') {
        tabel.deleteRow(tabel.rows.namedItem(e.target.id).sectionRowIndex);
        hapusDariDatabase(e.target.id);
    }
}