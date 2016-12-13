$(document).ready(function() {
    // Remove Book

    var allSubCategories = [];

    // Get all subcatories
    $('#subCategorySelector option').each(function(i, elem){
        allSubCategories.push(elem);
    });

    // For first time category select corresponding subcategories
    allSubCategories.forEach(function(elem, i){
        var categorySelected = document.getElementById('subCategorySelector').value;
        var options = [];

        allSubCategories.forEach(function(elem, i){
            if(elem.getAttribute('data-id') == JSON.stringify(categorySelected)) {
                options.push(elem);
            }
        });

        document.getElementById('subCategorySelector').innerHTML = '';

        $('#subCategorySelector').html(options);
    });

    $('.removeBook').click(function(e) {
        deleteId = $(this).data('id');
        $.ajax({
            url:'/manage/books/delete/'+deleteId,
            type:'DELETE',
            success: function() {

            }
        });
        window.location = '/manage/books';
    });

    //Remove Category
    $('.removeCategory').click(function(e) {
        deleteId = $(this).data('id');
        $.ajax({
            url:'/manage/category/delete/'+deleteId,
            type:'DELETE',
            success: function() {

            }
        });
        window.location = '/manage/category';
    });


    $('#categorySelector').change(function(e) {
        var categorySelected = e.currentTarget.value;
        var options = [];

        allSubCategories.forEach(function(elem, i){
            if(elem.getAttribute('data-id') == JSON.stringify(categorySelected)) {
                options.push(elem);
            }
        });

        document.getElementById('subCategorySelector').innerHTML = '';

        $('#subCategorySelector').html(options);
    })
});