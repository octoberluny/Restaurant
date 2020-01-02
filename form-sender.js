$(document).ready(function() {
    
    $('#errorNameMessage').hide();
    $('#errorPhoneMessage').hide();
    
    let nameError = false;
    let phoneError = false;
    
    $('#name').keyup(function() {
        checkName();
    });
    
    $('#phone').keyup(function() {
        checkPhone();  
    });
    
    function checkName() {
        let pattern = /^[a-zA-Z]+(\s[a-zA-Z]*){0,2}$/;
        let name = $('#name').val();
        if (pattern.test(name) && name !== '') {
            $('#errorNameMessage').hide();
            $('#name').css({'border': '1px solid #7d7e90'});
        } else if (name === ''){
            $('#errorNameMessage').html('This field is required');
            $('#errorNameMessage').show();
            $('#name').css({'border': '1px solid #f72c2c'});
            nameError = true;
        } else {
            $('#errorNameMessage').html('Invalid name');
            $('#errorNameMessage').show();
            $('#name').css({'border': '1px solid #f72c2c'});
            nameError = true;
        }
    }
    
    function checkPhone() {
        let pattern = /[+][0-9]{12}$/;
        let phone = $('#phone').val();
        if (pattern.test(phone) && phone !== '') {
            $('#errorPhoneMessage').hide();
            $('#phone').css({'border': '1px solid #7d7e90'})
        } else if (phone === '') {
            $('#errorPhoneMessage').html('This field is required');
            $('#errorPhoneMessage').show();
            $('#phone').css({'border': '1px solid #f72c2c'})
            phoneError = true;
        } else {
            $('#errorPhoneMessage').html('Invalid phone number');
            $('#errorPhoneMessage').show();
            $('#phone').css({'border': '1px solid #f72c2c'})
            phoneError = true;
        }
    }
    
    $("#submit").click(function(event) {
        
        

        nameError = false;
        phoneError = false;
        
        checkName();
        checkPhone();
        
        if (!nameError && !phoneError) {
            event.preventDefault();
            
            $('.modal.fade.loader').css({'display': 'block', 'opacity': '1'});
            
            $.ajax({
                url: "https://tranquil-sierra-86540.herokuapp.com/tumaha.ksenia@gmail.com",
                method: "POST",
                data: {
                    "name": $("#name").val(),
                    "phone": $("#phone").val(),
                },
                dataType: "json",
            })

            .done(() => {
                $('.modal.fade.loader').css({'display': 'none', 'opacity': '0'});
                $('.modal.thanks').css({'display': 'block', 'opacity': '1'});
                $('#close').click(function(){
                    $('.modal.fade.thanks').css({'display': 'none', 'opacity': '0'});
                });
                $('#name').val('');
                $('#phone').val('');
            });
        } else {
            event.preventDefault();
        }
    });
}); 