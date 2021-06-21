$(function(){

    const appendTask = function(data){
       var taskCode = '<a href="javascript:" class="task-link" data-id="' + data.id + '">' + data.name + '</a> ' +
                   '<input type="image" src="/img/delete_icon.png" class="delete-task" data-id="' + data.id + '">' +
                   '<input type="image" src="/img/edit_icon.png" class="edit-task" data-id="' + data.id + '">' +
                   '<input type="image" src="/img/finishTask.png" class="finish-task" data-id="' + data.id + '"><br>';
        $('#taskEntity-list')
            .append('<div>' + taskCode + '</div>');
    };

    //Loading tasks on load page              // Теперь динамическая подгрузка thymeleaf
//    $.get('/taskList/', function(response)
//    {
//        for(i in response) {
//            appendTask(response[i]);
//        }
//    });

    //При наведении на кнопку
    $('#delete-all').hover(function() {
        $(this).next().show();  // получаем следующий за данным $(this)
    },
    function() {
        $(this).next().hide();
    });

    //При наведении на кнопку
    $('#show-add-taskEntity-form').hover(function() {
        $(this).next().show(); // получаем следующий за данным $(this)
    },
    function() {
        $(this).next().hide();
    });

    //При наведении на кнопку
     $('.edit-taskEntity').hover(function(){
        $(this).next().show(); // получаем следующий за данным $(this)
     },
     function() {
        $(this).next().hide();
     });

    //При наведении на кнопку
     $('.delete-taskEntity').hover(function(){
        $(this).next().show(); // получаем следующий за данным $(this)
     },
     function() {
        $(this).next().hide();
     });

      //При наведении на кнопку
     $('.finish-taskEntity').hover(function(){
        $(this).next().show(); // получаем следующий за данным $(this)
     },
     function() {
        $(this).next().hide();
     });

      //При наведении на кнопку
     $('.continue-taskEntity').hover(function(){
        $(this).next().show(); // получаем следующий за данным $(this)
     },
     function() {
        $(this).next().hide();
     });

    //Continue task
    $(document).on('click', '.continue-taskEntity', function(){
        var link = $(this);
        var continueId = $(this).data('id');
        var formContinueData = {
            "finishDate" : "Возобновлённое дело",
            "finishTask": false
        }
            console.log(formContinueData);
            $.ajax({
                url: "/taskList/" + continueId,
                method: 'PUT',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(formContinueData),
                success: function(response) {
                    console.log(response);
                    alert('Задание ' + response.name  + ' - Продолженно');
                    window.location.reload();
                },
                error: function(response) {
                if (response.status === 404) {
                    alert('Задание не найдено.');
                }
            }
        });
    });

    //Finish task
    $(document).on('click', '.finish-taskEntity', function(){
        var link = $(this);
        var finishId = $(this).data('id');
        console.log(finishId);
        var formFinishData = {
            "finishTask": true
            }
                console.log(formFinishData);
                $.ajax({
                url: "/taskList/" + finishId,
                method: 'PUT',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(formFinishData),
                success: function(response) {
                    console.log(response);
                    alert('Задание ' + response.name  + ' - Выполнено');
                    window.location.reload();
                },
                error: function(response) {
                if (response.status === 404) {
                    alert('Задание не найдено.');
                }
            }
        });
    });

    //Delete task
    $(document).on('click', '.delete-taskEntity', function(){
        var link = $(this);
        var taskId = $(this).data('id');
        $.ajax({
            method: "DELETE",
            url: '/taskList/' + taskId,
            success: function(response)
            {
                alert("Дело " + response.name + "- Удалено!");
                window.location.reload(); //обновить страницу
            },
            error: function(response) {
               if(response.status == 404) {
                    alert('Дело не найдено!');
               }
            }
        });
        return false;
    });

    //Delete All task
    $('#delete-all').click(function(){
        $.ajax({
            method: "DELETE",
            url: '/taskList/',
            success: function(response)
            {
                alert("Все дела удалятся через 2 секунды !");
                setTimeout(function() {
                window.location.reload();
                }, 1000); //обновить страницу через 1 сек
            }
        });
    });

    //Getting task{id} descriptions - hide task{id} descriptions
    $(document).on('click', '.taskEntity-link', function()
    {
    var link = $(this);
    if (!link.hasClass('clicked')) // если класса нет
    {
        link.addClass('clicked');       // добавляем класс
        console.log('First click'); // код для первого клика
        var taskId = link.data('id');
        $.ajax({
            method: "GET",
            url: '/taskList/' + taskId,
            success: function(response)
            {
            var description = response.description;
            console.log(response.description);
            if (description === "") {
                var code = '<div>Дата создания :' + response.creationDate + '; Дата завершения :' + response.finishDate + ';</div>';
            } else {
                var code = '<div>Дата создания:' + response.creationDate + '; Описание : ' + response.description +
                                        '; Дата завершения :' + response.finishDate + '</div>';
            }
                link.parent().append(code);
            },
            error: function(response)
            {
                if(response.status == 404) {
                    alert('Дело не найдено!');
                }
            }
        });
    } else {
        link.removeClass('clicked'); // убираем класс
        console.log('Second click'); // код для второго клика
        link.parent().children("div").remove();
        }
    });

    //Show adding task form
    $('#show-add-taskEntity-form').click(function(){
        $('#taskEntity-form').css('display', 'flex');
    });

    //Closing adding task form
    $('#taskEntity-form').click(function(event){
        if(event.target === this) {
            $(this).css('display', 'none');
        }
    });

    //Adding task
    $('#save-taskEntity').click(function()
    {
        var data = $('#taskEntity-form form').serialize();
        console.log(data);
        $.ajax({
            method: "POST",
            url: '/taskList/',
            data: data,
            success: function(response)
            {
                $('#taskEntity-form').css('display', 'none');
                var task = {};
                task.id = response;
                var dataArray = $('#taskEntity-form form').serializeArray();
                for(i in dataArray) {
                    task[dataArray[i]['name']] = dataArray[i]['value'];
                }
                console.log(task.name);
                console.log(task.description);
                appendTask(task);
                console.log(task);
            }
        });
//        window.location.reload();
    });

    var editId;

    //Show editing task form
    $(document).on('click', '.edit-taskEntity', function(){
        editId = $(this).data('id');
        $('#edit-form').css('display', 'flex');
    });

    //Closing editing task form
    $('#edit-form').click(function(event){
        if(event.target === this) {
            $(this).css('display', 'none');
        }
    });

    //Editing task
    $('#apply-taskEntity').click(function() {
        var editDataSer = $('#edit-form form').serializeArray();
        var dataObj = {};
        $(editDataSer).each(function(index, obj){
            dataObj[obj.name] = obj.value;
        });
        console.log(dataObj);
        console.log(editId);
        $.ajax({
            method: "PUT",
            url: '/taskList/' + editId,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(dataObj),
            success: function(response)
            {
                $('#taskEntity-form').css('display', 'none');
                console.log(response);
                window.location.reload(); // обновить страницу
            }
        });
        return false;
    });

});