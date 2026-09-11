var namaDipilih = "";
var hargaDipilih = 0;
var ukuranDipilih = "";
var keranjang = [];


/* ================= FILTER "OUR COLLECTION" ================= */

function filterProduk(kategori, tombol) {

    var semuaFilter = document.querySelectorAll(".filter button");

    for (var i = 0; i < semuaFilter.length; i++) {
        semuaFilter[i].classList.remove("active");
    }

    tombol.classList.add("active");

    var semuaProduk = document.querySelectorAll(".products .product");
    var urutan = 0;

    for (var i = 0; i < semuaProduk.length; i++) {

        var produk = semuaProduk[i];
        var kategoriProduk = produk.getAttribute("data-category");
        var tampilkan = (kategori === "semua" || kategoriProduk === kategori);

        if (tampilkan) {

            produk.classList.remove("hide");

            // reset lalu jalankan ulang animasi supaya stagger terasa
            produk.classList.remove("show-anim");
            void produk.offsetWidth;
            produk.style.animationDelay = (urutan * 0.05) + "s";
            produk.classList.add("show-anim");

            urutan++;

        } else {

            produk.classList.add("hide");
        }
    }
}


/* ================= MODAL UKURAN ================= */

function beliProduk(nama, harga) {

    namaDipilih = nama;
    hargaDipilih = harga;
    ukuranDipilih = "";

    document.getElementById("namaProduk").innerHTML = nama;

    document.getElementById("hargaProduk").innerHTML =
        "Rp " + harga.toLocaleString("id-ID");

    document.getElementById("infoUkuran").innerHTML =
        "Silakan pilih ukuran.";

    var semuaTombolSize = document.querySelectorAll(".sizes button");
    for (var i = 0; i < semuaTombolSize.length; i++) {
        semuaTombolSize[i].classList.remove("selected");
    }

    bukaModal("sizeModal");
}


function pilihUkuran(ukuran, tombol) {

    ukuranDipilih = ukuran;

    var semuaTombol =
        document.querySelectorAll(".sizes button");

    for (var i = 0; i < semuaTombol.length; i++) {
        semuaTombol[i].classList.remove("selected");
    }

    tombol.classList.add("selected");

    document.getElementById("infoUkuran").innerHTML =
        "Ukuran dipilih: " + ukuran;
}


function tutupUkuran() {
    tutupModal("sizeModal");
}


function tambahKeranjang() {

    if (ukuranDipilih == "") {

        alert("Silakan pilih ukuran terlebih dahulu!");

        return;
    }

    keranjang.push({
        nama: namaDipilih,
        harga: hargaDipilih,
        ukuran: ukuranDipilih
    });

    document.getElementById("jumlahCart").innerHTML =
        keranjang.length;

    tutupUkuran();

    alert(
        "✓ Berhasil masuk keranjang!\n\n" +
        namaDipilih +
        "\nSize: " +
        ukuranDipilih
    );
}


/* ================= CART ================= */

function bukaCart() {
    bukaModal("cartModal");
    tampilkanCart();
}


function tutupCart() {
    tutupModal("cartModal");
}


function tampilkanCart() {

    var isi =
        document.getElementById("isiKeranjang");

    var total =
        document.getElementById("totalHarga");

    isi.innerHTML = "";

    var jumlah = 0;


    if (keranjang.length === 0) {

        isi.innerHTML =
            "Keranjang masih kosong.";

        total.innerHTML =
            "Rp 0";

        return;
    }


    for (var i = 0; i < keranjang.length; i++) {

        jumlah += keranjang[i].harga;

        isi.innerHTML +=

            "<div class='cart-item'>" +

            "<div>" +

            "<b>" +
            keranjang[i].nama +
            "</b>" +

            "<br>" +

            "Size: " +
            keranjang[i].ukuran +

            "<br>" +

            "Rp " +
            keranjang[i].harga.toLocaleString("id-ID") +

            "</div>" +

            "<button class='delete' onclick='hapusCart(" +
            i +
            ")'>" +

            "Hapus" +

            "</button>" +

            "</div>";
    }


    total.innerHTML =
        "Rp " + jumlah.toLocaleString("id-ID");
}


function hapusCart(index) {

    keranjang.splice(index, 1);

    document.getElementById("jumlahCart").innerHTML =
        keranjang.length;

    tampilkanCart();
}


var NOMOR_WA_TOKO = "62895351009194"; // +62 895-3510-09104

function checkout() {

    if (keranjang.length === 0) {

        alert("Keranjang masih kosong!");

        return;
    }

    var jumlah = 0;

    var pesan =
        "Halo Urban Style, saya ingin memesan:\n\n";

    for (var i = 0; i < keranjang.length; i++) {

        jumlah += keranjang[i].harga;

        pesan +=
            (i + 1) + ". " +
            keranjang[i].nama +
            " (Size " + keranjang[i].ukuran + ") - Rp " +
            keranjang[i].harga.toLocaleString("id-ID") +
            "\n";
    }

    pesan +=
        "\nTotal: Rp " + jumlah.toLocaleString("id-ID") +
        "\n\nMohon info untuk proses selanjutnya. Terima kasih!";

    var linkWA =
        "https://wa.me/" + NOMOR_WA_TOKO +
        "?text=" + encodeURIComponent(pesan);

    window.open(linkWA, "_blank");

    keranjang = [];

    document.getElementById("jumlahCart").innerHTML = "0";

    tampilkanCart();

    tutupCart();
}


/* ================= MODAL HELPER (fade/scale in & out) ================= */

function bukaModal(id) {

    var modal = document.getElementById(id);

    modal.style.display = "flex";

    // paksa reflow supaya class "open" bisa memicu transisi
    void modal.offsetWidth;

    modal.classList.add("open");
}


function tutupModal(id) {

    var modal = document.getElementById(id);

    modal.classList.remove("open");

    setTimeout(function () {
        // hanya sembunyikan kalau memang belum dibuka lagi
        if (!modal.classList.contains("open")) {
            modal.style.display = "none";
        }
    }, 220);
}


/* ================= MOBILE MENU ================= */

function toggleMenu() {

    var menu = document.getElementById("navMenu");
    var tombol = document.getElementById("menuToggle");

    menu.classList.toggle("open");
    tombol.classList.toggle("active");
}


function tutupMenu() {

    var menu = document.getElementById("navMenu");
    var tombol = document.getElementById("menuToggle");

    menu.classList.remove("open");
    tombol.classList.remove("active");
}


/* ================= SCROLL REVEAL ================= */

function initScrollReveal() {

    if (!("IntersectionObserver" in window)) {
        return;
    }

    var target =
        document.querySelectorAll(
            ".hero-content, .hero-image, .about-image, .about-content, " +
            ".section-title, .filter, table, footer, .products .product"
        );

    for (var i = 0; i < target.length; i++) {
        target[i].classList.add("reveal-init");
    }

    var stagger = document.querySelectorAll(".products .product");
    for (var i = 0; i < stagger.length; i++) {
        stagger[i].style.transitionDelay = ((i % 8) * 0.06) + "s";
    }

    var observer = new IntersectionObserver(function (entries, obs) {

        for (var i = 0; i < entries.length; i++) {

            if (entries[i].isIntersecting) {
                entries[i].target.classList.add("in-view");
                obs.unobserve(entries[i].target);
            }
        }

    }, { threshold: 0.15 });

    for (var i = 0; i < target.length; i++) {
        observer.observe(target[i]);
    }
}


document.addEventListener("DOMContentLoaded", initScrollReveal);
