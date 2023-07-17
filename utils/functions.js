import Swal from "sweetalert2";

export function fn_make_label(str) {
    // Stringi "_" karakterine göre parçalayarak bir dizi oluştur
    const words = str.split('_');
    // Her kelimenin ilk harfini büyüt ve geri kalan harfleri küçült
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    // Diziyi boşlukla birleştirerek yeni bir string oluştur
    return capitalizedWords.join('');
}
export async function fn_delete(title = "Emin misiniz?", text = "Bunu geri alamazsınız!", confirmButton = "Sil", cancelButton = "Vazgeç") {
    return await Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmButton,
        cancelButtonText: cancelButton
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Silindi!',
                'Silme işlemi başarılı bir şekilde gerçekleşti.',
                'success'
            )
            return true;
        } else {
            return false;
        }
    })
}