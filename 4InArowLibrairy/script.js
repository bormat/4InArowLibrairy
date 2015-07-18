    $(function() {
        var pa = './'
        window.jquery = $;
        $.ajax({
            url: pa+'index2.html',
            async: true,
            success:function(data){
                data=data.replace(new RegExp('{#path#}', 'g'),pa)
                $("#content").append(data);
            }
        });
    });


