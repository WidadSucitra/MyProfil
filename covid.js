//HALAMAN COVID

$(document).ready(function() {

    semuaData()
    dataIndo()
    dataMalay()
    dataThai()
    dataSingapura()
    dataLaos()
    dataVietnam()


    function semuaData() {
        $.ajax({
            url: 'https://covid19.mathdro.id/api',
            success: function(data) {
                try {
                    var json = data;
                    var positif = data.confirmed;
                    var sembuh = data.recovered;
                    var meninggal = data.deaths;
                    var lastUpdate = data.lastUpdate;

                    $('#positif').html(positif.value);
                    $('#sembuh').html(sembuh.value);
                    $('#meninggal').html(meninggal.value);
                    $('#last-Update').html(lastUpdate.substring(0, 10));
                } catch {
                    alert('Error');
                }
            }
        })
    }

    function dataIndo() {
        $.ajax({
            url: 'https://covid19.mathdro.id/api/countries/IDN',
            success: function(data) {
                try {
                    var json = data;
                    var positif = data.confirmed;
                    var sembuh = data.recovered;
                    var meninggal = data.deaths;

                    $('#positif-indo').html(positif.value);
                    $('#sembuh-indo').html(sembuh.value);
                    $('#meninggal-indo').html(meninggal.value);
                } catch {
                    alert('Error');
                }
            }
        })
    }

    function dataMalay() {
        $.ajax({
            url: 'https://covid19.mathdro.id/api/countries/MYS',
            success: function(data) {
                try {
                    var json = data;
                    var positif = data.confirmed;
                    var sembuh = data.recovered;
                    var meninggal = data.deaths;

                    $('#positif-malay').html(positif.value);
                    $('#sembuh-malay').html(sembuh.value);
                    $('#meninggal-malay').html(meninggal.value);
                } catch {
                    alert('Error');
                }
            }
        })
    }


    function dataThai() {
        $.ajax({
            url: 'https://covid19.mathdro.id/api/countries/THA',
            success: function(data) {
                try {
                    var json = data;
                    var positif = data.confirmed;
                    var sembuh = data.recovered;
                    var meninggal = data.deaths;

                    $('#positif-thai').html(positif.value);
                    $('#sembuh-thai').html(sembuh.value);
                    $('#meninggal-thai').html(meninggal.value);
                } catch {
                    alert('Error');
                }
            }
        })
    }

    function dataSingapura() {
        $.ajax({
            url: 'https://covid19.mathdro.id/api/countries/SGP',
            success: function(data) {
                try {
                    var json = data;
                    var positif = data.confirmed;
                    var sembuh = data.recovered;
                    var meninggal = data.deaths;

                    $('#positif-sg').html(positif.value);
                    $('#sembuh-sg').html(sembuh.value);
                    $('#meninggal-sg').html(meninggal.value);
                } catch {
                    alert('Error');
                }
            }
        })
    }

    function dataLaos() {
        $.ajax({
            url: 'https://covid19.mathdro.id/api/countries/LAO',
            success: function(data) {
                try {
                    var json = data;
                    var positif = data.confirmed;
                    var sembuh = data.recovered;
                    var meninggal = data.deaths;

                    $('#positif-laos').html(positif.value);
                    $('#sembuh-laos').html(sembuh.value);
                    $('#meninggal-laos').html(meninggal.value);
                } catch {
                    alert('Error');
                }
            }
        })
    }

    function dataVietnam() {
        $.ajax({
            url: 'https://covid19.mathdro.id/api/countries/VNM',
            success: function(data) {
                try {
                    var json = data;
                    var positif = data.confirmed;
                    var sembuh = data.recovered;
                    var meninggal = data.deaths;

                    $('#positif-vt').html(positif.value);
                    $('#sembuh-vt').html(sembuh.value);
                    $('#meninggal-vt').html(meninggal.value);
                } catch {
                    alert('Error');
                }
            }
        })
    }

})