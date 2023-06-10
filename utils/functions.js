export function fn_make_label(str) {
    // Stringi "_" karakterine göre parçalayarak bir dizi oluştur
    const words = str.split('_');
    // Her kelimenin ilk harfini büyüt ve geri kalan harfleri küçült
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    // Diziyi boşlukla birleştirerek yeni bir string oluştur
    const formattedStr = capitalizedWords.join(' ');
    return formattedStr;
}