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