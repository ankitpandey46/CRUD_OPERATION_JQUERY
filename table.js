$(document).ready(function(){
    $("#updatealert").hide();
    $("#delalert").hide();
    $("#subalert").hide();
})
// fetching data from API AND IMPORTING IN TABLE
function getData() {
    $.ajax({
        url: "https://gorest.co.in/public/v2/users",
        type: "GET",
        headers: {
            "Authorization": " Bearer d06d67387cf2fce3a2c5d69bc64fba59a8ef24ab0a80ddc191c600504ef13b98"
        },
        success: function(data) {
            $("#loading").hide();
            var my_data = data;
            var i = 0;
            $.each(my_data, function(keys, value) {
                $("#table").append("<tr id=" + "tr" + i + ">" + "</tr>")
                $("#tr" + i).append("<td>" + value.id + "</td>")
                $("#tr" + i).append("<td>" + value.name + "</td>")
                $("#tr" + i).append("<td>" + value.email + "</td>")
                $("#tr" + i).append("<td>" + value.gender + "</td>")
                $("#tr" + i).append("<td>" + value.status + "</td>")
                $("#tr" + i).append("<td id=" + "div" + i + ">" + "</td>")
                $("#div" + i).append("<button class='btn btn-success' onclick='edit()' data-toggle='modal' data-target='#myModal' id=" + "update" + i + ">" + "EDIT" + "</button>")
                $("#div" + i).append("<button class='btn btn-danger ml-4' onclick='delete1()' data-toggle='modal' data-target='#myModaldelete' id=" + "delete" + i + ">" + "DELETE" + "</button>")

                i++
            })

        },
        error: function() {
            console.log("error")
        }

    })
}


// CALLING GET METHOD RANDOM
getData();



// FUNCTION FOR SUBMIT
function submit() {
    var formData = {
        'name': $('input[name=name]').val(),
        'gender': $("input[type='radio'][name='gender']:checked").val(),
        'email': $('input[name=email]').val(),
        'status': "active"
    };
    $.ajax({
        type: "POST",
        url: "https://gorest.co.in/public/v2/users",
        headers: {
            "Authorization": " Bearer d06d67387cf2fce3a2c5d69bc64fba59a8ef24ab0a80ddc191c600504ef13b98"
        },
        data: formData,
        success: function() {
            $("#subalert").show();
            datablank()
        },
        error: function() {
            console.log("error")
        }
    })
}

// FUNCTION FOR UPDATE
var my_id

function edit() {
    my_id = event.target.id;
    var get = $("#" + my_id).parents()
    var get1 = $(get[1]).children()
    var get_id = $(get1[0]).text()
    var get_name = $(get1[1]).text()
    var get_email = $(get1[2]).text()
    var get_gender = $(get1[3]).text()
    var get_status = $(get1[4]).text()

    $("#name1").val(get_name)
    $("#email1").val(get_email)
    $(":radio[value=" + get_gender + "]").attr("checked", "true");
    $('#status').val(get_status);
}
const clickStopper = (e) => {e.preventDefault() };
$("#update").click(function() {
    var get = $("#" + my_id).parents()
    var get1 = $(get[1]).children()
    var get_id = $(get1[0]).text()
    var formData = {
        'name': $('input[name=name1]').val(),
        'gender': $("input[type='radio'][name='gender1']:checked").val(),
        'email': $('input[name=email1]').val(),
        'status': $('#status').find(":selected").text()
    };
    $.ajax({
        type: "PUT",
        url: "https://gorest.co.in/public/v2/users/" + get_id,
        headers: {
            "Authorization": " Bearer d06d67387cf2fce3a2c5d69bc64fba59a8ef24ab0a80ddc191c600504ef13b98"
        },
        data: formData,
        success: function() {
            $("#updatealert").show();
            datablank()
        },
        error: function() {
            console.log("error")
        }
    })
})

// FUNCTION FOR DELETE
var get_id
function delete1() {
    var my_id = event.target.id;
    var get = $("#" + my_id).parents()
    var get1 = $(get[1]).children()
    get_id = $(get1[0]).text()
}
function deleteconfirm() {
    $.ajax({
        type: "DELETE",
        url: "https://gorest.co.in/public/v2/users/" + get_id,
        headers: {
            "Authorization": " Bearer d06d67387cf2fce3a2c5d69bc64fba59a8ef24ab0a80ddc191c600504ef13b98"
        },
        success: function() {
            datablank()
            $("#delalert").show();
        },
        error: function() {
            console.log("error")
        }
    })
}

//  FUNCTION FOR EMPTY TABLE
function datablank() {
    $("#table").empty()
    getData()
  
    
}
  //    function for hide alert
setInterval(function() {
    $("#updatealert").hide()
    $("#delalert").hide();
    $("#subalert").hide();
}, 2000)